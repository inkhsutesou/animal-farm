var { Animal, AnimalItem, animalList } = require( `../src/js/class/animal/animal.js` ),
  { Pig, pigList } = require( `../src/js/class/animal/library/pig.js` ),
  { Emu, emuList } = require( `../src/js/class/animal/library/emu.js` ),
  { Turf, TurfItem, turfList } = require( `../src/js/class/turf/turf.js` ),
  { Barn, BarnItem } = require( `../src/js/class/barn/barn.js` ),

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

      var lastX = 50, lastY = 50;

      jasmine.clock().install();

      let kevin = new Emu();
      kevin
        .setMode( `manual` )
        .setPosition( lastX, lastY );

      expect( kevin.x ).toBe( lastX );
      expect( kevin.y ).toBe( lastY );

      kevin.wander();
      jasmine.clock().tick( 10000 );

      expect( lastX ).not.toBe( kevin.x );
      expect( lastY ).not.toBe( kevin.y );

      lastX = kevin.x;
      lastY = kevin.y;

      kevin.wander();
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

      jasmine.clock().install();

      let waffle = new Emu();
      waffle.mannerismStore.energy = 1;
      expect( waffle.mannerismStore.energy ).toBe( 1 );
      waffle.go();
      jasmine.clock().tick( 1000 );
      expect( waffle.mannerismStore.energy ).toBeLessThan( 1 );

      jasmine.clock().uninstall();

    } );

    it( `grow hungry`, () => {

      jasmine.clock().install();

      let kevin = new Emu();
      kevin.mannerismStore.hunger = 1;
      expect( kevin.mannerismStore.hunger ).toBe( 1 );
      kevin.go();
      jasmine.clock().tick( 1000 );
      expect( kevin.mannerismStore.hunger ).toBeLessThan( 1 );

      jasmine.clock().uninstall();

    } );

    it( `grow lonely`, () => {

      jasmine.clock().install();

      let pepper = new Emu();
      pepper.mannerismStore.friend = 1;
      expect( pepper.mannerismStore.friend ).toBe( 1 );
      pepper.go();
      jasmine.clock().tick( 1000 );
      expect( pepper.mannerismStore.friend ).toBeLessThan( 1 );

      jasmine.clock().uninstall();

    } );

    it( `look at its surroundings`, () => {

      ( [ animalList, pigList, emuList, turfList ] )
        .some( array => {
          while( array.length ) { array.pop() }
        } );

      let barn = new Barn(),
        oliver = new Pig(),
        kevin = new Emu(),
        turf = new Turf();

      barn
        .setPosition( 50, 50 )
        .registerList( `turf`, turfList )
        .registerList( `pig`, pigList )
        .registerList( `emu`, emuList )
        .registerList( `animal`, animalList );

      oliver
        .setPosition( 25, 25 )
        .setBarn( barn );

      kevin
        .setPosition( 25, 25 )
        .setBarn( barn );

      turf
        .setPosition( 25, 25 );

      expect( oliver.awarenessStore.pig ).toBe( undefined );
      expect( oliver.awarenessStore.emu ).toBe( undefined );
      expect( oliver.awarenessStore.turf ).toBe( undefined );

      oliver.see();

      expect( oliver.awarenessStore.pig ).toBe( undefined );
      expect( oliver.awarenessStore.emu ).toBe( kevin );
      expect( oliver.awarenessStore.turf ).toBe( turf );

    } );

    it( `search for unseen food if hungry`, () => {

      ( [ animalList, pigList, emuList, turfList ] )
        .some( array => {
          while( array.length ) { array.pop() }
        } );

      jasmine.clock().install();

      let barn = new Barn(),
        waffle = new Emu(),
        turf = new Turf();

      barn
        .setPosition( 50, 50 )
        .registerList( `turf`, turfList );

      waffle.mannerismStore.hunger = 0;
      waffle.mannerismStore.energy = 1;
      waffle.mannerismStore.friend = 1;
      Object.defineProperty( waffle.mannerismStore, `energy`, { writable: false } );
      Object.defineProperty( waffle.mannerismStore, `friend`, { writable: false } );

      waffle
        .setBarn( barn )
        .setPosition( 50, 50 );

      turf
        .setGrowth( 1 )
        .setPosition( 25, 25 );

      expect( waffle.element.classList ).not.toContain( `scoot` );
      expect( waffle.logText.toLowerCase() ).not.toContain( `wander` );
      expect( waffle.awarenessStore.turf ).toBe( undefined );
      expect( waffle.activity ).toBe( `` );

      waffle.go();
      Object.defineProperty( waffle.mannerismStore, `energy`, { writable: true } );
      Object.defineProperty( waffle.mannerismStore, `friend`, { writable: true } );

      jasmine.clock().tick( 1000 );

      expect( waffle.element.classList ).toContain( `scoot` );
      expect( waffle.logText.toLowerCase() ).toContain( `wander` );
      expect( waffle.awarenessStore.turf ).toBe( null );
      expect( waffle.activity ).toBe( `wander` );

      jasmine.clock().uninstall();

    } );

    it( `move toward visible food if hungry`, () => {

      ( [ animalList, pigList, emuList, turfList ] )
        .some( array => {
          while( array.length ) { array.pop() }
        } );

      jasmine.clock().install();

      let barn = new Barn(),
        waffle = new Emu(),
        turf = new Turf();

      barn
        .setPosition( 50, 50 )
        .registerList( `turf`, turfList );

      waffle.mannerismStore.hunger = 0;
      waffle.mannerismStore.energy = 1;
      waffle.mannerismStore.friend = 1;
      Object.defineProperty( waffle.mannerismStore, `energy`, { writable: false } );
      Object.defineProperty( waffle.mannerismStore, `friend`, { writable: false } );

      waffle
        .setBarn( barn )
        .setPosition( 50, 50 );

      turf
        .setGrowth( 1 )
        .setPosition( 45, 45 );

      expect( waffle.element.classList ).not.toContain( `scoot` );
      expect( waffle.logText.toLowerCase() ).not.toContain( `see .. turf` );
      expect( waffle.logText.toLowerCase() ).not.toContain( `find food, eat food` );
      expect( waffle.awarenessStore.turf ).toBe( undefined );
      expect( waffle.activity ).toBe( `` );
      expect( waffle.mannerismStore.hunger ).toBe( 0 );

      waffle.go();
      Object.defineProperty( waffle.mannerismStore, `energy`, { writable: true } );
      Object.defineProperty( waffle.mannerismStore, `friend`, { writable: true } );

      jasmine.clock().tick( 500 );

      expect( waffle.element.classList ).toContain( `scoot` );
      expect( waffle.logText.toLowerCase() ).toContain( `see .. turf` );
      expect( waffle.logText.toLowerCase() ).toContain( `find food, eat food` );
      expect( waffle.awarenessStore.turf ).toBe( turf );
      expect( waffle.activity ).toBe( `` );
      expect( waffle.mannerismStore.hunger ).not.toBeGreaterThan( 0 );

      jasmine.clock().uninstall();

    } );

    it( `eat nearby food if hungry`, () => {

      ( [ animalList, pigList, emuList, turfList ] )
        .some( array => {
          while( array.length ) { array.pop() }
        } );

      jasmine.clock().install();

      let barn = new Barn(),
        waffle = new Emu(),
        turf = new Turf();

      barn
        .setPosition( 50, 50 )
        .registerList( `turf`, turfList );

      waffle.mannerismStore.hunger = 0;
      waffle.mannerismStore.energy = 1;
      waffle.mannerismStore.friend = 1;
      Object.defineProperty( waffle.mannerismStore, `energy`, { writable: false } );
      Object.defineProperty( waffle.mannerismStore, `friend`, { writable: false } );

      waffle
        .setBarn( barn )
        .setPosition( 50, 50 );

      turf
        .setGrowth( 2 )
        .setPosition( 45, 45 );

      expect( waffle.element.classList ).not.toContain( `munch` );
      expect( waffle.logText.toLowerCase() ).not.toContain( `see .. turf` );
      expect( waffle.logText.toLowerCase() ).not.toContain( `find food, eat food` );
      expect( waffle.awarenessStore.turf ).toBe( undefined );
      expect( waffle.activity ).toBe( `` );
      expect( waffle.mannerismStore.hunger ).toBe( 0 );

      waffle.go();

      Object.defineProperty( waffle.mannerismStore, `energy`, { writable: true } );
      Object.defineProperty( waffle.mannerismStore, `friend`, { writable: true } );

      jasmine.clock().tick( 1500 );

      expect( waffle.element.classList ).toContain( `munch` );
      expect( waffle.logText.toLowerCase() ).toContain( `see .. turf` );
      expect( waffle.logText.toLowerCase() ).toContain( `find food, eat food` );
      expect( waffle.awarenessStore.turf ).toBe( turf );
      expect( waffle.activity ).toBe( `eat` );
      expect( waffle.mannerismStore.hunger ).toBeGreaterThan( 0.1 );

      jasmine.clock().uninstall();

    } );

    it( `sleep if tired`, () => {

      jasmine.clock().install();

      let pepper = new Pig();

      pepper.mannerismStore.hunger = 1;
      pepper.mannerismStore.energy = 0;
      pepper.mannerismStore.friend = 1;
      Object.defineProperty( pepper.mannerismStore, `hunger`, { writable: false } );
      Object.defineProperty( pepper.mannerismStore, `friend`, { writable: false } );

      pepper
        .setName( `pepper` );

      expect( pepper.element.classList ).not.toContain( `sleep` );
      expect( pepper.logText.toLowerCase() ).not.toContain( `sleep` );
      expect( pepper.activity ).toBe( `` );
      expect( pepper.mannerismStore.energy ).toBe( 0 );

      pepper.go();
      Object.defineProperty( pepper.mannerismStore, `hunger`, { writable: true } );
      Object.defineProperty( pepper.mannerismStore, `friend`, { writable: true } );
      jasmine.clock().tick( 500 );

      expect( pepper.element.classList ).toContain( `sleep` );
      expect( pepper.logText.toLowerCase() ).toContain( `sleep` );
      expect( pepper.activity ).toBe( `sleep` );
      expect( pepper.mannerismStore.energy ).toBeGreaterThan( 0 );

      jasmine.clock().uninstall();

    } );

    it( `search for unseen animals if lonely`, () => {

      ( [ animalList, pigList, emuList, turfList ] )
        .some( array => {
          while( array.length ) { array.pop() }
        } );

      jasmine.clock().install();

      let barn = new Barn(),
        waffle = new Emu(),
        pepper = new Pig();

      barn
        .setPosition( 50, 50 )
        .registerList( `pig`, pigList );

      waffle.mannerismStore.hunger = 1;
      waffle.mannerismStore.energy = 1;
      waffle.mannerismStore.friend = 0;
      Object.defineProperty( pepper.mannerismStore, `hunger`, { writable: false } );
      Object.defineProperty( pepper.mannerismStore, `energy`, { writable: false } );

      waffle
        .setBarn( barn )
        .setPosition( 50, 50 );

      pepper
        .setBarn( barn )
        .setPosition( 25, 25 );

      expect( waffle.element.classList ).not.toContain( `scoot` );
      expect( waffle.logText.toLowerCase() ).not.toContain( `wander` );
      expect( waffle.awarenessStore.pig ).toBe( undefined );
      expect( waffle.activity ).toBe( `` );

      waffle.go();
      Object.defineProperty( pepper.mannerismStore, `hunger`, { writable: true } );
      Object.defineProperty( pepper.mannerismStore, `energy`, { writable: true } );

      jasmine.clock().tick( 1000 );

      expect( waffle.element.classList ).toContain( `scoot` );
      expect( waffle.logText.toLowerCase() ).toContain( `wander` );
      expect( waffle.awarenessStore.pig ).toBe( null );
      expect( waffle.activity ).toBe( `wander` );

      jasmine.clock().uninstall();

    } );

    it( `move toward visible animals if lonely`, () => {

      ( [ animalList, pigList, emuList, turfList ] )
        .some( array => {
          while( array.length ) { array.pop() }
        } );

      jasmine.clock().install();

      let barn = new Barn(),
        waffle = new Emu(),
        pepper = new Pig();

      barn
        .setPosition( 50, 50 )
        .registerList( `turf`, turfList )
        .registerList( `pig`, pigList )
        .registerList( `animal`, animalList );

      waffle.mannerismStore.hunger = 1;
      waffle.mannerismStore.energy = 1;
      waffle.mannerismStore.friend = 0;
      Object.defineProperty( waffle.mannerismStore, `hunger`, { writable: false } );
      Object.defineProperty( waffle.mannerismStore, `energy`, { writable: false } );

      waffle
        .setBarn( barn )
        .setPosition( 50, 50 )
        .setName( `waffle` );

      pepper
        .setBarn( barn )
        .setPosition( 45, 45 )
        .setName( `pepper` );

      expect( waffle.element.classList ).not.toContain( `scoot` );
      expect( waffle.logText.toLowerCase() ).not.toContain( `see .. pig: pepper` );
      expect( waffle.logText.toLowerCase() ).not.toContain( `find friend, be friend` );
      expect( waffle.awarenessStore.pig ).toBe( undefined );
      expect( waffle.activity ).toBe( `` );
      expect( waffle.mannerismStore.friend ).toBe( 0 );

      waffle.go();
      Object.defineProperty( waffle.mannerismStore, `hunger`, { writable: true } );
      Object.defineProperty( waffle.mannerismStore, `energy`, { writable: true } );

      jasmine.clock().tick( 500 );

      expect( waffle.element.classList ).toContain( `scoot` );
      expect( waffle.logText.toLowerCase() ).toContain( `see .. pig: pepper` );
      expect( waffle.logText.toLowerCase() ).toContain( `find friend, be friend` );
      expect( waffle.awarenessStore.pig ).toBe( pepper );
      expect( waffle.activity ).toBe( `` );
      expect( waffle.mannerismStore.friend ).not.toBeGreaterThan( 0 );

      jasmine.clock().uninstall();

    } );

    it( `make friends with nearby animals if lonely`, () => {

      ( [ animalList, pigList, emuList, turfList ] )
        .some( array => {
          while( array.length ) { array.pop() }
        } );

      jasmine.clock().install();

      let barn = new Barn(),
        waffle = new Emu(),
        pepper = new Pig();

      barn
        .setPosition( 50, 50 )
        .registerList( `turf`, turfList )
        .registerList( `pig`, pigList )
        .registerList( `animal`, animalList );

      waffle.mannerismStore.hunger = 1;
      waffle.mannerismStore.energy = 1;
      waffle.mannerismStore.friend = 0;
      Object.defineProperty( waffle.mannerismStore, `hunger`, { writable: false } );
      Object.defineProperty( waffle.mannerismStore, `energy`, { writable: false } );

      waffle
        .setBarn( barn )
        .setPosition( 50, 50 )
        .setName( `waffle` );

      pepper
        .setBarn( barn )
        .setPosition( 45, 45 )
        .setName( `pepper` );

      expect( waffle.element.classList ).not.toContain( `heart` );
      expect( waffle.awarenessStore.pig ).toBe( undefined );
      expect( waffle.activity ).toBe( `` );
      expect( waffle.mannerismStore.friend ).toBe( 0 );

      waffle.go();

      Object.defineProperty( waffle.mannerismStore, `hunger`, { writable: true } );
      Object.defineProperty( waffle.mannerismStore, `energy`, { writable: true } );

      jasmine.clock().tick( 1500 );

      expect( waffle.element.classList ).toContain( `heart` );
      expect( waffle.awarenessStore.pig ).toBe( pepper );
      expect( waffle.activity ).toBe( `friend` );
      expect( waffle.mannerismStore.friend ).toBeGreaterThan( 0.1 );

      jasmine.clock().uninstall();

    } );

    it( `spawn a child if all of its needs are met`, () => {

      ( [ animalList, pigList, emuList, turfList ] )
        .some( array => {
          while( array.length ) { array.pop() }
        } );

      let barn = new Barn(),
        oliver = new Pig();

      barn
        .setPosition( 50, 50 )
        .registerList( `pig`, pigList )
        .registerList( `animal`, animalList );

      oliver.mannerismStore.hunger = 1;
      oliver.mannerismStore.energy = 1;
      oliver.mannerismStore.friend = 1;

      oliver
        .setBarn( barn )
        .setIsAbleParent( true )
        .setPosition( 50, 50 )
        .setName( `oliver` );

      expect( oliver.mannerismStore.hunger ).toBe( 1 );
      expect( oliver.mannerismStore.energy ).toBe( 1 );
      expect( oliver.mannerismStore.friend ).toBe( 1 );
      expect( animalList.length ).toBe( 1 );

      oliver.go();

      expect( oliver.mannerismStore.hunger ).toBeLessThan( 0.1 );
      expect( oliver.mannerismStore.energy ).toBeLessThan( 0.1 );
      expect( oliver.mannerismStore.friend ).toBeLessThan( 0.1 );
      expect( animalList.length ).toBe( 2 );

    } );

  } );

  describe( `can set its`, () => {

    it( `barn`, () => {

      let barn = new Barn(),
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