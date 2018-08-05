let { Item } = require( `../item.js` ),
  { TurfItem } = require( `./element.js` ),
  turfList = [];

class Turf extends Item {

  constructor () {

    super();

    this.element = document.createElement( `turf-item` );
    this.setGrowth();
    this.setSize( 2 );
    turfList.push( this );

  }

  setGrowth ( growth = 0.1 ) {
    this.element.style.setProperty( `--growth`, growth );
    this.growth = growth;
    return this;
  }

  remove () {

    turfList.splice( turfList.indexOf( this ), 1 );
    this.element.remove();

    if ( turfList.length < 70 ) {

      new Turf()
        .setPosition( Math.random() * 100, Math.random() * 100 )
        .go();
    }
  }

  go () {

    if ( this.growth > 0.9 ) {

      if ( turfList.length < 100 ) {

        let iteration = 1 + Math.floor( Math.random() * 3 );

        while ( iteration -- ) {

          new Turf()
            .setPosition(
              this.x + ( ( Math.random() - 0.5 ) * 2 * 3 ),
              this.y + ( ( Math.random() - 0.5 ) * 2 * 3 )
            )
            .setGrowth( 0.1 )
            .go();
        }

      }

    } else {

      this.setGrowth( this.growth + 0.025 );
      setTimeout( () => this.go(), Math.random() * 100 );

    }

    return this;
  }
}

module.exports = { Turf, TurfItem, turfList };