<?php
// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Include database connection file (ensure you have a file with these details)
    include('uplusconnect.php');

    // Sanitize and retrieve form input values
    $student_name = mysqli_real_escape_string($conn, $_POST['student_name']);
    $school_level = mysqli_real_escape_string($conn, $_POST['school_level']);
    $student_subject = mysqli_real_escape_string($conn, $_POST['subjects']);
    $grade = mysqli_real_escape_string($conn, $_POST['grade']);
    $attendance = mysqli_real_escape_string($conn, $_POST['attendance']);

    // SQL query to insert data into the student_data table
    $sql = "INSERT INTO student_data (student_name, school_level, student_subject, grade, attendance)
            VALUES ('$student_name', '$school_level', '$student_subject', '$grade', '$attendance')";

    // Execute the query and check for errors
    if (mysqli_query($conn, $sql)) {
        echo "Data uploaded successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }

    // Close the database connection
    mysqli_close($conn);
} else {
    echo "Invalid request method.";
}
?>
