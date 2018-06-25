
import './css/style.scss';

var { Alpaca, alpacaList } = require( `./js/class/animal/library/alpaca.js` ),
  { Emu, emuList } = require( `./js/class/animal/library/emu.js` ),
  { Pig, pigList } = require( `./js/class/animal/library/pig.js` ),
  { Turf, turfList } = require( `./js/class/turf.js` ),
  { animalList } = require( `./js/class/animal/animal.js` ),
  { Barn } = require( `./js/class/barn.js` ),

  barn = new Barn();

new Turf()
  .setGrowth( 0.1 )
  .setPosition( 75, 85 )
  .go();

new Turf()
  .setGrowth( 0.1 )
  .setPosition( 15, 15 )
  .go();

new Turf()
  .setGrowth( 0.1 )
  .setPosition( 25, 65 )
  .go();

new Alpaca()
  .setPosition( 50, 70 )
  .setFace( 225 )
  .setHue( 0 )
  .setName( `alpaca-red` )
  .setBarn( barn )
  .go();

new Alpaca()
  .setPosition( 55, 75 )
  .setFace( 225 )
  .setHue( 270 )
  .setName( `alpaca-violet` )
  .setBarn( barn )
  .go();

new Pig()
  .setPosition( 45, 75 )
  .setFace( 225 )
  .setHue( 270 )
  .setName( `pig-purple` )
  .setBarn( barn )
  .go();

new Pig()
  .setPosition( 45, 75 )
  .setFace( 225 )
  .setHue( 45 )
  .setName( `pig-brown` )
  .setBarn( barn )
  .go();

new Emu()
  .setPosition( 45, 75 )
  .setFace( 225 )
  .setHue( 90 )
  .setName( `emu-yellow` )
  .setBarn( barn )
  .go();

new Emu()
  .setPosition( 45, 75 )
  .setFace( 225 )
  .setHue( 135 )
  .setName( `emu-green` )
  .setBarn( barn )
  .go();

barn
  .setPosition( 50, 50 )
  .registerList( `turf`, turfList )
  .registerList( `alpaca`, alpacaList )
  .registerList( `pig`, pigList )
  .registerList( `emu`, emuList )
  .registerList( `animal`, animalList );
  console.log( barn );