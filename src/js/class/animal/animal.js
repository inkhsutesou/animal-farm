let { Item } = require( `./../item.js` ),
  { makeAnimalNode } = require( `./element.js` ),
  config = require( `./../../config.js` ),
  animalList = [],
  animalIteration = 0;

class Animal extends Item {

  constructor ( animalString = `NONE`, colorStore, relativeList = [] ) {

    super();

    this.identification = `${ animalString }__${ animalIteration }`;

    this.element = makeAnimalNode();
    this.element.instanceObject = this;
    this.element.setAttribute( `data-identification`, this.identification );
    this.element.setAttribute( `id`, this.identification );

    this.mode = `auto`;
    this.activity = ``;

    this.element.classList.add( animalString );
    this.colorStore = colorStore;
    this.relativeList = relativeList;

    relativeList.push( this );

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

    this.setIsAbleParent( false );
    setTimeout( () => this.setIsAbleParent( true ), config.birthToAbleParentTime );

    animalList.push( this );
    animalIteration ++;

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