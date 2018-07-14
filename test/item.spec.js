var { Item } = require( `../src/js/class/item.js` );

describe( "An item", () => {

  it( `should have a name`, () => {
    let item = new Item();
    expect( typeof item.name ).toEqual( `string` );
  } );

  it( `should have its own history log`, () => {
    let item = new Item();
    expect( typeof item.logText ).toEqual( `string` );
  } );

  it( `should have a size`, () => {
    let item = new Item();
    expect( typeof item.size ).toEqual( `number` );
  } );

  it( `should have an instance time`, () => {
    let item = new Item();
    expect( typeof item.instanceTime ).toEqual( `number` );
    expect( item.instanceTime > 1531148110811 ).toBe( true );
  } );

  it( `should have a directional face`, () => {
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

  it( `can update it's log`, () => {
    let item = new Item(),
      logMessage = `here is my log message`;
    expect( item.logText ).toBe( `` );
    item.log( logMessage );
    expect( item.logText ).toContain( logMessage );

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

    expect( () => {
      item.setPosition( 0, 0 );
    } ).not.toThrow();

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

    let item = new Item();
    item.element = document.createElement( `a` );

    item.setPosition( 12, 40 );

    expect( item.element.style.getPropertyValue( `--posX` ) ).toBe( `12` );
    expect( item.element.style.getPropertyValue( `--posY` ) ).toBe( `40` );

  } );

  it( `will append the element to the body during positioning if it is not already in the body`, () => {

    let item = new Item();
    item.element = document.createElement( `a` );

    expect( item.element.parentNode ).toBe( null );

    item.setPosition( 12, 40 );

    expect( item.element.parentNode ).not.toBe( null );
    expect( item.element.parentNode ).toBe( document.body );

  } );

  it( `can set its color`, () => {

    let item = new Item();

    expect( item.hue ).toBeUndefined();
    expect( item.sat ).toBeUndefined();
    expect( item.lum ).toBeUndefined();

    item.setColor( 12, 30, 89 );

    expect( item.hue ).toBe( 12 );
    expect( item.sat ).toBe( 30 );
    expect( item.lum ).toBe( 89 );

  } );

  it( `can set its color and it will change the element's CSS`, () => {

    let item = new Item();
    item.element = document.createElement( `a` );

    expect( item.element.style.getPropertyValue( `--hue` ) ).toBe( `` );
    expect( item.element.style.getPropertyValue( `--sat` ) ).toBe( `` );
    expect( item.element.style.getPropertyValue( `--lum` ) ).toBe( `` );

    item.setColor( 211, 64, 12 );

    expect( item.element.style.getPropertyValue( `--hue` ) ).toBe( `211` );
    expect( item.element.style.getPropertyValue( `--sat` ) ).toBe( `64` );
    expect( item.element.style.getPropertyValue( `--lum` ) ).toBe( `12` );

  } );

  it( `can set its size`, () => {

    let item = new Item();

    expect( item.size ).toBe( 0 );

    item.setSize( 12 );

    expect( item.size ).toBe( 12 );

  } );

  it( `can set its size and it will change the element's CSS`, () => {

    let item = new Item();
    item.element = document.createElement( `a` );

    expect( item.size ).toBe( 0 );
    expect( item.element.style.getPropertyValue( `--size` ) ).toBe( `` );

    item.setSize( 12 );

    expect( item.size ).toBe( 12 );
    expect( item.element.style.getPropertyValue( `--size` ) ).toBe( `12` );

  } );

  it( `can set the direction it faces`, () => {

    let item = new Item();

    expect( item.face ).toBe( `` );

    item.setFace( `135` );

    expect( item.face ).toBe( `135` );

  } );

  it( `can set the direction it faces and it will change the element's attributes`, () => {

    let item = new Item();
    item.element = document.createElement( `a` );

    expect( item.face ).toBe( `` );
    expect( item.element.getAttribute( `data-face` ) ).toBe( null );

    item.setFace( `135` );

    expect( item.face ).toBe( `135` );
    expect( item.element.getAttribute( `data-face` ) ).toBe( `135` );

  } );

});