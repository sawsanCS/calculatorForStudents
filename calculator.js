// we wait for the page to be loaded before executing our js code
document.onload = calculate();

function calculate() {
   //the variable calculator will contain the nodes in the class calculator, it is like getElementByClassName
   // querySelector will select from the html page what is between parethesis : .calculator means element with class calculator
    const calculator = document.querySelector('.calculator');
   // the variable display will contain the display part 
    const display = document.querySelector('.calculator__display');
    //the variable keys will contain all the keys of our calculator: numbers, operators, decimal, AC
    const keys = calculator.querySelector('.calculator__keys')
//our js code will listen to the click on the keys, everytime the clicked element is a button, it does the following
keys.addEventListener("click", e => {
if (e.target.matches("button")) {
    //get the clicked button (e.target means the target of our event e which is the clicking event)
    const key = e.target;
    //dataset.action goes to the corresponding element and look for data-action
    const action = key.dataset.action;
    //textContent returns the texts within this key, if we click 7 it contains "7"
    const keyContent = key.textContent;
    //we get the value of display by display.textContent
    const displayedNum = display.textContent;
    //our calculator has a previousKeyType that returns what is the last key: calculate, operator or number
    let previousKeyType = calculator.dataset.previousKeyType;

    // no action is associated to the button, so it is a number button
    if (!action) {
        //if the display is 0 or the last typed key is an operator or calculating we should start from the beginning
        if (
          displayedNum === '0' ||
          previousKeyType === 'operator' ||
          previousKeyType === 'calculate'
        ) {
          display.textContent = keyContent
          //if the previous key is a number different of zero, the next number will  be added next to it
        } else {
          display.textContent = displayedNum + keyContent
        }
        //after typing a number, we update the previous key to number
        calculator.dataset.previousKeyType = 'number'
      }
    //an action is associated to the button so it is an operation or AC or decimal
      else {
     //if it is an operation 
      if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
      ) { 
        calculator.dataset.previousKeyType = 'operator';
        calculator.dataset.firstValue = displayedNum;
        calculator.dataset.operator = action;
      }
     //if it is a . to add a decimal to a number

      if (action === 'decimal') {
        display.textContent = displayedNum + '.'
      }
      // if it is the clear button, we will clear all values and display 0 on the screen 
      if (action === 'clear') {
        if (key.textContent === 'AC') {
            calculator.dataset.firstValue = ''
            calculator.dataset.modValue = ''
            calculator.dataset.operator = ''
            calculator.dataset.previousKeyType = ''
          } else {
            key.textContent = 'AC'
          }
          
        display.textContent = 0
          calculator.dataset.previousKeyType = 'clear'
      }
      // if the key pressed is calculate, we get the first value that is stored after clicking an operator 
      if (action === 'calculate') {
          //we update the values of firstValue, operator and second value (the displayed value or the last one)
        const firstValue = calculator.dataset.firstValue
        const operator = calculator.dataset.operator
        const secondValue = displayedNum
   
        if (
            firstValue &&
            operator &&
            previousKeyType !== 'operator' &&
            previousKeyType !== 'calculate'
          ) {
            const calcValue = calc(firstValue, operator, secondValue)
            display.textContent = calcValue
            
          // Update calculated value as firstValue
            calculator.dataset.firstValue = calcValue
          } else {
            // If there are no calculations, set displayedNum as the firstValue
            calculator.dataset.firstValue = displayedNum
          }
        
          calculator.dataset.previousKeyType = 'operator'
          calculator.dataset.operator = action
      }
    }
 }

});

}
function calc(n1, op, n2) {
    let result = ''
  
  if (op === 'add') {
    result = parseFloat(n1) + parseFloat(n2)
  } else if (op === 'subtract') {
    result = parseFloat(n1) - parseFloat(n2)
  } else if (op === 'multiply') {
    result = parseFloat(n1) * parseFloat(n2)
  } else if (op === 'divide') {
    result = parseFloat(n1) / parseFloat(n2)
  }
  
  return result

}