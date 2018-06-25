var { Animal } = require( `./../animal.js` ),
  emuList = [];

class Emu extends Animal {

  constructor () {

    super();

    this.element.classList.add( `emu` );

    this.attributeStore.speed = 0.5 + ( Math.random() * 0.40 );
    this.attributeStore.logic = 0.5 + ( Math.random() * 0.10 );
    this.attributeStore.power = 0.5 + ( Math.random() * 0.25 );

    emuList.push( this );

  }

}
module.exports = { Emu, emuList };