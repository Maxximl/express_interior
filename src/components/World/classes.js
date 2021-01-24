class Wolf {
  constructor(name) {
    this.name = name;
  }

  howl() {
    console.log(this.name + ": awooooooo");
  }
}

class Dog extends Wolf {
  constructor(name) {
    super(name);
  }

  woof() {
    console.log(this.name + ": woof");
  }
}

const vincent = new Dog("Vincent");
vincent.howl();
vincent.woof();
