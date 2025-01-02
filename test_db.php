<?php
header('Content-Type: application/json');

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

    // Connection and query successful
    $response = [
        'status' => 'success',
        'message' => 'Connection successful.',
        'data' => $unpaidItems
    ];
    echo json_encode($response);

} catch (PDOException $e) {
    // Set HTTP status code to 500 (Internal Server Error)
    http_response_code(500);
    // Return an error message as JSON
    echo json_encode(['status' => 'error', 'message' => 'An error occurred while fetching data.']);
    error_log($e->getMessage());
}

// Close the connection
$conn = null;
?>