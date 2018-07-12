if ( customElements.get( `turf-item` ) === undefined ) {

  class TurfItem extends HTMLElement {

    constructor () {

      super();

    }

    connectedCallback () {}

  }

  customElements.define( `turf-item`, TurfItem );
}

module.exports = { TurfItem : customElements.get( `turf-item` ) };