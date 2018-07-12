function __friendStep ( animal ) {

  if ( !this.__hasReached( animal.x, animal.y ) ) {
    this.element.classList.remove( `heart` );
    return this.mode === `auto` ? this.go() : this;
  }

  if ( this.mannerismStore.friend > 1 ) {
    this.element.classList.remove( `heart` );
    return this.mode === `auto` ? this.go() : this;
  }

  this.mannerismStore.friend += 0.01;

  setTimeout( () => this.__friendStep( animal ), 30 );

}

function friend ( animal ) {

  this.element.classList.add( `heart` );

  return this.__friendStep( animal );
}

module.exports = { __friendStep, friend }