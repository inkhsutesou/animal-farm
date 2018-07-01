function setBarn ( barn ) {
  this.barn = barn;
  return this;
}

function setIsAbleParent ( bool ) {
  this.isAbleParent = bool;
  return this;
}

module.exports = { setBarn, setIsAbleParent };