function inherit(proto) {
  function ChainLink() {}
  ChainLink.prototype = proto;
  return new ChainLink();
}

function Wolf(name) {
  this.name = name;
}

Wolf.prototype.howl = function () {
  console.log(this.name + ": awooooooo");
};

function Dog(name) {
  Wolf.call(this, name + " the dog");
}

Dog.prototype.woof = function () {
  console.log(this.name + ": woof");
};

Dog.prototype = inherit(Wolf.prototype);
Dog.prototype = Object.create(Wolf.prototype);
Object.setPrototypeOf(Dog, Wolf);
