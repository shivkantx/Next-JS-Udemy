/************************************
 * Example 1: Accessing DOM Element
 ************************************/
console.log("hello from script");

const textTag = document.getElementById("myParagraph");
const changeTextBtn = document.getElementById("changeTextButton");

changeTextBtn.addEventListener("click", function () {
  textTag.textContent = "The text has been changed!";
});

/************************************
 * Example 2: Traversing the DOM
 ************************************/
const ul = document.getElementById("citiesList");
const highlightFirstCity = document.getElementById("highlightFirstCity");

highlightFirstCity.addEventListener("click", function () {
  const firstCity = ul.firstElementChild; // ignores text nodes
  if (firstCity) {
    firstCity.classList.add("highlight");
  }
});

/************************************
 * Example 3: Manipulating DOM Element
 ************************************/
const coffeeType = document.getElementById("coffeeType");
const changeOrder = document.getElementById("changeOrder");

changeOrder.addEventListener("click", function () {
  coffeeType.textContent = "Espresso";
  coffeeType.style.backgroundColor = "brown";
  coffeeType.style.color = "white";
  coffeeType.style.padding = "10px";
  coffeeType.style.borderRadius = "10px";
  coffeeType.style.fontWeight = "bold";
});

/************************************
 * Example 4: Creating and Inserting Elements
 ************************************/
const shoppingList = document.getElementById("shoppingList");
const addNewItem = document.getElementById("addNewItem");

addNewItem.addEventListener("click", function () {
  const newItem = document.createElement("li");
  newItem.textContent = "Toast";
  shoppingList.prepend(newItem); // add on top
});

/************************************
 * Example 5: Removing DOM Elements
 ************************************/
const taskList = document.getElementById("taskList");
const removeLastTask = document.getElementById("removeLastTask");

removeLastTask.addEventListener("click", function () {
  if (taskList.lastElementChild) {
    taskList.lastElementChild.remove();
  }
});

/************************************
 * Example 6: Event Handling
 ************************************/
const clickMeButton = document.getElementById("clickMeButton");

clickMeButton.addEventListener("click", function () {
  alert("Welcome user");
});

/************************************
 * Example 7: Event Delegation
 ************************************/
const teaList = document.getElementById("teaList");

teaList.addEventListener("click", function (e) {
  if (e.target && e.target.matches(".teaItem")) {
    console.log(e.target.textContent);
  }
});

/************************************
 * Example 8: Form Handling
 ************************************/
const inputElement = document.getElementById("feedbackInput");
const feedbackForm = document.getElementById("feedbackForm");
const feedbackDisplay = document.getElementById("feedbackDisplay");

feedbackForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const inputValue = inputElement.value;
  feedbackDisplay.textContent = "Feedback : " + inputValue;

  feedbackDisplay.style.backgroundColor = "purple";
  feedbackDisplay.style.padding = "5px 10px";
  feedbackDisplay.style.textAlign = "center";
  feedbackDisplay.style.fontWeight = "bold";
  feedbackDisplay.style.borderRadius = "4px";
  feedbackDisplay.style.color = "white";

  inputElement.value = "";
});

/************************************
 * Example 9: DOM Content Loaded
 ************************************/
document.addEventListener("DOMContentLoaded", function () {
  const domStatus = document.getElementById("domStatus");
  domStatus.textContent = "DOM content fully loaded";
});

/************************************
 * Example 10: CSS Class Manipulation
 ************************************/
const descriptionText = document.getElementById("descriptionText");
const toggleHighlight = document.getElementById("toggleHighlight");

toggleHighlight.addEventListener("click", function () {
  descriptionText.classList.toggle("highlight");
});
