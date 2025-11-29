class NewPokemon {
  constructor(public readonly id: number, public name: string) {}

  scream() {
    console.log("No");
  }

  speak() {
    console.log("No");
  }
}

const CustomDecorator = () => {
  return (target: Function) => {
    console.log("CustomDecorator called on:", target);
    return NewPokemon;
  };
};

@CustomDecorator()
export class Pokemon {
  constructor(public readonly id: number, public name: string) {}

  scream() {
    console.log(`${this.name.toUpperCase()}!!!`);
  }

  speak() {
    console.log(`${(this.name, this.name)}`);
  }
}

export const charmander = new Pokemon(4, "Charmander");
charmander.scream();
