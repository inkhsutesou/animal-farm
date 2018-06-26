var config = require( `./../../../config.js` );

function step ( self, ... etc ) {

  if ( typeof etc[ 0 ] !== `number` ) {
    var { x : xDes, y : yDes } = etc[ 0 ];
  } else {
    var [ xDes, yDes ] = etc;
  }

  if ( self.__hasReached( xDes, yDes ) ) {

    let { knowledgeStore, attributeStore } = self,
      { logic } = attributeStore,
      { localeList } = knowledgeStore;

    while ( localeList.length > Math.floor( logic * 5 ) ) {
      localeList.shift();
    }
    localeList.push( [ xDes, yDes ] );
    self.element.classList.remove( `scoot` );

    return self.go();
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

  self.element.setAttribute( `data-face`, faceString );
  self.setPosition( xSet, ySet );

  setTimeout( function () { step( self, ... etc ) }, 30 );

  return this;
}

function move ( ... etc ) {
  this.element.classList.add( `scoot` );

  console.log( this.name, `Moving to .. ${ etc } ` );
  return step( this, ... etc );
}

module.exports = { move };