if ( customElements.get( `barn-item` ) === undefined ) {

  class BarnItem extends HTMLElement {

    constructor () {

      super();

      this.isInitialized = false;

    }

    connectedCallback () {

      if ( this.isInitialized ) {
        return;
      }

      this.isInitialized = true;

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

  }

  customElements.define( `barn-item`, BarnItem );
}

module.exports = { BarnItem : customElements.get( `barn-item` ) };