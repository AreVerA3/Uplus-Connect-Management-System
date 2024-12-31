function showMainDisplay(section, element) {
    const mainDisplay = document.getElementById('main-display');
    let content = '';

    switch (section) {
        case 'subscribedtuition':
            content = `
                <h2>Subscribed Tuition</h2>
                <p>Subscribed tuition by the students</p>
                <!-- Add more content as needed -->
            `;
            break;
        case 'payment':
            content = `
                <h2>Payment</h2>
                <p>Same contain with cart button contain </p>
                <!-- Add more content as needed -->
            `;
            break;
        case 'learningmaterial':
            content = `
                <h2>Learning Materials</h2>
                <p>All learning material needed by student is shown here</p>
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