import { evaluate } from "./calculator.js";
import "./modal.js";

let inputArea = document.querySelector("#textarea");
let finalBtn = document.getElementById("calculate");
let historyEl = document.getElementById("history");
let buttons = document.querySelectorAll(".readbtn");
let allClearBtn = document.getElementById("btn-clear");
let delBtn = document.getElementById("btn-del");
let history = [];
let userInput;

//reading the values from the button
buttons.forEach((item) => {
  item.addEventListener("click", () => {
    inputArea.value = inputArea.value + item.innerHTML;
    userInput = inputArea.value;
  });
});

(() => {
  inputArea.focus();
})();

//Clearing the input area
allClearBtn.addEventListener("click", () => {
  inputArea.value = "";
  historyEl.innerHTML = "";
});

//reading the values from the textarea
inputArea.addEventListener("input", (e) => {
  if (e.key !== "Enter") {
    userInput = inputArea.value;
  }
});

//evaluating the final output on Equal button Click
finalBtn.addEventListener("click", () => {
  let userData = userInput.slice(0, -1);
  console.log(userData);
  displayElement(userData);
});

//On Enter evaluating the final output
window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    displayElement(userInput);
  }
});

//deleting a single value
delBtn.addEventListener("click", () => {
  userInput = userInput.substring(0, userInput.length - 1);
  inputArea.value = userInput;
});

//Updating values into the DOM
const displayElement = (data) => {
  if (data) {
    let answer = evaluate(data);
    //fallback check
    if (!answer) {
      answer = eval(data);
    }
    if (answer || answer === 0) {
      history.push({ query: data, result: answer });
      localStorage.setItem("Userhistory", JSON.stringify(history));
      historyEl.innerHTML = data;
      inputArea.value = answer;
    } else {
      alert("Please Check your Input");
      inputArea.value = "";
    }
  } else {
    alert("Please Enter Value");
  }
};

let wrapperEl = document.querySelector(".wrapper");
let outputEl = document.querySelector(".output");
let buttonWrapper = document.querySelector(".buttons");
let darkToggle = document.querySelector(".darkmodeBtn");
let darkMode = false;

darkToggle.addEventListener("click", () => {
  darkMode = !darkMode;

  if (darkMode) {
    wrapperEl.classList.add("wrapper-dark-background");
    outputEl.classList.add("output-dark-background");
    inputArea.classList.add("textarea-dark-background");
    buttonWrapper.classList.add("buttons-dark-mode");

    buttons.forEach((item) => {
      item.classList.add("button-dark-mode");
    });
  } else {
    wrapperEl.classList.remove("wrapper-dark-background");
    outputEl.classList.remove("output-dark-background");
    inputArea.classList.remove("textarea-dark-background");
    buttonWrapper.classList.remove("buttons-dark-mode");

    buttons.forEach((item) => {
      item.classList.remove("button-dark-mode");
    });
  }
});
