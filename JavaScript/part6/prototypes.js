let computer = { cpu: 12 };
let lenevo = {
  screen: "HD",
  __proto__: computer,
};
let tomHardware = {};

// console.log(`Computer : `, computer.__proto__);
// console.log(`Computer : `, lenevo.__proto__);

let genricCar = {
  tires: 4,
};

let tesla = {
  driver: "AI",
};

Object.setPrototypeOf(tesla, genricCar);
// console.log(`Tesls : `, genricCar);
console.log("Tesla : ", Object.getPrototypeOf(tesla));
