function showMainDisplay(section, element) {
    const mainDisplay = document.getElementById('main-display');
    let content = '';

    switch (section) {
        case 'package':
            content = `
                <h2>Tuition Package</h2>
                <p>Manage your tuition packages here.</p>
                <!-- Add more content as needed -->
            `;
            break;
        case 'teacher':
            content = `
                <h2>Teacher Configuration</h2>
                <p>Configure teacher settings here.</p>
                <!-- Add more content as needed -->
            `;
            break;
        case 'student':
            content = `
                <h2>Student Configuration</h2>
                <p>Configure student settings here.</p>
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