var { Item } = require( `./item.js` )
  hueList = [ [ 0, 30 ] ],
  satList = [ [ 40, 60 ] ],
  lumList = [ [ 30, 50 ] ],
  colorStore = { hueList, satList, lumList };

class Barn extends Item {

  constructor () {

    super();

    this.element = new BarnItem();
    this.colorStore = colorStore;

    this.name = null;
    this
      .setColor()
      .setSize( 20 );

    this.registeredListStore = {};
    this.raised = Date.now();

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