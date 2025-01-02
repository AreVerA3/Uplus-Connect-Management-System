// Function to show the selected content and set active button
function showContent(contentId) {
    // Hide all content
    const contents = document.querySelectorAll('.content');
    contents.forEach(content => content.classList.remove('active'));

    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.menu-item');
    buttons.forEach(button => button.classList.remove('active'));

    // Show selected content and highlight the button
    document.getElementById(contentId).classList.add('active');
    const button = Array.from(buttons).find(btn => btn.textContent.includes(contentId.replace('-', ' ')));
    if (button) button.classList.add('active');
}

// Function to handle package selection (Primary and Secondary)
function handlePackageSelection(packageType) {
    const menu = document.getElementById(packageType);
    menu.classList.toggle('active');
}

// Function to handle subject selection and adding to cart
function handleSubjectSelection(subjectElement) {
    subjectElement.classList.toggle('selected-subject');
}

// Function to add selected subjects to cart
function addToCart() {
    alert("Subjects added to cart!");
}
