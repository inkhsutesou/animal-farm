var { Animal } = require( `../src/js/class/animal/animal.js` );

describe( "test", function () {

 it( `makes the animal go`, () => {

  expect( new Animal() ).toBeDefined();

 } )

});