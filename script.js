class Calculator {
    constructor() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = null;
        this.updateDisplay();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = null;
        this.updateDisplay();
    }

    delete() {
        if (this.currentOperand === '0') return;
        this.currentOperand = this.currentOperand.slice(0, -1);
        if (this.currentOperand === '' || this.currentOperand === '-') {
            this.currentOperand = '0';
        }
        this.updateDisplay();
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand += number;
        }
        this.updateDisplay();
    }

    chooseOperation(op) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '' && this.operation != null) {
            this.calculate();
        }
        this.operation = op;
        this.previousOperand = this.currentOperand + ' ' + op;
        this.currentOperand = '0';
        this.updateDisplay();
    }

    calculate() {
        let result;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '×':
                result = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    alert('Cannot divide by zero!');
                    this.clear();
                    return;
                }
                result = prev / current;
                break;
            case '%':
                result = prev % current;
                break;
            default:
                return;
        }

        this.currentOperand = this.roundNumber(result).toString();
        this.operation = null;
        this.previousOperand = '';
        this.updateDisplay();
    }

    roundNumber(num) {
        return Math.round(num * 100000000) / 100000000;
    }

    updateDisplay() {
        document.getElementById('current').textContent = this.currentOperand;
        document.getElementById('previous').textContent = this.previousOperand;
    }
}

// Initialize calculator
const calculator = new Calculator();

// Ensure display is updated on load
window.addEventListener('DOMContentLoaded', () => {
    calculator.updateDisplay();
    console.log('Calculator initialized successfully');
});

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') calculator.appendNumber(e.key);
    if (e.key === '.') calculator.appendNumber('.');
    if (e.key === '+') calculator.chooseOperation('+');
    if (e.key === '-') calculator.chooseOperation('-');
    if (e.key === '*') calculator.chooseOperation('×');
    if (e.key === '/') {
        e.preventDefault();
        calculator.chooseOperation('÷');
    }
    if (e.key === '%') calculator.chooseOperation('%');
    if (e.key === 'Enter' || e.key === '=') calculator.calculate();
    if (e.key === 'Escape') calculator.clear();
    if (e.key === 'Backspace') calculator.delete();
});
