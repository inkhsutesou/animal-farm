var { Animal } = require( `./../animal.js` ),
  hueList = [ [ 15, 50 ] ],
  satList = [ [ 80, 90 ] ],
  lumList = [ [ 80, 90 ] ],
  colorStore = { hueList, satList, lumList },
  alpacaList = [];

class Alpaca extends Animal {

  constructor () {

    super();

    this.element.classList.add( `alpaca` );
    this.colorStore = colorStore;
    this.relativeList = alpacaList;

    this.attributeStore.speed = 0.5 + ( Math.random() * 0.25 );
    this.attributeStore.logic = 0.5 + ( Math.random() * 0.25 );
    this.attributeStore.power = 0.5 + ( Math.random() * 0.25 );

    alpacaList.push( this );

  }

}
module.exports = { Alpaca, alpacaList };