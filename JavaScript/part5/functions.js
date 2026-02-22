/*
1. Write a function named makeTea that takes one parameter, `typeofTea`, and returns a string like "Making green tea" when called with "green tea"`.
Store the result in a variable named teaorder`.
*/
function makeTea(typeofTea) {
  return `Making ${typeofTea}`;
}
teaorder = makeTea("green tea");
// console.log(teaorder);

/*
2. Create a function named 'orderTea that takes one parameter, `teaType`. Inside this function, create another function named confirmorder that returns a message like "Order confirmed for chai". Call confirmOrder from within `orderTea and return the result.
*/

function orderTea(teaType) {
  function confirmorder() {
    return `Order confirmed for chai`;
  }
  return confirmorder();
}
// console.log(orderTea());

/*
3. Write an arrow function named calculateTotal that takes two parameters: `price` and `quantity. The function should return the total cost by multiplying the `price` and `quantity`.
Store the result in a variable named 'totalCost`.
*/

const calculateTotal = (price, quantity) => {
  return price * quantity;
};
let totalCost = calculateTotal(10, 4);
// console.log(totalCost);

/*
4. Write a function named 'processTeaorder that takes another function, `makeTea, as a parameter and calls it with the argument "earl grey".
Return the result of calling makeTea`.
*/

function makeTea(typeOfTea) {
  return `make tea : ${typeOfTea}`;
}
function processTeaorder(teaFunction) {
  return teaFunction("earl grey");
}
let order = processTeaorder(makeTea);
// console.log(order);

/*
5. Write a function named 'createTeaMaker that returns another function. The returned function should take one parameter, `teaType`, and return a message like "Making green tea"
Store the returned function in a variable named `teaMaker and call it with "green tea".
*/

function createTeaMaker() {
  return function (teaType) {
    return `Making ${teaType}`;
  };
}

const teaMaker = createTeaMaker();
console.log(teaMaker("green tea"));
