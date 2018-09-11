function makeBarnNode () {

  let node = document.createElement( `barn-item` );

  node.innerHTML = `
    <face-item>
      <door-item></door-item>
      <loft-item></loft-item>
    </face-item>
    <wall-item></wall-item>
    <roof-item></roof-item>
    <roof-item></roof-item>
  `;

  return node;

}

module.exports = { makeBarnNode };