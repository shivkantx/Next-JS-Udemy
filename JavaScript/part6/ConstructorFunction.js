function Person(name, age) {
  this.name = name;
  this.age = age;
}

function Car(make, model) {
  this.make = make;
  this.model = model;
}

let myCar = new Car("Toyota", "camry");
// console.log(myCar);

let myNewCar = Car("Toyota", "camry");
// console.log(myNewCar);

function Tea(type) {
  this.type = type;
  this.describe = function () {
    return `This is cup of ${this.type}`;
  };
}

let lemonTea = new Tea("Lemon Tea");
// console.log(lemonTea);
// console.log(lemonTea.describe());

function Animal(species) {
  this.species = species;
}

Animal.prototype.sound = function () {
  return `${this.species} make a sound`;
};

let dog = new Animal("DOG");
// console.log(dog.sound());

let Cat = new Animal("Cat");
// console.log(Cat.sound());

function Drink(name) {
  if (!new.target) {
    throw new Error("Drink Must be called with new keywords");
  }
  this.name = name;
}

let tea = new Drink("tea");
let coffee = Drink("coffee");
