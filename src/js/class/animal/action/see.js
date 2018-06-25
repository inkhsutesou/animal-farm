function see () {

  var { registeredListStore } = this.barn,
    { awarenessStore } = this,
    { logic } = this.attributeStore;

  for ( let key in registeredListStore ) {

    let list = registeredListStore[ key ],
      king = list[ 0 ];

    // Get closest item
    list.forEach( chal => {
      if ( chal === this ) { return; }
      if ( Math.abs( chal.x - this.x ) + Math.abs( chal.y - this.y ) < Math.abs( king.x - this.x ) + Math.abs( king.y - this.y ) ) {
        king = chal;
      }
    } );

    // If within perception range
    awarenessStore[ key ] = null;
    if ( typeof king !== `undefined` && king !== this && Math.abs( king.x - this.x ) + Math.abs( king.y - this.y ) < 25 * logic ) {
      awarenessStore[ key ] = king;
    }
  }
  console.log( `${ this.name } sees:`, awarenessStore );
}

module.exports = { see };