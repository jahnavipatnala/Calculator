document.addEventListener("DOMContentLoaded", function() {
  // Get DOM elements
  const output = document.querySelector(".calculator__output");
  const keys = document.querySelector(".calculator__keys");

  // Store the current calculation and result
  let currentInput = "0"; // Initialize with "0"
  let currentResult = null;
  let operator = null;

  // Add click event listener to the keys
  keys.addEventListener("click", handleKeyClick);

  // Add keyboard event listener to the document
  document.addEventListener("keydown", handleKeyPress);

  function handleKeyClick(event) {
    const key = event.target;
    const keyValue = key.textContent;

    if (key.classList.contains("calculator__key")) {
      if (!isNaN(keyValue) || keyValue === ".") {
        // Handle numbers and decimal point
        if (currentInput === "0") {
          currentInput = keyValue;
        } else {
          currentInput += keyValue;
        }
        updateOutput();
      } else if (keyValue === "AC") {
        // Clear the input and output
        currentInput = "0"; // Reset to "0"
        currentResult = null;
        operator = null;
        updateOutput();
      } else if (keyValue === "=") {
        // Calculate the result
        calculateResult();
      } else if (keyValue === "⌫") {
        // Handle backspace (⌫) and prevent clearing "0"
        if (currentInput !== "0") {
          currentInput = currentInput.slice(0, -1);
        }
        if (currentInput === "") {
          currentInput = "0"; // Ensure there's always a number
        }
        updateOutput();
      } else {
        // Handle operators (+, -) and fix multiplication and division
        if (currentResult !== null) {
          // If there's a result from a previous calculation, use it as the first operand
          currentInput = currentResult.toString();
          currentResult = null;
        }
        if (keyValue === "×") {
          // Convert the "×" symbol to "*"
          operator = "*";
        } else if (keyValue === "÷") {
          // Convert the "÷" symbol to "/"
          operator = "/";
        } else {
          operator = keyValue;
        }
        currentInput += operator;
        updateOutput();
      }
    }
  }

  function handleKeyPress(event) {
    const keyValue = event.key;

    if (!isNaN(keyValue) || keyValue === ".") {
      // Handle numbers and decimal point
      if (currentInput === "0") {
        currentInput = keyValue;
      } else {
        currentInput += keyValue;
      }
      updateOutput();
    } else if (keyValue === "AC") {
      // Clear the input and output
      currentInput = "0"; // Reset to "0"
      currentResult = null;
      operator = null;
      updateOutput();
    } else if (keyValue === "=" || keyValue === "Enter") {
      // Calculate the result
      calculateResult();
    } else if (keyValue === "Backspace") {
      // Handle backspace (Backspace key) and prevent clearing "0"
      if (currentInput !== "0") {
        currentInput = currentInput.slice(0, -1);
      }
      if (currentInput === "") {
        currentInput = "0"; // Ensure there's always a number
      }
      updateOutput();
    } else if (["+", "-", "*", "/"].includes(keyValue)) {
      // Handle operators (+, -, *, /)
      if (currentResult !== null) {
        // If there's a result from a previous calculation, use it as the first operand
        currentInput = currentResult.toString();
        currentResult = null;
      }
      operator = keyValue;
      currentInput += operator;
      updateOutput();
    }
  }

  // Function to update the output display
  function updateOutput() {
    output.textContent = currentInput;
  }

  // Function to calculate and display the result
  function calculateResult() {
    if (currentInput) {
      // Replace "×" with "*" and "÷" with "/"
      const expression = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
      try {
        currentResult = eval(expression);
        currentInput = currentResult.toString();
        updateOutput();
      } catch (error) {
        // Handle errors (e.g., division by zero)
        currentResult = "Error";
        currentInput = "Error";
        updateOutput();
      }
    }
  }
});
