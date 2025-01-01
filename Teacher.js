// Show and toggle between sections
function showMainDisplay(sectionId, button) {
    const sections = document.querySelectorAll('.main-display > div');
    sections.forEach(section => section.classList.add('hidden'));

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }

    const buttons = document.querySelectorAll('.menu-item');
    buttons.forEach(btn => btn.classList.remove('active'));

    if (button) {
        button.classList.add('active');
    }
}

// Function to post homework announcement
let announcementCounter = 1; // Counter to track the number of announcements

function postAnnouncement() {
    const title = document.getElementById('homework-title').value;
    const deadline = document.getElementById('homework-deadline').value;
    const elaboration = document.getElementById('homework-elaboration').value;
    const table = document.getElementById('announcements-table').querySelector('tbody');

    if (title && deadline && elaboration) {
        const formattedPostDate = new Date().toISOString().split('T')[0].split('-').reverse().join('-'); // Format: dd-mm-yyyy
        const formattedDeadline = deadline.split('-').reverse().join('-'); // Format: dd-mm-yyyy

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${announcementCounter++}</td>
            <td>${title}</td>
            <td>${formattedPostDate}</td>
            <td>${formattedDeadline}</td>
            <td>${elaboration}</td>
        `;

        if (table.children.length === 1 && table.children[0].innerText === 'No announcements yet.') {
            table.innerHTML = ''; // Clear placeholder row
        }

        table.appendChild(row);

        // Clear input fields
        document.getElementById('homework-title').value = '';
        document.getElementById('homework-deadline').value = '';
        document.getElementById('homework-elaboration').value = '';
    } else {
        alert('Please fill in all the fields before posting!');
    }
}

let studentDataCounter = 1;

function uploadStudentData() {
    const studentName = document.getElementById('student-name').value;
    const subject = document.getElementById('subject').value;
    const grade = document.getElementById('grade').value;
    const attendance = document.getElementById('attendance').value;
    const table = document.getElementById('students-table').querySelector('tbody');

    if (studentName && subject && grade && attendance) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${studentDataCounter++}</td>
            <td>${studentName}</td>
            <td>${subject}</td>
            <td>${grade}</td>
            <td>${attendance}</td>
        `;

        if (table.children.length === 1 && table.children[0].innerText === 'No student data uploaded yet.') {
            table.innerHTML = ''; // Clear placeholder row
        }

        table.appendChild(row);

        // Clear input fields
        document.getElementById('student-name').value = '';
        document.getElementById('subject').value = '';
        document.getElementById('grade').value = '';
        document.getElementById('attendance').value = '';
    } else {
        alert('Please fill in all the fields before saving!');
    }
}

function uploadLearningMaterial() {
    const title = document.getElementById('material-title').value;
    const fileInput = document.getElementById('material-file');
    const file = fileInput.files[0];
    const schoolLevel = document.getElementById('material-education').value;
    const subject = document.getElementById('material-subject').value;
    const materialsTable = document.getElementById('materials-table').getElementsByTagName('tbody')[0];
    
    if (title && file && schoolLevel && subject) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const newRow = materialsTable.insertRow();
            newRow.innerHTML = `
                <td>${materialsTable.rows.length}</td>
                <td>${title}</td>
                <td>${schoolLevel.charAt(0).toUpperCase() + schoolLevel.slice(1)}</td>
                <td>${subject.charAt(0).toUpperCase() + subject.slice(1)}</td>
                <td><a href="${e.target.result}" target="_blank">View File</a></td>
            `;
        };
        
        reader.readAsDataURL(file);
        
        // Clear the form
        document.getElementById('material-title').value = '';
        fileInput.value = '';
        document.getElementById('material-education').value = '';
        document.getElementById('material-subject').value = '';
    } else {
        alert('Please fill out all fields and upload a valid file.');
    }
}
