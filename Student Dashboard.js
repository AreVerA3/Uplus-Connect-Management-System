 const unpaidItems = [
  { monthFee: "October Fee 2024", desc: "Form 4: CHEM, PHY, AM", duePayment: "December 2024", amount: 330.00 },
  { monthFee: "November Fee 2024", desc: "Form 4: CHEM, PHY, AM", duePayment: "December 2024", amount: 330.00 },
  { monthFee: "December Fee 2024", desc: "Form 4: CHEM, PHY, AM", duePayment: "December 2024", amount: 330.00 },
  { monthFee: "January Fee 2025", desc: "Form 5: CHEM, PHY, AM Misc: 3 subject = +RM 180.00", duePayment: "March 2025", amount: 510.00 },
  { monthFee: "February Fee 2025", desc: "Form 5: CHEM, PHY, AM", duePayment: "December 2024", amount: 330.00 }
];

const paymentTableBody = document.querySelector('#paymentTable tbody');
const totalAmountElement = document.getElementById('totalAmount');
const payButton = document.getElementById('payButton');
let totalAmount = 0;

unpaidItems.forEach((item, index) => {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td><input type="checkbox" data-index="${index}" class="itemCheckbox"></td>
    <td>${item.monthFee}</td>
    <td>${item.desc}</td>
    <td>${item.duePayment}</td>
    <td>RM ${item.amount.toFixed(2)}</td>
  `;
  paymentTableBody.appendChild(row);
});

document.querySelectorAll('.itemCheckbox').forEach(checkbox => {
  checkbox.addEventListener('change', updateTotal);
});

function updateTotal() {
  totalAmount = 0;
  document.querySelectorAll('.itemCheckbox:checked').forEach(checkbox => {
    const index = checkbox.getAttribute('data-index');
    totalAmount += unpaidItems[index].amount;
  });
  totalAmountElement.textContent = `RM ${totalAmount.toFixed(2)}`;
  payButton.disabled = totalAmount === 0;
}

document.getElementById('paymentForm').addEventListener('submit', function(event) {
  event.preventDefault();
  alert('Payment processed successfully!');
  const bankAccount = document.getElementById('bankAccount').value;
  const accountHolder = document.getElementById('accountHolder').value;
  const bankName = document.getElementById('bankName').value;
  const receiptUpload = document.getElementById('receiptUpload').files[0];

  const paymentData = {
    name: accountHolder,
    bankAccount: bankAccount,
    bankName: bankName,
    receipt: receiptUpload.name, 
    amount: totalAmount
  };

  const paymentHistoryTable = document.getElementById('payment_history').querySelector('tbody');

  fetch('payment_history.php')
  .then(response => response.json())
  .then(data => {
    if (data.length > 0) {
      paymentHistoryTable.innerHTML = '';
      data.forEach(payment => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${payment.date}</td>
          <td>RM ${payment.amount}</td>
          <td>${payment.payment_method}</td>
        `;
        paymentHistoryTable.appendChild(row);
      });
    } else {
      const noHistoryRow = document.createElement('tr');
      noHistoryRow.innerHTML = '<td colspan="3">No payment history found.</td>';
      paymentHistoryTable.appendChild(noHistoryRow);
    }
  })
  .catch(error => {
    console.error('Error fetching payment history:', error);
  });

  console.log('Payment Data:', paymentData);
  document.getElementById('paymentForm').reset();
  totalAmount = 0;
  totalAmountElement.textContent = 'RM 0.00';
  payButton.disabled = true;
  document.querySelectorAll('.itemCheckbox').forEach(checkbox => checkbox.checked = false);
});