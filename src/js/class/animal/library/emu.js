let { Animal } = require( `./../animal.js` ),
  hueList = [ [ 0, 60 ], [ 315, 360 ] ],
  satList = [ [ 20, 30 ] ],
  lumList = [ [ 15, 35 ] ],
  colorStore = { hueList, satList, lumList },
  emuList = [];

class Emu extends Animal {

  constructor () {

    super( `emu`, colorStore, emuList );

    this.attributeStore.speed = 0.5 + ( Math.random() * 0.40 );
    this.attributeStore.logic = 0.5 + ( Math.random() * 0.10 );
    this.attributeStore.power = 0.5 + ( Math.random() * 0.25 );

  }

}
module.exports = { Emu, emuList };