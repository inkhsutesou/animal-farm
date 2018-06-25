var { Animal } = require( `./../animal.js` ),
  pigList = [];

class Pig extends Animal {

  constructor () {

    super();

    this.element.classList.add( `pig` );

    this.attributeStore.speed = 0.5 + ( Math.random() * 0.10 );
    this.attributeStore.logic = 0.5 + ( Math.random() * 0.40 );
    this.attributeStore.power = 0.5 + ( Math.random() * 0.25 );

    pigList.push( this );

  }

}
module.exports = { Pig, pigList };