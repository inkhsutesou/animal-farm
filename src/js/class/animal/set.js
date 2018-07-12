function setBarn ( barn ) {
  this.barn = barn;
  return this;
}

function setMode ( string = `auto` ) {
  this.mode = string;
  return this;
}

function setIsAbleParent ( bool = false ) {
  this.isAbleParent = bool;
  return this;
}

module.exports = { setBarn, setMode, setIsAbleParent };