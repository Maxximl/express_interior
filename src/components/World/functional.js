const wolf = {
  howl: function () {
    console.log(this.name + ": awooooo");
  },
};

const dog = Object.create(wolf, {
  woof: {
    value: function () {
      console.log(this.name + ": woof");
    },
  },
});

const vincent = Object.create(dog, {
  name: { value: "Vincent" },
});

vincent.howl();
vincent.woof();
