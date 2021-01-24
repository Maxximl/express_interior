const nextDatasetIdGenerator = createIdGenerator("dataset");
const id = nextDatasetIdGenerator();

function createIdGenerator(prefix) {
  let id = 0;
  return () => {
    return `${prefix}_${id++}`;
  };
}

function wolf(name) {
  const howl = () => {
    console.log(this.name + ": awooooooo");
  };

  return { howl };
}

function dog(name) {
  const woof = () => {
    console.log(this.name + ": woof");
  };

  return {
    ...wolf(name),
    woof,
  };
}

const vincent = dog("Vincent");
