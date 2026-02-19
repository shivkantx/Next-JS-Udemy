/*
1. Write a 'while loop that calculates the sum of all numbers from 1 to 5 and stores the result in a variable named 'sum`. 
*/

let sum = 0;
let i = 0;
while (i <= 5) {
  sum += i;
  i++;
}
// console.log("sum is : " + sum);

/*
2. Write a while loop that counts down from 5 to 1 and stores the numbers in an array named 'countdown`.
*/
let countArr = [];
let j = 1;
while (j <= 5) {
  countArr.push(j);
  j++;
}
// console.log("Count Array is : ", countArr);

/*
3. Write a do while loop that prompts a user to enter their favorite tea type until they enter "stop"`.
Store each tea type in an array named `teaCollection`.*/
const prompt = require("prompt-sync")(); // Import the library

let teaCollection = [];
let tea;
// do {
//     tea = prompt("Enter your favorite tea (or 'stop'): ");
//     if (tea !== "stop" && tea !== null) {
//       teaCollection.push(tea);
//     }
// } while (tea !== "stop");

// console.log("Tea collection:", teaCollection);

/*
4. Write a do while loop that adds numbers from 1 to 3 and stores the result in a variable named `total`。
*/
let total = 0;
let k = 1;
do {
  total += k;
  k++;
} while (k <= 3);
// console.log("Total : ", total);

/*
5. Write a for loop that multiplies each element in the array [2, 4, 6] by 2 and stores the results in a new array named multipliedNumbers`.
*/
let multipliedNumbers = [];
let arr = [2, 4, 6];
for (let i = 0; i < arr.length; i++) {
  multipliedNumbers.push(arr[i] * 2);
}
// console.log("multipliedNumbers Arr: ", multipliedNumbers);

/*
6. Write a 'for loop that lists all the cities in the array ["Paris", "New York", "Tokyo", "London"]` and stores each city in a new array named 'cityList`.
*/
let cities = ["Paris", "New York", "Tokyo", "London"];
let cityList = [];

for (let i = 0; i < cities.length; i++) {
  cityList.push(cities[i]);
}

console.log("cityList Arr: ", cityList);
