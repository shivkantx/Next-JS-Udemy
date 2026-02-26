/************************************
 * this, bind, call, apply – Complete Example
 ************************************/

"use strict";

/* ----------------------------------
 * Object with method (this binding)
 * ---------------------------------- */
const person = {
  name: "Shiv",
  greet() {
    console.log(`Hi, I am ${this.name}`);
  },
};

person.greet();
// Output: Hi, I am Shiv

/* ----------------------------------
 * Losing `this` reference
 * ---------------------------------- */
const greetFunction = person.greet;
greetFunction();
// Output: Hi, I am undefined (because this is lost)

/* ----------------------------------
 * bind() – fixes this permanently
 * ---------------------------------- */
const boundGreet = person.greet.bind({ name: "Kamana" });
boundGreet();
// Output: Hi, I am Kamana

/* ----------------------------------
 * call() – invoke immediately
 * ---------------------------------- */
person.greet.call({ name: "Rahul" });
// Output: Hi, I am Rahul

/* ----------------------------------
 * apply() – invoke immediately (array args)
 * ---------------------------------- */
person.greet.apply({ name: "Anita" });
// Output: Hi, I am Anita

/* ----------------------------------
 * call vs apply with arguments
 * ---------------------------------- */
function introduce(city, country) {
  console.log(`${this.name} lives in ${city}, ${country}`);
}

introduce.call({ name: "Shiv" }, "Delhi", "India");
// Output: Shiv lives in Delhi, India

introduce.apply({ name: "Shiv" }, ["Mumbai", "India"]);
// Output: Shiv lives in Mumbai, India

/* ----------------------------------
 * bind with arguments (stored for later)
 * ---------------------------------- */
const introduceLater = introduce.bind({ name: "Shiv" }, "Bangalore", "India");

introduceLater();
// Output: Shiv lives in Bangalore, India

/* ----------------------------------
 * Summary logs
 * ---------------------------------- */
console.log("bind → returns a new function");
console.log("call → executes immediately");
console.log("apply → executes immediately (array arguments)");
