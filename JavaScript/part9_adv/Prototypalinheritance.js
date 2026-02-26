function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  console.log(`Hello, My name is ${this.name}`);
};

let shiv = new Person("Shiv");
shiv.greet();
