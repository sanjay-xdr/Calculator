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
  displayElement(userInput);
 
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
const displayElement=(data)=>{
  if (data) {
    let answer = evaluate(data);
      if (answer) {
         history.push({ query: data, result: answer });
         localStorage.setItem("Userhistory", JSON.stringify(history));
         historyEl.innerHTML = userInput;
         inputArea.value = answer;
    } else {
          alert("Please Check your Input");
          inputArea.value = "";
    }
  }else{
    alert("Please Enter Value")
  }


}