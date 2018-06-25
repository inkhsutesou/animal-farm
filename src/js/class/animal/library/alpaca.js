var { Animal } = require( `./../animal.js` ),
  alpacaList = [];

class Alpaca extends Animal {

  constructor () {

    super();

    this.element.classList.add( `alpaca` );

    this.attributeStore.speed = 0.5 + ( Math.random() * 0.25 );
    this.attributeStore.logic = 0.5 + ( Math.random() * 0.25 );
    this.attributeStore.power = 0.5 + ( Math.random() * 0.25 );

    alpacaList.push( this );

  }

}
module.exports = { Alpaca, alpacaList };