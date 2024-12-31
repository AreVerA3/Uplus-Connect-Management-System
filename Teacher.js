function showMainDisplay(section, element) {
    const mainDisplay = document.getElementById('main-display');
    let content = '';

    switch (section) {
        case 'studentdata':
            content = `
                <h2>Student Data </h2>
                <p>Student Data Management</p>
                <!-- Add more content as needed -->
            `;
            break;
        case 'learningmaterial':
            content = `
                <h2>Learning Materials</h2>
                <p>Here teacher can update all the learning materials needed</p>
                <!-- Add more content as needed -->
            `;
            break;
        default:
            content = '<p>Select an option from the menu.</p>';
    }

    mainDisplay.innerHTML = content;

    // Remove active class from all menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => item.classList.remove('active'));

    // Add active class to the clicked menu item
    element.classList.add('active');
}