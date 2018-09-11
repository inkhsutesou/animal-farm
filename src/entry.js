
import './css/style.scss';

let { Alpaca, alpacaList } = require( `./js/class/animal/library/alpaca.js` ),
  { Emu, emuList } = require( `./js/class/animal/library/emu.js` ),
  { Pig, pigList } = require( `./js/class/animal/library/pig.js` ),
  { Turf, turfList } = require( `./js/class/turf/turf.js` ),
  { animalList } = require( `./js/class/animal/animal.js` ),
  { Barn } = require( `./js/class/barn/barn.js` ),

  barn = new Barn();

document.body.classList.add( `daynightcycle` );

/**
 * start prototyping
 */

document.addEventListener( `mousedown`, event => {
  switch ( event.target.nodeName.toLowerCase() ) {

    case `body` :

      let posX = Math.round( event.offsetX / document.body.offsetWidth * 100  ),
        posY = Math.round( event.offsetY / document.body.offsetHeight * 100  );

      new Turf()
        .setGrowth( 0.1 )
        .setPosition( posX, posY )
        .go();

    break;

    case `animal-item` :
      // event.target.classList.add( `shock` );
    break;

    default :
    break;

  }

}, false );

document.addEventListener( `mousemove`, event => {
  switch ( event.target.nodeName.toLowerCase() ) {

    case `animal-item` :

      // if ( !event.target.classList.contains( `shock` ) ) return;

      // let posX = event.offsetX / document.body.offsetWidth * 100,
      //   posY = event.offsetY / document.body.offsetHeight * 100;

      // event.target.instanceObject
      //   .setPosition( posX, posY );
    break;

    default :
    break;

  }

}, false );

document.addEventListener( `mouseup`, event => {
  switch ( event.target.nodeName.toLowerCase() ) {

    case `animal-item` :
      // event.target.classList.remove( `shock` );
    break;

    default :
    break;

  }

}, false );

/**
 * end prototyping
 */


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