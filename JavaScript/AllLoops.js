/*
1. Write a for loop that loops through the array ["green tea", "black tea", "chai", "oolong tea"]` and stops the loop when it finds "chai".
Store all teas before "chai" in a new array named `selectedTeas`.
*/
let tea = ["green tea", "black tea", "chai", "oolong tea"];
let selectedTeas = [];

for (let i = 0; i < tea.length; i++) {
  if (tea[i] === "chai") break;
  selectedTeas.push(tea[i]);
}
// console.log(selectedTeas);

/*
2. Write a for loop that loops through the array ["London", "New York", "Paris", "Berlin"]` and skips "Paris".
Store the other cities in a new array named `visitedCities`.
*/

let cities = ["London", "New York", "Paris", "Berlin"];
let visitedCities = [];

for (let i = 0; i < cities.length; i++) {
  if (cities[i] === "Paris") continue;
  visitedCities.push(cities[i]);
}
// console.log(visitedCities);

/*
3. Use a for-of loop to iterate through the array [1, 2, 3, 4, 5]` and stop when the number `4` is found.
Store the numbers before `4` in an array named smallNumbers`.
*/

let array = [1, 2, 3, 4, 5];
let smallNumbers = [];

for (const val of array) {
  if (val === 4) break;
  smallNumbers.push(val);
}
// console.log(smallNumbers);

/*
4. Use a for-of loop to iterate through the array ["chai", "green tea", "herbal tea", "black tea"]` and skip "herbal tea"`.
Store the other teas in an array named 'preferredTeas
*/

let teaCollection = ["chai", "green tea", "herbal tea", "black tea"];
let preferredTeas = [];

for (const val of teaCollection) {
  if (val === "herbal tea") continue;
  preferredTeas.push(val);
}
// console.log(preferredTeas);

/*
5. Use a for-in' loop to loop through an object containing city populations.
Stop the loop when the population of "Berlin" is found and store all previous cities' populations in a new object named cityPopulations`.
let citiesPopulation = {
"London": 8900000,
"New York": 8400000,
"Paris": 2200000,
"Berlin": 3500000
};
*/

let citiesPopulation = {
  London: 8900000,
  "New York": 8400000,
  Paris: 2200000,
  Berlin: 3500000,
};
let cityPopulations = {};

for (const city in citiesPopulation) {
  if (city === "Berlin") break;
  cityPopulations[city] = citiesPopulation[city];
}
console.log(cityPopulations);
