<?php
// Database connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "studentdash_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(array("error" => "Connection failed: " . $conn->connect_error)));
}

// Fetch payment history from database
$sql = "SELECT * FROM payment_history ORDER BY date DESC";
$result = $conn->query($sql);

// Check if any payment history exists
if ($result->num_rows > 0) {
    // Output payment history as JSON
    $payment_history = array();
    while($row = $result->fetch_assoc()) {
        $payment_history[] = $row;
    }
    header('Content-Type: application/json');
    echo json_encode($payment_history);
} else {
    // Output an empty array for no history
    header('Content-Type: application/json');
    echo json_encode(array());
}

// Close connection
$conn->close();
?>
