
import './css/style.scss';

let { Alpaca, alpacaList } = require( `./js/class/animal/library/alpaca.js` ),
  { Emu, emuList } = require( `./js/class/animal/library/emu.js` ),
  { Pig, pigList } = require( `./js/class/animal/library/pig.js` ),
  { Turf, turfList } = require( `./js/class/turf/turf.js` ),
  { animalList } = require( `./js/class/animal/animal.js` ),
  { Barn } = require( `./js/class/barn/barn.js` ),

  barn = new Barn();

document.body.classList.add( `daynightcycle` );

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
  .setColor()
  .setName( `Alfred` )
  .setBarn( barn )
  .go();

new Alpaca()
  .setPosition( 55, 75 )
  .setFace( 225 )
  .setColor()
  .setName( `Alto` )
  .setBarn( barn )
  .go();

new Pig()
  .setPosition( 45, 75 )
  .setFace( 225 )
  .setColor()
  .setName( `Oswald` )
  .setBarn( barn )
  .go();

new Pig()
  .setPosition( 45, 75 )
  .setFace( 225 )
  .setColor()
  .setName( `Ferdinand` )
  .setBarn( barn )
  .go();

new Emu()
  .setPosition( 45, 75 )
  .setFace( 225 )
  .setColor()
  .setName( `Droma` )
  .setBarn( barn )
  .go();

new Emu()
  .setPosition( 45, 75 )
  .setFace( 225 )
  .setColor()
  .setName( `Strider` )
  .setBarn( barn )
  .go();

barn
  .setPosition( 50, 50 )
  .registerList( `turf`, turfList )
  .registerList( `alpaca`, alpacaList )
  .registerList( `pig`, pigList )
  .registerList( `emu`, emuList )
  .registerList( `animal`, animalList );