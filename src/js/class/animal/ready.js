function upkeep () {

  let { attributeStore, mannerismStore } = this,
    { power } = attributeStore;

  for ( let key in mannerismStore ) {

    mannerismStore[ key ] -= 0.01 * ( 1 - power );

    if ( mannerismStore[ key ] < 0 ) {
      mannerismStore[ key ] = 0;
    }

  }

  return this;

}

module.exports = { upkeep };