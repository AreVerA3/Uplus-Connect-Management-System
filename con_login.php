<?php
include('connection.php'); 

// Get the submitted username and password from the login form
$user = $_POST['username'];
$pass = $_POST['password'];

// Query to check the user in the 'student' table
$sql = "SELECT * FROM students WHERE username = ? AND password = ?";
$stmt = $con->prepare($sql);
$stmt->bind_param("ss", $user, $pass);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // User found in student table, set session and redirect
    $_SESSION['username'] = $user;
    header("Location: Student.html"); // Redirect to student page
    exit();
}

// Query to check the user in the 'teacher' table
$sql = "SELECT * FROM teachers WHERE username = ? AND password = ?";
$stmt = $con->prepare($sql);
$stmt->bind_param("ss", $user, $pass);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // User found in teacher table, set session and redirect
    $_SESSION['username'] = $user;
    header("Location: Teacher.html"); // Redirect to teacher page
    exit();
}

// Query to check the user in the 'admin' table
$sql = "SELECT * FROM admin WHERE username = ? AND password = ?";
$stmt = $con->prepare($sql);
$stmt->bind_param("ss", $user, $pass);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // User found in admin table, set session and redirect
    $_SESSION['username'] = $user;
    header("Location: Admin.html"); // Redirect to admin page
    exit();
}

// If no user found in any table, show error
echo "<script>alert('Invalid username or password.'); window.location.href='login.html';</script>";

// Close the connection
$con->close();
?>
