var { Item } = require( `../src/js/class/item.js` );

describe( "An item", () => {

  it( `should have a name`, () => {
    let item = new Item();
    expect( typeof item.name ).toEqual( `string` );
  } );

  it( `should have a log`, () => {
    let item = new Item();
    expect( typeof item.log ).toEqual( `string` );
  } );

  it( `should have a size`, () => {
    let item = new Item();
    expect( typeof item.size ).toEqual( `number` );
  } );

  it( `should have a face`, () => {
    let item = new Item();
    expect( typeof item.face ).toEqual( `string` );
  } );

  it( `should have an x coordinate`, () => {
    let item = new Item();
    expect( typeof new Item().x ).toEqual( `number` )
  } );

  it( `should have an y coordinate`, () => {
    let item = new Item();
    expect( typeof item.y ).toEqual( `number` );
  } );

  it( `can set its name`, () => {

    let item = new Item();

    item.setName( `robert` );

    expect( item.name ).toEqual( `robert` );

    item.setName( `bobert` );

    expect( item.name ).not.toEqual( `robert` );
    expect( item.name ).toEqual( `bobert` );
  } );

  it( `can set its position`, () => {

    let item = new Item();

    item.setPosition( 12, 34 );

    expect( item.x ).toEqual( 12 );
    expect( item.y ).toEqual( 34 );

    item.setPosition( 22, 44 );

    expect( item.x ).not.toEqual( 12 );
    expect( item.y ).not.toEqual( 34 );

    expect( item.x ).toEqual( 22 );
    expect( item.y ).toEqual( 44 );
  } );

  it( `can set its x coordinate`, () => {

    let item = new Item();

    item.setPosition( 12, undefined );

    expect( item.x ).toEqual( 12 );
    expect( item.y ).toEqual( 0 );

    item.setPosition( 22 );

    expect( item.x ).not.toEqual( 12 );
    expect( item.x ).toEqual( 22 );
  } );

  it( `can set its y coordinate`, () => {

    let item = new Item();

    item.setPosition( undefined, 12 );

    expect( item.x ).toEqual( 0 );
    expect( item.y ).toEqual( 12 );

    item.setPosition( undefined, 22 );

    expect( item.y ).not.toEqual( 12 );
    expect( item.y ).toEqual( 22 );
  } );

  it( `can set its position and it will change the element's CSS`, () => {

  } );

  it( `can set its color`, () => {

  } );

  it( `can set its color and it will change the element's CSS`, () => {

  } );

  it( `can set its size`, () => {

  } );

  it( `can set its size and it will change the element's CSS`, () => {

  } );

  it( `can set the direction it faces`, () => {

  } );

  it( `can set the direction it faces and it will change the element's attributes`, () => {

  } );

});