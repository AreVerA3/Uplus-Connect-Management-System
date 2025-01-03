let cartItems = [];

document.addEventListener('DOMContentLoaded', () => {
    const activeSection = document.querySelector('.menu-item.active');
    if (activeSection) {
        const sectionId = activeSection.getAttribute('onclick').match(/'([^']+)'/)[1];
        showContent(sectionId);
    }
});

function showContent(section) {
    const allSections = document.querySelectorAll('.content');
    allSections.forEach(content => content.classList.remove('active'));

    const sectionToShow = document.getElementById(section);
    if (sectionToShow) {
        sectionToShow.classList.add('active');
    }

    const cartButton = document.getElementById('cart-button');
    cartButton.style.display = section === 'subjects' ? 'block' : 'none';
    const cartContent = document.getElementById('cart-content');
    cartContent.style.display = 'none'; // Hide cart when switching sections
}


function handlePackageSelection(packageType) {
    const optionsContainer = document.getElementById('package-options');
    if (!optionsContainer) return;

    optionsContainer.innerHTML = '';

    let content = '';
    if (packageType === 'primary') {
        content = `
            <h3>Select School Type</h3>
            <button class="package-btn" onclick="showPrimarySubjects('SJKC')">SJKC</button>
            <button class="package-btn" onclick="showPrimarySubjects('SK')">SK</button>
        `;
    } else if (packageType === 'secondary') {
        content = `
            <h3>Select Form</h3>
            ${[1, 2, 3, 4, 5].map(form => `<button class="package-btn" onclick="showSecondarySubjects(${form})">Form ${form}</button>`).join('')}
        `;
    }
    optionsContainer.innerHTML = content;
}

function showPrimarySubjects(type) {
    const subjects = type === 'SJKC' ? [
        { name: 'Math', price: 35 },
        { name: 'Chinese Language', price: 35 },
        { name: 'English Language', price: 35 },
        { name: 'Bahasa Melayu 1', price: 35 },
        { name: 'Bahasa Melayu 2', price: 35 },
    ] : [
        { name: 'Math', price: 35 },
        { name: 'English Language', price: 35 },
        { name: 'Bahasa Melayu 1', price: 35 },
        { name: 'Bahasa Melayu 2', price: 35 },
        { name: 'Sains', price: 35 },
    ];

    renderSubjects(subjects, type, 'primary');
}

function showSecondarySubjects(form) {
    const prices = form === 3 || form === 5 ? 100 : 80;
    const subjects = [
        { name: 'English', price: prices },
        { name: 'Sains', price: prices },
        { name: 'Matematik', price: prices },
    ];

    renderSubjects(subjects, `Form ${form}`, 'secondary');
}

function renderSubjects(subjects, type, packageType) {
    const optionsContainer = document.getElementById('package-options');
    if (!optionsContainer) return;

    const totalPrice = subjects.reduce((sum, subject) => sum + subject.price, 0);

    optionsContainer.innerHTML = `
        <h3>Choose Subjects for ${type}</h3>
        <div class="subject-list">
            ${subjects.map(subject => `
                <div class="subject-item" data-subject-name="${subject.name}" data-subject-price="${subject.price}" onclick="toggleSubjectSelection(this)">
                    <span>${subject.name}</span>
                    <span>$${subject.price}</span>
                    <button class="add-cart-btn" onclick="addToCart(event, '${subject.name}', ${subject.price})">Add to Cart</button>
                </div>`).join('')}
        </div>
        <div class="all-subjects-option">
            <button class="package-btn all-subjects-btn" onclick="addAllSubjectsToCart(event, ${JSON.stringify(subjects)})">All Subjects $${totalPrice}</button>
            <button class="package-btn" onclick="handlePackageSelection('${packageType}')">Back</button>
        </div>
    `;
}

function toggleSubjectSelection(item) {
    item.classList.toggle('selected');
}

function addToCart(event, subjectName, subjectPrice) {
    event.stopPropagation();
    cartItems.push({ name: subjectName, price: subjectPrice });
    updateCartDisplay();
    alert(`"${subjectName}" added to cart successfully!`);
}

function addAllSubjectsToCart(event, subjects) {
    event.stopPropagation();
    subjects.forEach(subject => cartItems.push({ name: subject.name, price: subject.price }));
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartContent = document.getElementById('cart-content');
    cartContent.innerHTML = '';

    if (cartItems.length === 0) {
        cartContent.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        let totalPrice = 0;
        cartContent.innerHTML = `<h3>Cart Items</h3><ul>${cartItems.map(item => {
          totalPrice += item.price;
          return `<li>${item.name} ($${item.price})</li>`
        }).join('')}</ul><p>Total: $${totalPrice}</p>`;
    }
}

function viewCart() {
    updateCartDisplay();
    const cartContent = document.getElementById('cart-content');
    if (cartItems.length > 0) {
        cartContent.style.display = 'block';
        const proceedButton = document.createElement('button');
        proceedButton.textContent = 'Proceed to Payment';
        proceedButton.classList.add('cart-button');
        proceedButton.style.position = 'relative';
        proceedButton.style.marginTop = '10px';
        proceedButton.addEventListener('click', () => {
          // Store cart data in localStorage
          localStorage.setItem('cartItems', JSON.stringify(cartItems));
          window.location.href = 'payment.html'; // Redirect to payment page
        });
        cartContent.appendChild(proceedButton);
    } else {
        alert('Your cart is empty.');
    }
}
