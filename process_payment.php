<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$servername = "127.0.0.1"; // Or "localhost"
$username = "root"; // Just "root", not "root@localhost"
$password = "";
$dbname = "student_db";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Validate and sanitize inputs
        $accountNumber = isset($_POST['accountNumber']) ? filter_var(trim($_POST['accountNumber']), FILTER_SANITIZE_STRING) : '';
        $accountHolder = isset($_POST['accountHolder']) ? filter_var(trim($_POST['accountHolder']), FILTER_SANITIZE_STRING) : '';

        // Check if descriptions and amounts are set AND are arrays
        if (isset($_POST['descriptions']) && is_array($_POST['descriptions']) && isset($_POST['amounts']) && is_array($_POST['amounts'])) {
            $descriptions = $_POST['descriptions'];
            $amounts = $_POST['amounts'];

            if (count($descriptions) !== count($amounts)) {
                echo "Error: Number of descriptions and amounts do not match.";
                exit; // Stop execution to prevent errors
            }

            $totalAmount = 0;
            $paymentSuccess = true; // Flag to check if all payments were successful

            for ($i = 0; $i < count($descriptions); $i++) {
                $description = filter_var(trim($descriptions[$i]), FILTER_SANITIZE_STRING); // Sanitize each description
                $amount = filter_var(trim($amounts[$i]), FILTER_VALIDATE_FLOAT); // Validate and sanitize amount

                if ($amount === false) {
                    echo "Error: Invalid amount provided for " . htmlspecialchars($description) . ".";
                    $paymentSuccess = false;
                    break; // stop the loop if there is an error
                }

                $totalAmount += $amount;

                $stmt = $conn->prepare("INSERT INTO payments (account_number, account_holder, description, amount) VALUES (:accountNumber, :accountHolder, :description, :amount)");
                $stmt->bindParam(':accountNumber', $accountNumber);
                $stmt->bindParam(':accountHolder', $accountHolder);
                $stmt->bindParam(':description', $description);
                $stmt->bindParam(':amount', $amount);

                if (!$stmt->execute()) {
                    echo "<pre>Error executing query for " . htmlspecialchars($description) . ":\n";
                    print_r($stmt->errorInfo());
                    echo "</pre>\n";
                    $paymentSuccess = false;
                    break;
                }
            }

            if ($paymentSuccess) {
                echo "Total Payments recorded successfully! Total Amount: $" . number_format($totalAmount, 2);
            } else {
                echo "Payment process failed. See errors above.\n";
            }

        } else {
            echo "Error: No items selected or data mismatch.\n";
        }
    } else {
        echo "No POST request received.";
    }
} catch (PDOException $e) {
    echo "Connection failed or database error: " . htmlspecialchars($e->getMessage());
}

$conn = null;
?>