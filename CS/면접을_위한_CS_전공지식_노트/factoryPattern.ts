type CoffeeType = "latte" | "espresso";
type Coffee = Latte | Espresso;

class CoffeeFactory {
  static createCoffee(type: CoffeeType): Coffee {
    const factory = factoryList[type];
    return factory.createCoffee();
  }
}

class Latte {
  name: string;
  constructor() {
    this.name = "latte";
  }
}

class Espresso {
  name: string;
  constructor() {
    this.name = "espresso";
  }
}

class LatteFactory extends CoffeeFactory {
  static createCoffee() {
    return new Latte();
  }
}

class EspressoFactory extends CoffeeFactory {
  static createCoffee() {
    return new Espresso();
  }
}

const factoryList = { latte: LatteFactory, espresso: EspressoFactory };

const main = () => {
  //라떼 커피를 주문한다.
  const coffee = CoffeeFactory.createCoffee("latte");
  console.log(coffee.name);
};

main();
