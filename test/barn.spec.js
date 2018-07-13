var { Barn, BarnItem } = require( `../src/js/class/barn/barn.js` );

describe( "Barn", () => {

  it( `should have an element`, () => {
    let barn = new Barn();
    expect( barn.element.constructor ).toEqual( BarnItem );
  } );

  it( `should have a place to store arrays`, () => {
    let barn = new Barn();
    expect( typeof barn.registeredListStore ).toEqual( `object` );
  } );

  it( `should store arrays of animals with their name`, () => {
    let barn = new Barn(),
      cowKey = `cow`,
      cowList = [];
    expect( Object.keys( barn.registeredListStore ).length ).toEqual( 0 );
    barn.registerList( cowKey, cowList );
    expect( Object.keys( barn.registeredListStore ).length ).toEqual( 1 );
    expect( barn.registeredListStore[ cowKey ] ).toEqual( cowList );
  } );

} );