function see () {

  if ( !this.barn ) {
    return;
  }

  let { registeredListStore } = this.barn,
    { awarenessStore } = this,
    { logic } = this.attributeStore,
    perceptionDistance = 25 * logic;

  for ( let key in registeredListStore ) {

    let list = registeredListStore[ key ];

    if ( list.length === 1 && list[ 0 ] === this ) {
      continue;
    }

    if ( list.length === 0 ) {
      continue;
    }

    let king = list[ 0 ] === this ? list[ 1 ] : list[ 0 ],
      kDiffX = Math.abs( king.x - this.x ),
      kDiffY = Math.abs( king.y - this.y ),
      cDiffX, cDiffY;

    if ( typeof king !== `undefined` ) {

      // Get closest item
      list.forEach( chal => {

        if ( chal === this ) { return; }

        cDiffX = Math.abs( chal.x - this.x );
        cDiffY = Math.abs( chal.y - this.y );

        if ( cDiffX + cDiffY < kDiffX + kDiffY ) {
          king = chal;
          kDiffX = cDiffX;
          kDiffY = cDiffY;
        }
      } );

    }

    // If within perception range
    awarenessStore[ key ] = null;
    if ( typeof king !== `undefined` && kDiffX + kDiffY < perceptionDistance ) {
      awarenessStore[ key ] = king;
    }
  }

  Object
    .keys( awarenessStore )
    .forEach( key => awarenessStore[ key ] && this.log( `See .. ${ key }: ${ awarenessStore[ key ].name }` ) );
}

module.exports = { see };