<?php
// Database connection details
include('connection.php'); 

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $username = $_POST['username'];
    $telephone = $_POST['telephone'];
    $email = $_POST['email'];
    $gender = $_POST['gender'];
    $birthday = $_POST['birthday'];
    $ic = $_POST['IC'];
    $age = $_POST['age'];
    $school_name = $_POST['school-name'];
    $school_type = $_POST['school-type'];
    $school_grade = $_POST['school-grade'];
    $password = $_POST['password'];
    $house_no = $_POST['house-no'];
    $street = $_POST['street'];
    $city = $_POST['city'];
    $state = $_POST['state'];
    $country = $_POST['country'];

    // Prepare and bind the SQL statement
    $sql = "INSERT INTO students (username, telephone, email, gender, birthday, ic_number, age, school_name, school_type, school_grade, password, house_no, street, city, state, country)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $con->prepare($sql);
    $stmt->bind_param("ssssssisssssssss", $username, $telephone, $email, $gender, $birthday, $ic, $age, $school_name, $school_type, $school_grade, $password, $house_no, $street, $city, $state, $country);

    // Execute the statement
    if ($stmt->execute()) {
        echo "<script>alert('Student information saved successfully.'); window.location.href='Login.html';</script>";
    } else {
        echo "<script>alert('Error: " . $stmt->error . "');</script>";
    }

    // Close the statement and connection
    $stmt->close();
}

$con->close();
?>
