/***********************
 * Object Literal
 ***********************/
let car = {
  make: "Toyota",
  model: "Camry",
  year: 2020,
  start: function () {
    return `${this.make} car got started in ${this.year}`;
  },
};

// console.log(car.start());

/***********************
 * Constructor Function
 ***********************/
function Person(name, age) {
  this.name = name;
  this.age = age;
}

let john = new Person("John Doe", 20);
// console.log(john.name);

/***********************
 * Prototype Method
 ***********************/
function Animal(type) {
  this.type = type;
}

Animal.prototype.speak = function () {
  return `${this.type} make a sound`;
};

/***********************
 * Extending Array Prototype (Learning Purpose)
 ***********************/
Array.prototype.hitesh = function () {
  return `custom method ${this}`;
};

let myArray = [1, 2, 3, 4];
// console.log(myArray.hitesh());

let myNewArray = [1, 2, 3, 4];
// console.log(myNewArray.hitesh());

/***********************
 * ES6 Class + Inheritance
 ***********************/
class Vehical {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }

  start() {
    return `${this.make} car from ${this.model}`;
  }
}

class Car extends Vehical {
  drive() {
    return `${this.make} : this is an inheritance example`;
  }
}

let myCar = new Car("Toyota", "corolla");
// console.log(myCar.drive());
// console.log(myCar.start());

let vehObj = new Vehical("Toyota", "corolla");
// console.log(vehObj.make);

/***********************
 * Encapsulation
 ***********************/
class BankAccount {
  #balance = 0;

  deposit(amount) {
    this.#balance += amount;
    return this.#balance;
  }

  getBalance() {
    return `Toatal : $${this.#balance}`;
  }
}

let account = new BankAccount();
// Can not be access
// console.log(account.#balance);
// console.log(account.deposit(50000));
// console.log(account.getBalance());

/***********************
 * Abstraction
 ***********************/
class CoffeeMachine {
  start() {
    // Call DB
    // Filter Value
    return `Starting the machine...`;
  }

  brewCoffee() {
    // Complex calculation
    return "Brewing coffee";
  }

  pressStartButton() {
    let msg1 = this.start();
    let msg2 = this.brewCoffee();
    return `${msg1} + ${msg2}`;
  }
}

let myMachine = new CoffeeMachine();
// console.log(myMachine.start());
// console.log(myMachine.brewCoffee());
// console.log(myMachine.pressStartButton());

/***********************
 * Polymorphism
 ***********************/
class Bird {
  fly() {
    return `Flying...`;
  }
}

class Penguin extends Bird {
  fly() {
    return `Panguin can't Fly`;
  }
}

let bird = new Bird();
let penguin = new Penguin();
// console.log(bird.fly());
// console.log(penguin.fly());

/***********************
 * Static Method
 ***********************/
class Calculator {
  static add(a, b) {
    return a + b;
  }
}

// ❌ Wrong
// let miniCalc = new Calculator();
// console.log(miniCalc.add(2, 3));

// ✅ Correct
// console.log(Calculator.add(2, 3));

/***********************
 * Getters and Setters (Corrected)
 ***********************/
class Employee {
  #salary;

  constructor(name, salary) {
    if (salary < 0) {
      throw new Error("Salary can not be negative");
    }
    this.name = name;
    this.#salary = salary;
  }

  get salary() {
    return `You are not allowed to see salary`;
  }

  set salary(value) {
    if (value < 0) {
      console.error("Invalid salary");
    } else {
      this.#salary = value;
    }
  }

  getActualSalary() {
    return this.#salary;
  }
}

let emp = new Employee("Shiv", 60000);
// console.log(emp.salary);
// emp.salary = -600000;
// console.log(emp.getActualSalary());
