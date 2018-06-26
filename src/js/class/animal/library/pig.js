var { Animal } = require( `./../animal.js` ),
  hueList = [ [ 0, 30 ], [ 315, 360 ] ],
  satList = [ [ 70, 80 ] ],
  lumList = [ [ 70, 80 ] ],
  colorStore = { hueList, satList, lumList },
  pigList = [];

class Pig extends Animal {

  constructor () {

    super();

    this.element.classList.add( `pig` );
    this.colorStore = colorStore;
    this.relativeList = pigList;

    this.attributeStore.speed = 0.5 + ( Math.random() * 0.10 );
    this.attributeStore.logic = 0.5 + ( Math.random() * 0.40 );
    this.attributeStore.power = 0.5 + ( Math.random() * 0.25 );

    pigList.push( this );

  }

}
module.exports = { Pig, pigList };