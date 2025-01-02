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

// Teacher Management
let teacherData = [];
let editingTeacherIndex = -1;
const teacherForm = document.getElementById('teacher-form');
const teacherTableBody = document.querySelector("#teacher-table tbody");

function addOrEditTeacher() {
    if (!teacherForm.reportValidity()) {
        return;
    }

    const teacher = {
        teacherName: document.getElementById("teacher-name").value,
        subject: document.getElementById("subject").value,
        level: document.getElementById("level").value,
        email: document.getElementById("teacher-email").value,
        phone: document.getElementById("teacher-phone").value,
        qualification: document.getElementById("teacher-qualification").value,
        date: document.getElementById("teacher-date").value,
    };

    if (editingTeacherIndex >= 0) {
        teacherData[editingTeacherIndex] = teacher;
    } else {
        teacherData.push(teacher);
    }

    updateTeacherTable();
    resetForm();
}

function updateTeacherTable() {
    teacherTableBody.innerHTML = "";

    if (teacherData.length === 0) {
        const noDataRow = document.createElement("tr");
        noDataRow.innerHTML = `<td colspan="9">No teacher data available.</td>`;
        teacherTableBody.appendChild(noDataRow);
        return;
    }

    teacherData.forEach((teacher, index) => {
        const row = teacherTableBody.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${teacher.teacherName}</td>
            <td>${teacher.subject}</td>
            <td>${teacher.level}</td>
            <td>${teacher.email}</td>
            <td>${teacher.phone}</td>
            <td>${teacher.qualification}</td>
            <td>${teacher.date}</td>
            <td>
                <button onclick="editTeacher(${index}, event)">Edit</button>
                <button onclick="deleteTeacher(${index}, event)">Delete</button>
            </td>
        `;
    });
}

function editTeacher(index, event) {
    event.stopPropagation();
    const teacher = teacherData[index];

    document.getElementById("teacher-name").value = teacher.teacherName;
    document.getElementById("subject").value = teacher.subject;
    document.getElementById("level").value = teacher.level;
    document.getElementById("teacher-email").value = teacher.email;
    document.getElementById("teacher-phone").value = teacher.phone;
    document.getElementById("teacher-qualification").value = teacher.qualification;
    document.getElementById("teacher-date").value = teacher.date;

    editingTeacherIndex = index;
}

function deleteTeacher(index, event) { // Add event parameter
    event.stopPropagation();
    if (confirm("Are you sure you want to delete this teacher?")) {
        teacherData.splice(index, 1);
        updateTeacherTable();
    }
}

// Student Management
let studentData = [];
let editingStudentIndex = -1;
const studentForm = document.getElementById('student-form');
const studentTableBody = document.querySelector("#student-table tbody");

function addOrEditStudent() {
    if (!studentForm.reportValidity()) {
        return;
    }

    const student = {
        studentName: document.getElementById("student-name").value, // Corrected ID
        identity: document.getElementById("student-ic").value,
        email: document.getElementById("student-email").value,
        subject: document.getElementById("student-subject").value,
        school_level: document.getElementById("school-level").value,
    };

    if (editingStudentIndex >= 0) {
        studentData[editingStudentIndex] = student;
    } else {
        studentData.push(student);
    }

    updateStudentTable();
    resetForm();
}

function updateStudentTable() {
    studentTableBody.innerHTML = "";

    if (studentData.length === 0) {
        const noDataRow = document.createElement("tr");
        noDataRow.innerHTML = `<td colspan="7">No student data available.</td>`;
        studentTableBody.appendChild(noDataRow);
        return;
    }

    studentData.forEach((student, index) => {
        const row = studentTableBody.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.studentName}</td>
            <td>${student.identity}</td>
            <td>${student.email}</td>
            <td>${student.subject}</td>
            <td>${student.school_level}</td>
            <td>
                <button onclick="editStudent(${index}, event)">Edit</button>
                <button onclick="deleteStudent(${index}, event)">Delete</button>
            </td>
        `;
    });
}

function editStudent(index, event) {
    event.stopPropagation();
    const student = studentData[index];

    document.getElementById("student-name").value = student.studentName;
    document.getElementById("student-ic").value = student.identity; // Corrected assignments
    document.getElementById("student-email").value = student.email;
    document.getElementById("student-subject").value = student.subject;
    document.getElementById("school-level").value = student.school_level;

    editingStudentIndex = index;
}

function deleteStudent(index, event) { // Add event parameter
    event.stopPropagation();
    if (confirm("Are you sure you want to delete this student?")) {
        studentData.splice(index, 1);
        updateStudentTable();
    }
}

// Tuition Management
let tuitionData = [];
let editingTuitionIndex = -1;
const tuitionForm = document.getElementById('tuition-form');
const tuitionTableBody = document.querySelector("#tuition-table tbody");

function addOrEditTuition() {
    if (!tuitionForm.reportValidity()) {
        return;
    }

    const tuition = {
        TSubject: document.getElementById("tuition-subject").value,
        TimeSlot: document.getElementById("time-slot").value,
        tTeacher: document.getElementById("tuition-teacher").value,
    };

    if (editingTuitionIndex >= 0) {
        tuitionData[editingTuitionIndex] = tuition;
    } else {
        tuitionData.push(tuition);
    }

    updateTuitionTable();
    resetForm();
}

function updateTuitionTable() {
    tuitionTableBody.innerHTML = "";

    if (tuitionData.length === 0) {
        const noDataRow = document.createElement("tr");
        noDataRow.innerHTML = `<td colspan="5">No Tuition slot data available.</td>`;
        tuitionTableBody.appendChild(noDataRow);
        return;
    }

    tuitionData.forEach((tuition, index) => {
        const row = tuitionTableBody.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${tuition.TSubject}</td>
            <td>${tuition.TimeSlot}</td>
            <td>${tuition.tTeacher}</td>
            <td>
                <button onclick="editTuition(${index}, event)">Edit</button>
                <button onclick="deleteTuition(${index}, event)">Delete</button>
            </td>
        `;
    });
}

function editTuition(index, event) {
    event.stopPropagation();
    const tuition = tuitionData[index];

    document.getElementById("tuition-subject").value = tuition.TSubject;
    document.getElementById("time-slot").value = tuition.TimeSlot;
    document.getElementById("tuition-teacher").value = tuition.tTeacher;

    editingTuitionIndex = index;
}

function deleteTuition(index, event) {
    event.stopPropagation();
    if (confirm("Are you sure you want to delete this tuition slot data?")) {
        tuitionData.splice(index, 1);
        updateTuitionTable();
    }
}//end Tuition Management


function resetForm() {
    tuitionForm.reset();
    teacherForm.reset();
    studentForm.reset(); // Reset student form as well
    editingTeacherIndex = -1;
    editingStudentIndex = -1; // Reset student editing index
    editingTuitionIndex = -1;
}
