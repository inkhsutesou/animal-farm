var { Turf, TurfItem, turfList } = require( `../src/js/class/turf/turf.js` );

describe( "Turf", () => {

  it( `should have an element`, () => {
    let turf = new Turf();
    expect( turf.element.constructor ).toEqual( TurfItem );
  } );

  it( `should start with a size property that is a number`, () => {
    let turf = new Turf();
    expect( typeof( turf.size ) ).toBe( `number` );
    expect( turf.element.style.getPropertyValue( `--size` ) ).toBe( turf.size.toString() );
  } );

  it( `should start with a growth property that is a number`, () => {
    let turf = new Turf();
    expect( typeof( turf.growth ) ).toBe( `number` );
    expect( turf.element.style.getPropertyValue( `--growth` ) ).toBe( turf.growth.toString() );
  } );

  it( `should be added to the turfList on creation`, () => {
    let turf = new Turf();
    expect( turfList[ turfList.length - 1 ] ).toBe( turf );
  } );

  it( `when removed, should be able to be removed entirely from turfList`, () => {
    let turf = new Turf();
    turf.remove();
    expect( turfList.indexOf( turf ) ).toEqual( -1 );
  } );

  it( `when removed, should be able to be removed entirely from document.body`, () => {
    let turf = new Turf();
    turf.setPosition( 1, 1 );
    expect( turf.element.parentNode ).toBe( document.body );
    turf.remove();
    expect( turf.element.parentNode ).toBe( null );
  } );

  it( `when removed, should trigger more turf if there is less than 70 turf`, () => {
    let count = 70;
    while ( turfList.length < count ) {
      new Turf();
    }
    expect( turfList.length = 70 ).toEqual( 70 );
    turfList[ turfList.length - 1 ].remove();
    expect( turfList.length > 69 ).toBe( true );
  } );

  it( `should grow over time`, () => {
    jasmine.clock().install();

    let turf = new Turf(),
      startGrowth = turf.growth;

    turf.go();

    jasmine.clock().tick( 100 );
    expect( turf.growth > startGrowth ).toBe( true );

    jasmine.clock().uninstall();
  } );

  it( `should spread over time`, () => {
    jasmine.clock().install();

    let turf = new Turf(),
      startTurfLength = turfList.length = 50;

    turf.go();

    jasmine.clock().tick( 100000 );
    expect( turfList.length > startTurfLength ).toBe( true );

    jasmine.clock().uninstall();
  } );

} );