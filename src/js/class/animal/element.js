function makeAnimalNode () {

  let node = document.createElement( `animal-item` );

  node.innerHTML = `
    <talk-item></talk-item>
    <body-item>

      <limb-item></limb-item>
      <limb-item></limb-item>

      <neck-item>
        <head-item>
          <ears-item></ears-item>
          <ears-item></ears-item>
          <face-item>
            <eyes-item></eyes-item>
            <eyes-item></eyes-item>
            <nose-item></nose-item>
            <lips-item></lips-item>
          </face-item>
        </head-item>
      </neck-item>

      <rump-item>
        <tail-item></tail-item>
        <limb-item></limb-item>
        <limb-item></limb-item>
      </rump-item>

    </body-item>
  `;

  return node;
}

module.exports = { makeAnimalNode };