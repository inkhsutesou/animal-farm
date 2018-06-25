var config = require( `./../config.js` ),

 directionList = [
  // y -1,   0,   1
    [ 315, 270, 225 ], // -1
    [   0, 225, 180 ], // 0
    [  45,  90, 135 ]  // 1 x
  ];

class Item {

  constructor () {

    this.x = 0;
    this.y = 0;

  }

  __directionList ( x, y ) {
    return directionList[ ++ x ][ ++ y ];
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

  setPosition ( x = this.x, y = this.y ) {

    if ( this.element.parentNode === null ) {
      document.body.appendChild( this.element );
    }

    [ x, y ] = this.__withinBounds( x, y );

    this.x = x;
    this.y = y;

    this.element.style.left = `${ x }%`;
    this.element.style.top = `${ y }%`;

    this.element.style.zIndex = Math.floor( y );

    return this;
  }

  setSize ( size = 20 ) {
    this.element.style.setProperty( `--size`, `${ size }vmin` );
    this.size = size;
    return this;
  }

  setFace ( face = 180 ) {
    this.element.setAttribute( `data-face`, face );
    return this;
  }

}

module.exports = { Item };