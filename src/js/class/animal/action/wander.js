function wander () {

  var { knowledgeStore } = this,
    { localeList } = knowledgeStore,

    modX = 0,
    modY = 0,

    destination;

  if ( localeList.length ) {

    localeList.forEach( coordList => {

      var [ x, y ] = coordList;

      modX += this.x - x;
      modY += this.y - y;

    } );

    modX /= localeList.length;
    modY /= localeList.length;

  }

  modX += ( ( ( Math.random() - 0.5 ) * 10 ) );
  modY += ( ( ( Math.random() - 0.5 ) * 10 ) );

  modX += this.x;
  modY += this.y;

  modX *= this.__isBeyondBoundary( modX ) ? -1 : 1;
  modY *= this.__isBeyondBoundary( modY ) ? -1 : 1;

  destination = this.__withinBounds( modX, modY );

  this.log += `
    Wandering ..
      ${ JSON.stringify( destination ) }
  `;

  this.move( ... destination );

  return this;
}

module.exports = { wander };