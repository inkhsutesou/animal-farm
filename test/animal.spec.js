var { Animal, AnimalItem, animalList } = require( `../src/js/class/animal/animal.js` ),
  { Pig, pigList } = require( `../src/js/class/animal/library/pig.js` ),
  { Emu, emuList } = require( `../src/js/class/animal/library/emu.js` ),
  { Turf, TurfItem, turfList } = require( `../src/js/class/turf/turf.js` ),
  config = require( `../src/js/config.js` );

describe( `An Animal`, () => {

  describe( `after instantiated`, () => {

    it( `should have an animal element`, () => {
      let animal = new Animal();
      expect( animal.element.constructor ).toEqual( AnimalItem );
    } );

    it( `should have a size number`, () => {
      let animal = new Animal();
      expect( typeof animal.size ).toEqual( `number` );
    } );

    it( `should start in auto mode`, () => {
      let animal = new Animal();
      expect( animal.mode ).toEqual( `auto` );
    } )

    it( `should include its animal type in its element's class`, () => {
      let type = `BugBear`,
        animal = new Animal( type );
      expect( animal.element.classList ).toContain( type );
    } );

    it( `should reference its animal type's colorStore`, () => {
      let oliver = new Pig(),
        pepper = new Pig(),
        waffle = new Emu(),
        kevin = new Emu();
      expect( typeof oliver.colorStore ).toEqual( `object` );
      expect( oliver.colorStore ).toEqual( pepper.colorStore );
      expect( oliver.colorStore ).not.toEqual( waffle.colorStore );
    } );

    it( `should reference a list of other animals of its type`, () => {
      let oliver = new Pig(),
        pepper = new Pig(),
        waffle = new Emu(),
        kevin = new Emu();
      expect( oliver.relativeList.constructor ).toEqual( Array );
      expect( oliver.relativeList ).toEqual( pepper.relativeList );
      expect( oliver.relativeList ).not.toEqual( kevin.relativeList );
      expect( oliver.relativeList ).toContain( pepper );
      expect( pepper.relativeList ).toContain( oliver );
      expect( kevin.relativeList ).not.toContain( oliver );
    } );

    it( `should be a part of it's own relative list`, () => {
      let oliver = new Pig(),
        pepper = new Pig(),
        waffle = new Emu(),
        kevin = new Emu();
      expect( oliver.relativeList ).toContain( oliver );
      expect( pepper.relativeList ).toContain( pepper );
      expect( waffle.relativeList ).toContain( waffle );
      expect( kevin.relativeList ).toContain( kevin );
    } );

    it( `should have an object to hold attributes`, () => {
      let oliver = new Pig(),
        pepper = new Pig(),
        waffle = new Emu(),
        kevin = new Emu();

      expect( typeof oliver.attributeStore ).toEqual( `object` );
      expect( typeof oliver.attributeStore.speed ).toEqual( `number` );
      expect( typeof oliver.attributeStore.logic ).toEqual( `number` );
      expect( typeof oliver.attributeStore.power ).toEqual( `number` );
      expect( oliver.attributeStore ).not.toBe( pepper.attributeStore );

      expect( typeof waffle.attributeStore ).toEqual( `object` );
      expect( typeof waffle.attributeStore.speed ).toEqual( `number` );
      expect( typeof waffle.attributeStore.logic ).toEqual( `number` );
      expect( typeof waffle.attributeStore.power ).toEqual( `number` );
      expect( waffle.attributeStore ).not.toBe( oliver.attributeStore );
    } );

    it( `should have an object to hold mannerisms`, () => {
      let oliver = new Pig(),
        pepper = new Pig(),
        waffle = new Emu(),
        kevin = new Emu();

      expect( typeof oliver.mannerismStore ).toEqual( `object` );
      expect( typeof oliver.mannerismStore.hunger ).toEqual( `number` );
      expect( typeof oliver.mannerismStore.energy ).toEqual( `number` );
      expect( typeof oliver.mannerismStore.friend ).toEqual( `number` );
      expect( oliver.mannerismStore ).not.toBe( pepper.mannerismStore );

      expect( typeof waffle.mannerismStore ).toEqual( `object` );
      expect( typeof waffle.mannerismStore.hunger ).toEqual( `number` );
      expect( typeof waffle.mannerismStore.energy ).toEqual( `number` );
      expect( typeof waffle.mannerismStore.friend ).toEqual( `number` );
      expect( waffle.mannerismStore ).not.toBe( oliver.mannerismStore );
    } );

    it( `should have an object to hold what it is aware of`, () => {
      let oliver = new Pig(),
        pepper = new Pig(),
        waffle = new Emu(),
        kevin = new Emu();

      expect( typeof oliver.awarenessStore ).toEqual( `object` );
      expect( Object.keys( oliver.awarenessStore ).length ).toEqual( 0 );
    } );

    it( `should have an object to hold what it knows`, () => {
      let oliver = new Pig(),
        pepper = new Pig(),
        waffle = new Emu(),
        kevin = new Emu();

      expect( typeof oliver.knowledgeStore ).toEqual( `object` );
      expect( waffle.knowledgeStore.localeList.constructor ).toEqual( Array );
    } );

    it( `should start with a null name`, () => {
      let oliver = new Pig(),
        pepper = new Pig(),
        waffle = new Emu(),
        kevin = new Emu();

      expect( oliver.name ).toEqual( null );
      expect( pepper.name ).toEqual( null );
      expect( waffle.name ).toEqual( null );
      expect( kevin.name ).toEqual( null );
      expect( oliver.name ).not.toEqual( `Oliver` );
    } );

    it( `should not be able to be a parent until the configuration time is over`, () => {

      jasmine.clock().install();

      let oliver = new Pig(),
        pepper = new Pig(),
        waffle = new Emu(),
        kevin = new Emu();

      expect( oliver.isAbleParent ).toEqual( false );

      jasmine.clock().tick( config.birthToAbleParentTime - 10 );

      expect( oliver.isAbleParent ).toEqual( false );

      jasmine.clock().tick( 10 );

      expect( oliver.isAbleParent ).toEqual( true );
      expect( waffle.isAbleParent ).toEqual( true );

      jasmine.clock().uninstall();
    } );

  } );

  describe( `can`, () => {

    it( `move to a coordinate`, () => {

      jasmine.clock().install();

      let oliver = new Pig();

      oliver
        .setPosition( 10, 10 )
        .setMode( `manual` );

      expect( oliver.x ).toBe( 10 );
      expect( oliver.y ).toBe( 10 );

      oliver
        .move( 20, 20 );

      expect( oliver.x > 10 ).toBe( true );
      expect( oliver.y > 10 ).toBe( true );
      expect( oliver.element.classList ).toContain( `scoot` );

      jasmine.clock().tick( 5000 );

      expect( oliver.__hasReached( 20, 20 ) ).toBe( true );
      expect( oliver.element.classList ).not.toContain( `scoot` );

      jasmine.clock().uninstall();

    } );

    it( `move to another item`, () => {

      jasmine.clock().install();

      let oliver = new Pig(),
        waffle = new Emu();

      oliver
        .setPosition( 10, 10 )
        .setMode( `manual` );

      waffle
        .setPosition( 20, 20 )
        .setMode( `manual` );

      expect( oliver.x ).toBe( 10 );
      expect( oliver.y ).toBe( 10 );

      expect( waffle.x ).toBe( 20 );
      expect( waffle.y ).toBe( 20 );

      oliver
        .move( waffle );

      expect( oliver.x > 10 ).toBe( true );
      expect( oliver.y > 10 ).toBe( true );
      expect( oliver.element.classList ).toContain( `scoot` );

      jasmine.clock().tick( 5000 );

      expect( oliver.__hasReached( 20, 20 ) ).toBe( true );
      expect( oliver.element.classList ).not.toContain( `scoot` );

      jasmine.clock().uninstall();

    } );

    it( `eat turf`, () => {

      jasmine.clock().install();

      let oliver = new Pig(),
        turf = new Turf();

      expect( oliver.element.classList ).not.toContain( `munch` );
      expect( oliver.mannerismStore.hunger ).toBe( 0 );

      turf
        .setGrowth( 1 )
        .setPosition( 10, 10 );

      oliver
        .setPosition( 10, 10 )
        .setMode( `manual` )
        .eat( turf );

      expect( oliver.element.classList ).toContain( `munch` );
      expect( oliver.mannerismStore.hunger ).not.toBe( 0 );

      jasmine.clock().tick( 10000 );

      expect( oliver.mannerismStore.hunger > 0.25 ).toBe( true );
      expect( turf.growth < 0 ).toBe( true );

      jasmine.clock().uninstall();

    } );

    it( `wander around`, () => {

      var lastX, lastY;

      jasmine.clock().install();

      let kevin = new Emu();
      kevin
        .setMode( `manual` )
        .setPosition( 50, 50 );

      expect( kevin.x ).toBe( 50 );
      expect( kevin.y ).toBe( 50 );

      jasmine.clock().tick( 10 );

      expect( kevin.x ).toBe( 50 );
      expect( kevin.y ).toBe( 50 );

      kevin.wander();

      expect( kevin.x ).not.toBe( 50 );
      expect( kevin.y ).not.toBe( 50 );

      lastX = kevin.x;
      lastY = kevin.y;

      jasmine.clock().tick( 10000 );

      expect( lastX ).not.toBe( kevin.x );
      expect( lastY ).not.toBe( kevin.y );

      lastX = kevin.x;
      lastY = kevin.y;

      jasmine.clock().tick( 1000 );

      expect( lastX ).toBe( kevin.x );
      expect( lastY ).toBe( kevin.y );

      jasmine.clock().uninstall();

    } );

    it( `sleep`, () => {

      jasmine.clock().install();

      let waffle = new Emu()
        .setMode( `manual` );

      expect( waffle.mannerismStore.energy ).toBe( 0 );
      expect( waffle.element.classList ).not.toContain( `sleep` );

      waffle.sleep();
      expect( waffle.element.classList ).toContain( `sleep` );

      jasmine.clock().tick( 10 );

      expect( waffle.mannerismStore.energy ).not.toBe( 0 );
      expect( waffle.element.classList ).toContain( `sleep` );

      jasmine.clock().tick( 10000 );

      expect( waffle.mannerismStore.energy ).toBe( 1 );
      expect( waffle.element.classList ).not.toContain( `sleep` );

      jasmine.clock().uninstall();

    } );

    it( `be a good friend :3`, () => {

      jasmine.clock().install();

      let pepper = new Pig().setMode( `manual` ),
        waffle = new Emu().setMode( `manual` );

      expect( waffle.mannerismStore.friend ).toBe( 0 );
      expect( waffle.element.classList ).not.toContain( `heart` );

      expect( pepper.mannerismStore.friend ).toBe( 0 );
      expect( pepper.element.classList ).not.toContain( `heart` );

      waffle.friend( pepper );
      pepper.friend( waffle );

      expect( waffle.element.classList ).toContain( `heart` );
      expect( pepper.element.classList ).toContain( `heart` );

      jasmine.clock().tick( 10 );

      expect( waffle.mannerismStore.friend ).not.toBe( 0 );
      expect( waffle.element.classList ).toContain( `heart` );

      expect( pepper.mannerismStore.friend ).not.toBe( 0 );
      expect( pepper.element.classList ).toContain( `heart` );

      jasmine.clock().tick( 10000 );

      expect( waffle.mannerismStore.friend ).toBe( 1 );
      expect( waffle.element.classList ).not.toContain( `heart` );

      expect( pepper.mannerismStore.friend ).toBe( 1 );
      expect( pepper.element.classList ).not.toContain( `heart` );

      jasmine.clock().uninstall();

    } );

  } );

  describe( `during every tick will`, () => {

    it( `grow tired`, () => {

      let oliver = new Pig(),
        pepper = new Pig(),
        waffle = new Emu(),
        kevin = new Emu();

      expect( true ).toBe( false );

    } );

    it( `grow hungry`, () => {

      let oliver = new Pig(),
        pepper = new Pig(),
        waffle = new Emu(),
        kevin = new Emu();

      expect( true ).toBe( false );

    } );

    it( `grow lonely`, () => {

      let oliver = new Pig(),
        pepper = new Pig(),
        waffle = new Emu(),
        kevin = new Emu();

      expect( true ).toBe( false );

    } );

    it( `look at its surroundings`, () => {

      let oliver = new Pig(),
        pepper = new Pig(),
        waffle = new Emu(),
        kevin = new Emu();

      expect( true ).toBe( false );

    } );

    it( `search for unseen food if hungry`, () => {

      let oliver = new Pig(),
        pepper = new Pig(),
        waffle = new Emu(),
        kevin = new Emu();

      expect( true ).toBe( false );

    } );

    it( `move toward visible food if hungry`, () => {

      let oliver = new Pig(),
        pepper = new Pig(),
        waffle = new Emu(),
        kevin = new Emu();

      expect( true ).toBe( false );

    } );

    it( `eat nearby food if hungry`, () => {

      let oliver = new Pig(),
        pepper = new Pig(),
        waffle = new Emu(),
        kevin = new Emu();

      expect( true ).toBe( false );

    } );

    it( `sleep if tired`, () => {

      let oliver = new Pig(),
        pepper = new Pig(),
        waffle = new Emu(),
        kevin = new Emu();

      expect( true ).toBe( false );

    } );

    it( `search for unseen animals if lonely`, () => {

      let oliver = new Pig(),
        pepper = new Pig(),
        waffle = new Emu(),
        kevin = new Emu();

      expect( true ).toBe( false );

    } );

    it( `move toward visible animals if lonely`, () => {

      let oliver = new Pig(),
        pepper = new Pig(),
        waffle = new Emu(),
        kevin = new Emu();

      expect( true ).toBe( false );

    } );

    it( `make friends with nearby animals if lonely`, () => {

      let oliver = new Pig(),
        pepper = new Pig(),
        waffle = new Emu(),
        kevin = new Emu();

      expect( true ).toBe( false );

    } );

    it( `spawn a child if all of its needs are met`, () => {

      let oliver = new Pig(),
        pepper = new Pig(),
        waffle = new Emu(),
        kevin = new Emu();

      expect( true ).toBe( false );

    } );

  } );

  describe( `can set its`, () => {

    it( `barn`, () => {

      let barn = {},
        pepper = new Pig();

      expect( pepper.barn ).toBe( undefined );

      pepper.setBarn( barn );

      expect( pepper.barn ).toBe( barn );

    } );

    it( `ability to parent`, () => {

      let kevin = new Emu();

      expect( kevin.isAbleParent ).toBe( false );

      kevin.setIsAbleParent( true );

      expect( kevin.isAbleParent ).toBe( true );

    } );

    it( `mode`, () => {

      let kevin = new Emu();

      expect( kevin.mode ).toBe( `auto` );

      kevin.setMode( `manual` );

      expect( kevin.mode ).toBe( `manual` );

      kevin.setMode( `hybrid` );

      expect( kevin.mode ).toBe( `hybrid` );

    } );

  } );

} );