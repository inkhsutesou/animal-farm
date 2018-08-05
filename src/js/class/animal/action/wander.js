function wander () {

  let { knowledgeStore } = this,
    { localeList } = knowledgeStore,
    modX, modY, destination;

  do {

    modX = 0;
    modY = 0;

    if ( localeList.length ) {

      localeList.forEach( coordList => {

        let [ x, y ] = coordList;

        modX += this.x - x;
        modY += this.y - y;

      } );

      modX /= localeList.length;
      modY /= localeList.length;

    }

    modX += ( ( ( Math.random() - 0.5 ) * 10 ) );
    modY += ( ( ( Math.random() - 0.5 ) * 10 ) );

    modX += Math.sign( modX ) * 0.5 * this.size;
    modY += Math.sign( modY ) * 0.5 * this.size;

    modX += this.x;
    modY += this.y;

    modX *= this.__isBeyondBoundary( modX ) ? -1 : 1;
    modY *= this.__isBeyondBoundary( modY ) ? -1 : 1;

    destination = this.__withinBounds( modX, modY );

  } while ( destination[ 0 ] === this.x && destination[ 1 ] === this.y );

  this
    .log( `Wandering ..` );

  this.activity = `wander`;

  this.move( ... destination );

  return this;
}

module.exports = { wander };