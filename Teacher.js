// Function to toggle sections
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
function postAnnouncement() {
    const title = document.getElementById('homework-title').value;
    const deadline = document.getElementById('homework-deadline').value;
    const elaboration = document.getElementById('homework-elaboration').value;

    if (title && deadline && elaboration) {
        const formData = new FormData();
        formData.append('action', 'post_announcement');
        formData.append('title', title);
        formData.append('deadline', deadline);
        formData.append('elaboration', elaboration);

        fetch('announcement.php', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.text())
            .then(data => {
                alert(data); // Show the response message
                // Optionally clear the form fields
                document.getElementById('homework-title').value = '';
                document.getElementById('homework-deadline').value = '';
                document.getElementById('homework-elaboration').value = '';
            })
            .catch(error => {
                console.error('Error:', error);
            });
    } else {
        alert('Please fill in all the fields before posting!');
    }
}

// Function to upload student data
function uploadStudentData() {
    const student_name = document.getElementById('student-name').value;
    const school_level = document.getElementById('school-level').value;
    const subjects = document.getElementById('subject').value;
    const grade = document.getElementById('grade').value;
    const attendance = document.getElementById('attendance').value;

    if (student_name && school_level && subjects && grade && attendance) {
        const formData = new FormData();
        formData.append('action', 'save');
        formData.append('student-name', student_name);
        formData.append('school-level', school_level);
        formData.append('subjects', subjects);
        formData.append('grade', grade);
        formData.append('attendance', attendance);

        fetch('upload_student_data.php', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.text())
            .then(data => {
                alert(data); // Show the response message
                // Optionally clear the form fields
                document.getElementById('student-name').value = '';
                document.getElementById('school-level').value = '';
                document.getElementById('subjects').value = '';
                document.getElementById('grade').value = '';
                document.getElementById('attendance').value = '';
            })
            .catch(error => {
                console.error('Error:', error);
            });
    } else {
        alert('Please fill in all the fields before saving!');
    }
}

// Function to upload learning material
function uploadLearningMaterial() {
    const title = document.getElementById('material-title').value;
    const fileInput = document.getElementById('material-file');
    const file = fileInput.files[0];
    const schoolLevel = document.getElementById('material-education').value;
    const subject = document.getElementById('material-subject').value;

    if (title && file && schoolLevel && subject) {
        const formData = new FormData();
        formData.append('action', 'upload_learning_material');
        formData.append('title', title);
        formData.append('file', file);
        formData.append('school_level', schoolLevel);
        formData.append('subject', subject);

        fetch('teacherlogic.php', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.text())
            .then(data => {
                alert(data); // Show the response message
                // Optionally clear the form fields
                document.getElementById('material-title').value = '';
                fileInput.value = '';
                document.getElementById('material-education').value = '';
                document.getElementById('material-subject').value = '';
            })
            .catch(error => {
                console.error('Error:', error);
            });
    } else {
        alert('Please fill out all fields and upload a valid file.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch announcements
    async function fetchAnnouncements() {
        try {
            const response = await fetch('path-to-your-api-or-server-endpoint');
            if (!response.ok) {
                throw new Error('Network response was not ok' + response.statusText);
            }
            const announcements = await response.json(); // Assuming the response is JSON
            displayAnnouncements(announcements);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }

    // Function to display announcements in the table
    function displayAnnouncements(announcements) {
        const announcementsTableBody = document.querySelector('#announcements-table tbody');
        announcementsTableBody.innerHTML = ''; // Clear existing rows

        if (announcements.length === 0) {
            const noDataRow = document.createElement('tr');
            noDataRow.innerHTML = '<td colspan="5">No announcements yet.</td>';
            announcementsTableBody.appendChild(noDataRow);
        } else {
            announcements.forEach((announcement, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${announcement.title}</td>
                    <td>${announcement.posted_date}</td>
                    <td>${announcement.deadline}</td>
                    <td>${announcement.elaboration}</td>
                `;
                announcementsTableBody.appendChild(row);
            });
        }
    }

    // Call fetchAnnouncements to load data when the page is ready
    fetchAnnouncements();
});
