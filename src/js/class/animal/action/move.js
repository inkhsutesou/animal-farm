let config = require( `./../../../config.js` );

function step ( self, ... etc ) {

  let xDes, yDes;

  if ( typeof etc[ 0 ] !== `number` ) {
    xDes = etc[ 0 ].x;
    yDes = etc[ 0 ].y;
  } else {
    [ xDes, yDes ] = etc;
  }

  if ( self.__hasReached( xDes, yDes ) ) {

    self
      .log( `Reached: x:${ xDes }, y:${ yDes }` )
      .log( `Coordinates: x:${ self.x }, y:${ self.y }` );

    let { knowledgeStore, attributeStore } = self,
      { logic } = attributeStore,
      { localeList } = knowledgeStore,
      memory = Math.floor( logic * 5 );

    while ( localeList.length > memory ) {
      localeList.shift();
    }
    localeList.push( [ xDes, yDes ] );
    self.element.classList.remove( `scoot` );

    return self.mode === `auto` ? self.go() : self;
  }

  let { speed } = self.attributeStore,
    dist = speed * config.stepDistance,

    xDel = xDes - self.x,
    yDel = yDes - self.y,

    rAng = Math.atan2( yDel, xDel ),
    dAng = ( ( 495 - 22.5 ) + ( 57.2957 * rAng ) ) % 360,
    fAng = dAng - dAng % 45,

    face = `00${ fAng }`,
    faceString = face.slice( face.length - 3, face.length ),

    xMod = dist * Math.cos( rAng ),
    yMod = dist * Math.sin( rAng ),

    xSet = self.x + xMod,
    ySet = self.y + yMod;

  self
    .setFace( faceString )
    .setPosition( xSet, ySet );

  setTimeout( () => step( self, ... etc ), 30 );

  return this;
}

function move ( ... etc ) {
  this.element.classList.add( `scoot` );

  this
    .log( `Moving to ..` )
    .log( `${ etc.length === 1 ? etc[ 0 ].name : etc }` );

  return step( this, ... etc );
}

module.exports = { move };