let display = document.getElementById("display");
let memoryValue = 0;

// Append numbers
function appendNumber(number) {
    if (display.value === "0") {
        display.value = number;
    } else {
        display.value += number;
    }
}

// Append operations
function appendOperation(operator) {
    let lastChar = display.value[display.value.length - 1];
    if ("+-*/%".includes(lastChar)) {
        display.value = display.value.slice(0, -1) + operator;
    } else {
        display.value += operator;
    }
}

// Clear display
function clearDisplay() {
    display.value = "0";
}

// Delete last character
function deleteLast() {
    display.value = display.value.slice(0, -1) || "0";
}

// Calculate result & store history
function calculate() {
    try {
        let expression = display.value;
        let result = eval(expression);
        display.value = result;

        saveHistory(expression, result);
    } catch (e) {
        display.value = "Error";
    }
}

// Square root
function calculateSquareRoot() {
    let value = parseFloat(display.value);
    if (value >= 0) {
        display.value = Math.sqrt(value);
    } else {
        display.value = "Error";
    }
}

// Toggle sign
function toggleSign() {
    display.value = display.value * -1;
}

// Memory functions
function memoryClear() {
    memoryValue = 0;
}

function memoryRecall() {
    display.value = memoryValue;
}

function memoryAdd() {
    memoryValue += parseFloat(display.value) || 0;
}

function memorySubtract() {
    memoryValue -= parseFloat(display.value) || 0;
}

// Save history
function saveHistory(expression, result) {
    let history = JSON.parse(localStorage.getItem("history")) || [];
    history.push({ date: new Date().toISOString(), expression, result });

    // Keep only last 2 days
    let twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    history = history.filter(entry => new Date(entry.date) > twoDaysAgo);

    localStorage.setItem("history", JSON.stringify(history));
}

// Show history
function showHistory() {
    let history = JSON.parse(localStorage.getItem("history")) || [];
    let list = document.getElementById("historyList");
    list.innerHTML = history.map(entry => `<li>${entry.expression} = ${entry.result}</li>`).join("");
    document.getElementById("historyModal").style.display = "block";
}

// Close history modal
function closeHistory() {
    document.getElementById("historyModal").style.display = "none";
}

// Function to Handle Keypress Events
document.addEventListener('keydown', function(event) {
    const key = event.key;

    if (!isNaN(key) || key === '.') {
        appendNumber(key); // Numbers & Decimal
    } else if (['+', '-', '*', '/', '%',].includes(key)) {
        appendOperation(key); // Operators
    } else if (key === 'Enter') {
        calculate(); // Enter = Equals
    } else if (key === 'Backspace') {
        deleteLast(); // Backspace = Delete Last
    } else if (key === 'Escape') {
        clearDisplay(); // Escape = Clear
    }
});
