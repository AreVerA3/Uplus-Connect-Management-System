const learningMaterials = [
    { no: 1, title: 'Introduction to Algebra', schoolLevel: 'Secondary', subject: 'Mathematics' },
    { no: 2, title: 'Cell Biology Basics', schoolLevel: 'Secondary', subject: 'Biology', file: 'biology.pdf' },
    // Add more learning materials here
];

function populateLearningMaterialsTable(data) {
    const tableBody = document.querySelector('#materials-table tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    data.forEach(item => {
        const row = tableBody.insertRow();
        const noCell = row.insertCell();
        const titleCell = row.insertCell();
        const levelCell = row.insertCell();
        const subjectCell = row.insertCell();
        const fileCell = row.insertCell();

        noCell.textContent = item.no;
        titleCell.textContent = item.title;
        levelCell.textContent = item.schoolLevel;
        subjectCell.textContent = item.subject;

        if (item.file) {
            const link = document.createElement('a');
            link.href = item.file;
            link.textContent = 'Download';
            fileCell.appendChild(link);
        } else {
            fileCell.textContent = 'N/A';
        }
    });
}

populateLearningMaterialsTable(learningMaterials);
function fetchUnpaidItems() {
    fetch('get_unpaid_items.php') // Make a GET request to the PHP script
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            const tableBody = document.getElementById('unpaid-items-table').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; // Clear the "Loading..." message

            if (data.error) { // Check for errors from the PHP script
                tableBody.innerHTML = `<tr><td colspan="3">${data.error}</td></tr>`;
                return;
            }

            if (data.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="3">No unpaid items.</td></tr>';
            } else {
                data.forEach(item => {
                    const row = tableBody.insertRow();
                    const selectCell = row.insertCell();
                    const descriptionCell = row.insertCell();
                    const amountCell = row.insertCell();

                    selectCell.innerHTML = `<input type="checkbox" name="selected_items[]" value="${item.id}" data-description="${item.description}" data-amount="${item.amount}">`;
                    descriptionCell.textContent = item.description;
                    amountCell.textContent = item.amount;
                });
            }
        })
        .catch(error => {
            console.error('Error fetching unpaid items:', error);
            const tableBody = document.getElementById('unpaid-items-table').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = '<tr><td colspan="3">Error loading unpaid items.</td></tr>';
        });
}

document.addEventListener('DOMContentLoaded', fetchUnpaidItems); // Fetch items when the page loads

function showMainDisplay(displayId, clickedButton) {
    const displays = document.querySelectorAll('.main-display > div');
    const menuItems = document.querySelectorAll('.menu-item');

    displays.forEach(display => display.classList.add('hidden'));
    menuItems.forEach(item => item.classList.remove('active'));

    document.getElementById(displayId).classList.remove('hidden');
    clickedButton.classList.add('active');
}

document.getElementById('paymentForm').addEventListener('submit', function (event) {
    let checkedBoxes = document.querySelectorAll('input[name="selected_items[]"]:checked');
    if (checkedBoxes.length === 0) {
        alert("Please select at least one item to pay");
        event.preventDefault();
        return;
    }

    let descriptions = [];
    let amounts = [];
    checkedBoxes.forEach(box => {
        descriptions.push(box.dataset.description);
        amounts.push(box.dataset.amount);
    });

    descriptions.forEach(description => {
        let input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'descriptions[]';
        input.value = description;
        this.appendChild(input);
    });
    amounts.forEach(amount => {
        let input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'amounts[]';
        input.value = amount;
        this.appendChild(input);
    });
});

const bankTransferRadio = document.getElementById('bankTransferRadio');
const bankInfoPopup = document.getElementById('bankInfoPopup');
const bankInfoClose = document.getElementById('bankInfoClose');

bankTransferRadio.addEventListener('change', () => {
    if (bankTransferRadio.checked) {
        bankInfoPopup.style.display = 'flex';
    }
});

bankInfoClose.addEventListener('click', () => {
    bankInfoPopup.style.display = 'none';
});