var config = require( `./../config.js` );

class Item {

  constructor () {

    this.x = 0;
    this.y = 0;

    this.size = 0;

    this.face = ``;
    this.name = ``;
    this.log = ``;

    this.element = null;

  }

  __isBeyondBoundary ( num ) {
    return this.__withinBounds( num, 50 )[ 0 ] !== num;
  }

  __withinBounds ( x, y ) {

    var xMax = 100 - ( this.size * 0.5 ),
      xMin = 0 + ( this.size * 0.5 ),
      yMax = 100,
      yMin = 0 + this.size;

    x = x > xMax ? xMax : x;
    x = x < xMin ? xMin : x;

    y = y > yMax ? yMax : y;
    y = y < yMin ? yMin : y;

    return [ x, y ];
  }

  __hasReached ( x, y ) {

    var tolerance = this.attributeStore.speed * config.stepDistance,
      halfSize = this.size ? this.size * 0.5 : 0,
      qrtrSize = this.size * 0.25;
      tolerance = 1;

    return this.x - qrtrSize < x + tolerance // left side touches right side
      && this.x + qrtrSize > x - tolerance // right side touches left side
      && this.y - halfSize < y + tolerance // bottom touches top
      && this.y > y - tolerance // top touches bottom

  }

  __loopCyclelistWithNum ( num, cycleList ) {

    var result = false;

    while ( result === false ) {

      cycleList.some( ( [ min, max ] ) => {

        let diff = max - min;

        if ( num < diff ) {
          result = min + num;
          return true;
        }

        num -= diff;

      } );

    }

    return result;

  }

  setName ( name ) {
    this.name = name;
    return this;
  }

  setPosition ( x = this.x, y = this.y ) {

    [ x, y ] = this.__withinBounds( x, y );

    this.x = x;
    this.y = y;

    if ( this.element !== null ) {

      if ( this.element.parentNode === null ) {
        document.body.appendChild( this.element );
      }

      this.element.style.left = `${ x }%`;
      this.element.style.top = `${ y }%`;

      this.element.style.zIndex = Math.floor( y );
    }

    return this;
  }

  setColor ( hue, sat, lum ) {

    this.hue = typeof hue === `number` ? hue
      : this.colorStore ? this.__loopCyclelistWithNum( Math.round( Math.random() * 360 ), this.colorStore.hueList )
      : this.hue;

    this.sat = typeof sat === `number` ? sat
      : this.colorStore ? this.__loopCyclelistWithNum( Math.round( Math.random() * 360 ), this.colorStore.satList )
      : this.sat;

    this.lum = typeof lum === `number` ? lum
      : this.colorStore ? this.__loopCyclelistWithNum( Math.round( Math.random() * 360 ), this.colorStore.lumList )
      : this.lum || 0;

    if ( this.element !== null ) {
      this.element.style.setProperty( `--hue`, `${ this.hue }` );
      this.element.style.setProperty( `--sat`, `${ this.sat }%` );
      this.element.style.setProperty( `--lum`, `${ this.lum }%` );
    }

    return this;
  }

  setSize ( size = 20 ) {
    if ( this.element !== null ) {
      this.element.style.setProperty( `--size`, `${ size }` );
    }
    this.size = size;
    return this;
  }

  setFace ( face = `180` ) {
    if ( this.element !== null ) {
      this.element.setAttribute( `data-face`, face );
    }
    this.face = face;
    return this;
  }

}

module.exports = { Item };