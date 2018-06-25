var { Item } = require( `./../item.js` ),
  { AnimalItem } = require( `./element.js` ),
  config = require( `./../../config.js` ),
  animalList = [];

class Animal extends Item {

  constructor () {

    super();

    this.element = new AnimalItem();

    this.setSize( 5 );

    this.attributeStore = {
      speed : 0,
      logic : 0,
      power : 0
    }

    this.mannerismStore = {
      hunger : 0,
      energy : 0,
      friend : 0
    }

    this.awarenessStore = {};

    this.knowledgeStore = {
      localeList : []
    }

    this.name = null;
    this.type = null;
    this.born = Date.now();

    this.setIsAbleParent( false );
    setTimeout( () => this.setIsAbleParent( true ), config.birthToAbleParentTime );

    animalList.push( this );

  }

}

Object.assign( Animal.prototype,

  require( `./ready.js` ),
  require( `./set.js` ),
  require( `./go.js` ),

  require( `./action/wander.js` ),
  require( `./action/sleep.js` ),
  require( `./action/see.js` ),
  require( `./action/move.js` ),
  require( `./action/friend.js` ),
  require( `./action/eat.js` )
);

module.exports = { Animal, animalList };