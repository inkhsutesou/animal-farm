var { Item } = require( `./item.js` );

class Barn extends Item {

  constructor () {

    super();

    this.element = new BarnItem();

    this.name = null;
    this
      .setHue()
      .setSize( 20 );

    this.registeredListStore = {};
    this.raised = Date.now();

  }

  setHue ( hue = 0 ) {
    this.element.style.setProperty( `--hue`, hue );
    this.color = hue;
    return this;
  }

  registerList ( name, list ) {
    this.registeredListStore[ name ] = list;
    return this;
  }

}

class BarnItem extends HTMLElement {

  constructor () {

    super();

    this.innerHTML = `
      <face-item>
        <door-item></door-item>
        <loft-item></loft-item>
      </face-item>
      <wall-item></wall-item>
      <roof-item></roof-item>
      <roof-item></roof-item>
    `;

  }

  connectedCallback () {

  }

}

customElements.define( `barn-item`, BarnItem );
module.exports = { Barn, BarnItem };