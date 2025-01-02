<?php
header('Content-Type: application/json'); // Important: Set the correct content type

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "test_db";

try {
    // Create a new PDO instance
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Prepare and execute the query
    $stmt = $conn->query("SELECT id, description, amount FROM unpaid_items");
    $unpaidItems = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return the unpaid items as JSON
    echo json_encode($unpaidItems);
} catch (PDOException $e) {
    // Set HTTP status code to 500 (Internal Server Error)
    http_response_code(500);
    // Return a generic error message as JSON
    echo json_encode(['error' => 'An error occurred while fetching data.']);
    // Optionally log the actual error message for debugging (not shown to the user)
    error_log($e->getMessage());
}

// Close the connection
$conn = null;
?>