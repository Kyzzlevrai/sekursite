// Function to update the amount
function updateAmount() {
    const amountInput = document.getElementById('amount-input');
    document.getElementById('amount').textContent = amountInput.value;
}

// Function to update the currency
function updateCurrency() {
    const currencyInput = document.getElementById('currency-input');
    document.getElementById('currency').textContent = currencyInput.value;
}

// Function to update the email
function updateEmail() {
    const emailInput = document.getElementById('email-input');
    document.getElementById('email').textContent = emailInput.value;
}

// Function to handle "Send More Money" button click
function sendMoreMoney() {
    alert('Send more money functionality is not implemented.');
}
