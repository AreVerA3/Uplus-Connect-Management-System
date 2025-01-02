<?php
$servername = "127.0.0.1"; 
$username = "root@localhost";    
$password = "";     
$dbname = "student_db";       

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $conn->query("SELECT * FROM payments"); // Select all payments
    $payments = $stmt->fetchAll(PDO::FETCH_ASSOC); // Fetch data as associative array

} catch (PDOException $e) {
    echo "Error fetching payments: " . $e->getMessage(); // Display error message
    exit; // Stop further execution if there's an error
}

$conn = null; // Close the database connection
?>

<!DOCTYPE html>
<html>

<head>
    <title>Payment History</title>
    <style>
        body {
            font-family: sans-serif;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th,
        td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }

        th {
            background-color: #f0f0f0;
            font-weight: bold;
        }
    </style>
</head>

<body>
    <h1>Payment History</h1>

    <?php if (empty($payments)): ?>
        <p>No payment history available.</p>
    <?php else: ?>

        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Account Number</th>
                    <th>Account Holder</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Payment Date</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($payments as $payment): ?>
                    <tr>
                        <td>
                            <?php echo $payment['id']; ?>
                        </td>
                        <td>
                            <?php echo $payment['account_number']; ?>
                        </td>
                        <td>
                            <?php echo $payment['account_holder']; ?>
                        </td>
                        <td>
                            <?php echo $payment['description']; ?>
                        </td>
                        <td>$
                            <?php echo number_format($payment['amount'], 2); ?>
                        </td>
                        <td>
                            <?php echo $payment['payment_date']; ?>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    <?php endif; ?>
</body>

</html>