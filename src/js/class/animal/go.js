let config = require( `./../../config.js` );

function go () {

  this
    .upkeep()
    .see();

  let { awarenessStore, mannerismStore } = this,
    { hunger, energy, friend } = mannerismStore,
    { animal, turf } = awarenessStore,

    hungerNeed = 1 - hunger,
    energyNeed = 1 - energy,
    friendNeed = 1 - friend,

    totalNeed = hungerNeed + energyNeed + friendNeed,

    hungerChance = hungerNeed / totalNeed,
    energyChance = energyNeed / totalNeed,
    friendChance = friendNeed / totalNeed,

    decision = Math.random();

  this.log( `Decision : ${ decision } | hungerChance ${ hungerChance } | energyChance ${ energyChance } | friendChance ${ friendChance }` );

  if ( this.isAbleParent && hunger + energy + friend > 2.9 ) {

    if ( this.relativeList.length <= config.populationLimit ) {

      mannerismStore.hunger =
      mannerismStore.energy =
      mannerismStore.friend = 0;

      this.setIsAbleParent( false );
      setTimeout( () => this.setIsAbleParent( true ), config.birthToAbleParentTime );

      let child = new this.constructor()
        .setPosition( this.x, this.y )
        .setFace( 225 )
        .setColor()
        .setName( `Child of ${ this.name }` )
        .setBarn( this.barn );

      setTimeout( () => child.move( 100 - this.x, 100 - this.y ), config.birthToWalk );

    }

    return this
      .move( 100 - this.x, 100 - this.y );

  }

  switch ( true ) {

    // Find food, eat food
    case decision < hungerChance :
      this.log( `Find food, eat food` );
      if ( !turf ) {
        return this.wander();
      }
      if ( this.__hasReached( turf.x, turf.y ) ) {
        return this.eat( turf );
      }
      this.move( turf );
    break;

    // Sleep
    case decision < hungerChance + energyChance :
      this.log( `Sleep` );
      this.sleep();
    break;

    // Find friend, be friend
    case decision < hungerChance + energyChance + friendChance :
      this.log( `Find friend, be friend` );
      if ( !animal ) {
        return this.wander();
      }
      if ( this.__hasReached( animal.x, animal.y ) ) {
        return this.friend( animal );
      }
      this.move( animal );
    break;

    default :
      console.log( this.name, `This should not have happened, check Animal:go()` );
      console.log( decision, hungerChance, energyChance, friendChance );
      console.log( this.logText );

  }

  return this;
}

module.exports = { go };