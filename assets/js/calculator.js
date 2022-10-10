class Stack {
  constructor() {
    this.items = [];
  }
  push(element) {
    return this.items.push(element);
  }

  pop() {
    if (this.items.length > 0) {
      return this.items.pop();
    }
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length == 0;
  }

  size() {
    return this.items.length;
  }

  clear() {
    this.items = [];
  }
}

export function evaluate(exp) {
  let operands = new Stack();
  let operations = new Stack();

  for (let i = 0; i < exp.length; i++) {
    let c = exp.charAt(i);
    if (!isNaN(c)) {
      let num = 0;
      while (!isNaN(c)) {
        num = num * 10 + Number(c);
        i++;
        if (i < exp.length) {
          c = exp.charAt(i);
        } else {
          break;
        }
      }
      i--;
      operands.push(num);
    } else if (c == "(") {
      operations.push(c);
    } else if (c == ")") {
      while (operations.peek() != "(") {
        let output = performOperation(operands, operations);
        operands.push(output);
      }
      operations.pop();
    } else if (isOperator(c)) {
      while (
        !operations.isEmpty() &&
        precedence(c) <= precedence(operations.peek())
      ) {
        let output = performOperation(operands, operations);
        operands.push(output);
      }
      operations.push(c);
    }
  }

  while (!operations.isEmpty()) {
    let output = performOperation(operands, operations);
    operands.push(output);
  }
  return operands.pop();

  function precedence(c) {
    switch (c) {
      case "+":
      case "-":
        return 1;
      case "*":
      case "/":
        return 2;
      case "^":
        return 3;
    }
    return -1;
  }

  function performOperation(operands, operations) {
    let a = operands.pop();
    let b = operands.pop();
    let operation = operations.pop();
    switch (operation) {
      case "+":
        return a + b;
      case "-":
        return b - a;
      case "*":
        return a * b;
      case "/":
        if (a == 0) {
          console.log("Cannot divide by zero");
          return 0;
        }
        return b / a;
    }
    return 0;
  }

  function isOperator(c) {
    return c == "+" || c == "-" || c == "/" || c == "*" || c == "^";
  }
}
