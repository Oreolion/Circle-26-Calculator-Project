const body = document.querySelector("body");
const btn = document.querySelector(".btn");
const btnIcon = document.querySelector(".btn_icon");
const equalButton = document.getElementById("equal");
const numberButtons = document.querySelectorAll(".btn-number");

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const dateElement = document.getElementById("date");
//display the current year
dateElement.textContent = currentYear.toString();

// Get a reference to the calculator display
const display = document.getElementById("display");
let currentInput = ""; // Store the current user input
let currentOperator = ""; // Store the current operator (+, -, *, /)
let firstOperand = ""; // Store the first operand in a calculation

btn.addEventListener("click", () => {
  // DARK & LIGHT TOGGLE BUTTON
  body.classList.toggle("darkmode");

  if (body.classList.contains("darkmode")) {
    btnIcon.classList.remove("fa-sun");
    btnIcon.classList.add("fa-moon");
  } else {
    btnIcon.classList.remove("fa-moon");
    btnIcon.classList.add("fa-sun");
  }
});

numberButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // Set the clicked number as the current input
    if (currentInput === "0" || currentInput === "") {
      currentInput = button.innerText;
    } else {
      currentInput += button.innerText;
    }
    updateDisplay();
  });
});

const operatorButtons = document.querySelectorAll(".btn-operator1");
operatorButtons.forEach((button) => {
  button.addEventListener("click", function () {
    if (currentOperator !== "" && currentInput == "") {
      //if the second operand has not been assigned then the user is allowed to change the operator
      currentOperator = button.innerText;
      updateDisplay();
      return;
    }

    if (firstOperand === "") {
      // If there's no first operand, set the current input as the first operand if the current is not an empty string
      firstOperand = currentInput !== "" ? currentInput : "0";
      currentInput = "";
      currentOperator = button.innerText;
      updateDisplay();
      return;
    }

    // Calculate the result of the previous operation
    const result = calculate(
      parseFloat(firstOperand),
      parseFloat(currentInput),
      currentOperator
    );

    firstOperand = result.toString(); // Update first input with the result
    currentOperator = button.innerText;
    currentInput = "";
    updateDisplay(); // Update the display
  });
});

equalButton.addEventListener("click", function () {
  if (currentInput !== "" && firstOperand !== "") {
    // Perform the final calculation and update the display
    const result = calculate(
      parseFloat(firstOperand),
      parseFloat(currentInput),
      currentOperator
    );
    currentInput = result.toString();
    firstOperand = ""; // Clear the first operand
    currentOperator = ""; // Clear the current operator
    updateDisplay(); // Update the display
  }
});

// Function to perform calculations
function calculate(num1, num2, operator) {
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "×":
      return num1 * num2;
    case "÷":
      if (num2 === 0) {
        alert("Division by zero is not allowed.");
        clearAll(); // Clear all values on division by zero
        return "0";
      }
      return num1 / num2;
    default:
      return num2; // Return the second operand if no operator is set
  }
}

// Add click event listener to clear button
const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", function () {
  clearAll(); // Clear all values
  updateDisplay(); // Update the display
});

// Function to clear all values
function clearAll() {
  currentInput = "";
  firstOperand = "";
  currentOperator = "";
}

// Add click event listener to delete button
const deleteButton = document.getElementById("delete");
deleteButton.addEventListener("click", function () {
  if (currentInput !== "") {
    // Remove the last character from the current input
    currentInput = currentInput.slice(0, -1);
    updateDisplay(); // Update the display
  }
});

// Function to update the display and show the operator
function updateDisplay() {
  if (currentOperator === "") {
    display.innerText = currentInput || "0";
  } else {
    display.innerText =
      firstOperand + " " + currentOperator + " " + currentInput;
  }
}
