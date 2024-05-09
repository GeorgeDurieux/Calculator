const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equal]');
const numberButtons = document.querySelectorAll('[data-number]');
const modeButton = document.querySelector('[data-mode-button]');
const previousOperandText = document.querySelector('[data-previous-operand-text]');
const currentOperandText = document.querySelector('[data-current-operand-text]');

let currentOperand = '';
let previousOperand = '';
let currentOperation = '';
let previousOperation = '';

//--FUNCTIONS--//

function assignOperation(operation) {

  if (currentOperand === '' && previousOperand === '') return;

  if (currentOperand === '' && previousOperand !== '') {
    previousOperation = operation;
    updateDisplay();
    return;
  }

  if (previousOperand === '') {
    previousOperand = currentOperand;
    previousOperation = operation;
    currentOperand = '';
    return;
  }    

  performOperation(previousOperation);
  previousOperation = operation;
  currentOperand = '';
}

function assignEqual() {
  if (currentOperand === '' || previousOperation === '') return;
  performOperation(previousOperation);
  previousOperation = '';
  currentOperand = '';
}

function performOperation(operation) {
  switch (operation) {
    case '+':
      previousOperand = parseFloat(previousOperand) + parseFloat(currentOperand);
      break;
    case '-':
      previousOperand = parseFloat(previousOperand) - parseFloat(currentOperand);
      break;
    case '*':
      previousOperand = parseFloat(previousOperand) * parseFloat(currentOperand);
      break;
    case '÷':
      previousOperand = parseFloat(previousOperand) / parseFloat(currentOperand);
      break;      
  }
}

function concatenate(number) {
  if (number === '.' && currentOperand.includes('.')) return;
  currentOperand = currentOperand.toString() + number.toString();
}

function clearAll() {
  currentOperand = '';
  previousOperand = '';
  previousOperation = '';
}

function deleteDigit() {
  currentOperand = currentOperand.split('');
  currentOperand.pop();
  currentOperand = currentOperand.join('');
}

function updateDisplay() {
  currentOperandText.innerText = currentOperand;
  previousOperandText.innerText = `${previousOperand}${previousOperation}`;
}

//--EVENT LISTENERS--//

operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    assignOperation(button.innerText);
    updateDisplay();
  })
})

equalButton.addEventListener('click', () => {
  assignEqual();
  updateDisplay();
})

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    concatenate(button.innerText);
    updateDisplay();
  })
})

allClearButton.addEventListener('click', () => {
  clearAll();
  updateDisplay();
})

deleteButton.addEventListener('click', () => {
  deleteDigit();
  updateDisplay();
})

modeButton.addEventListener('click', () => {
  if (modeButton.innerText === 'LIGHT MODE') {
    document.querySelectorAll('*').forEach(function(element) {
      element.classList.add('dark-mode');
    });
    modeButton.innerText = 'DARK MODE';
  } else {
    document.querySelectorAll('*').forEach(function(element) {
      element.classList.remove('dark-mode');
    });
    modeButton.innerText = 'LIGHT MODE';
  }
})

document.addEventListener('keydown', e => {
  let numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  let operations = ['+', '-', '*', '/'];
  if (numbers.includes(e.key)) {
    concatenate(e.key);
    updateDisplay();
  } else if (operations.includes(e.key)) {
    assignOperation(e.key);
    updateDisplay();
  } else if (e.key === 'Enter') {
    assignEqual();
    updateDisplay();
  } else if (e.key === 'Backspace') {
    deleteDigit();
    updateDisplay();
  } else if (e.key === 'Escape') {
    clearAll();
    updateDisplay();
  }
})

updateDisplay()
