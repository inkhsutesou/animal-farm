function eat ( turf ) {

  if ( turf.growth < 0 ) {
    turf.remove();
    this.element.classList.remove( `munch` );
    return this.go();
  }

  if ( this.mannerismStore.hunger > 1 ) {
    this.element.classList.remove( `munch` );
    return this.go();
  }

  this.element.classList.add( `munch` );

  turf.setGrowth( turf.growth - 0.025 );
  this.mannerismStore.hunger += 0.01;

  setTimeout( () => this.eat( turf ), 30 );
  return this;
}
module.exports = { eat }