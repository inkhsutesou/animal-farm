function eat ( turf ) {

  if ( turf.growth < 0 ) {
    turf.remove();
    this.element.classList.remove( `munch` );
    return this.mode === `auto` ? this.go() : this;
  }

  if ( this.mannerismStore.hunger > 1 ) {
    this.element.classList.remove( `munch` );
    return this.mode === `auto` ? this.go() : this;
  }

  this.element.classList.add( `munch` );
  this.activity = `eat`;

  turf.setGrowth( turf.growth - 0.025 );
  this.mannerismStore.hunger += 0.01;

  setTimeout( () => this.eat( turf ), 30 );
  return this;
}
module.exports = { eat }