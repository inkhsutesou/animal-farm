function setName ( name ) {
  this.name = name;
  return this;
}

function setType ( type ) {
  this.type = type;
  return this;
}

function setHue ( hue ) {
  this.hue = hue;
  this.element.style.setProperty( `--hue`, hue )
  return this;
}

function setBarn ( barn ) {
  this.barn = barn;
  return this;
}

function setIsAbleParent ( bool ) {
  this.isAbleParent = bool;
  return this;
}

module.exports = { setName, setType, setHue, setBarn, setIsAbleParent };