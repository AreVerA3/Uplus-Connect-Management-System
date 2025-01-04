
document.addEventListener('DOMContentLoaded', () => {
    getCartItems();
});

function getCartItems() {
    fetch('your_server_script.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'action=getCartItems'
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.length > 0) {
            const cartTableBody = document.querySelector(".cart-summary table tbody");
            const cartTotalElement = document.getElementById("cart-total");
            const amountInput = document.getElementById("amount");
            let totalAmount = 0;

            if (cartTableBody && cartTotalElement && amountInput) {
                cartTableBody.innerHTML = "";
                data.forEach(item => {
                    const row = cartTableBody.insertRow();
                    const nameCell = row.insertCell();
                    const priceCell = row.insertCell();
                    nameCell.textContent = item.subject_name;
                    priceCell.textContent = item.subject_price.toFixed(2);
                    totalAmount += parseFloat(item.subject_price);
                });
                cartTotalElement.textContent = `RM${totalAmount.toFixed(2)}`;
                amountInput.value = totalAmount.toFixed(2);
            }
        }
    });
}


    const submitButton = document.getElementById('submit-button');
    if (submitButton) {
        submitButton.addEventListener('click', function () {
            const bank = document.getElementById('bank-dropdown').value;
            const accountNumber = document.getElementById('account-number').value;
            const recipientBank = document.getElementById('recipient-bank').value;
            const recipientAccount = document.getElementById('recipient-account').value;
            const amount = document.getElementById('amount').value;
            const cartTotal = document.getElementById('cart-total').innerText.replace("RM","");

            if (parseFloat(amount) !== parseFloat(cartTotal)) {
                alert('The amount must match the cart total.');
                return;
            }

            const paymentData = {
                bank: bank,
                accountNumber: accountNumber,
                recipientBank: recipientBank,
                recipientAccount: recipientAccount,
                amount: amount,
                cartItems: cartItems
            };

            console.log('Payment Data:', paymentData);
            alert('Payment details submitted successfully!');
            localStorage.removeItem('cartItems'); // Clear cart after successful payment
            window.location.href = "Main Private.html"; // Redirect after payment
        });
    } else {
        console.error("Submit button not found on payment page.");
    };