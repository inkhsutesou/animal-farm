function sleep () {

  if ( this.mannerismStore.energy > 1 ) {

    this.mannerismStore.energy = 1;
    this.element.classList.remove( `sleep` );

    return this.mode === `auto` ? this.go() : this;
  }

  this.element.classList.add( `sleep` );
  this.activity = `sleep`;
  this.mannerismStore.energy += this.attributeStore.power * 0.01;

  setTimeout( () => this.sleep(), 30 );
  return this;
}

module.exports = { sleep };