<?php
// Database connection details (replace with your actual credentials)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "studentdash_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$bankAccount = $_POST['bankAccount'];
$accountHolder = $_POST['accountHolder'];
$bankName = $_POST['bankName'];

// Handle file upload (replace with your actual file handling logic)
$targetDir = "uploads/"; // Replace with your desired upload directory
$targetFile = $targetDir . basename($_FILES["receipt"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($targetFile,PATHINFO_EXTENSION));

// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["receipt"]["tmp_name"]);
    if($check !== false) {
        echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }
}

// Check if file already exists
if (file_exists($targetFile)) {
    echo "Sorry, file already exists.";
    $uploadOk = 0;
}

// Check file size
if ($_FILES["receipt"]["size"] > 500000) { // 500KB limit
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}

// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["receipt"]["tmp_name"], $targetFile)) {
        echo "The file ". htmlspecialchars( basename( $_FILES["receipt"]["name"])). " has been uploaded.";
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}

// Get form data (assuming you have already handled file upload and stored the receipt path)
$paymentDate = $_POST['payment_date'];
$amount = $_POST['amount'];
$paymentMethod = $_POST['payment_method'];
$bankAccount = $_POST['bankAccount'];
$accountHolder = $_POST['accountHolder'];
$bankName = $_POST['bankName'];
$receiptPath = $targetFile; // Assuming $targetFile holds the uploaded receipt path

// Prepare the SQL statement
$stmt = $conn->prepare("INSERT INTO payment_history (date, amount, payment_method, bank_account, account_holder, bank_name, receipt_path) 
                        VALUES (?, ?, ?, ?, ?, ?, ?)");

// Bind parameters
$stmt->bind_param("ssdssss", $paymentDate, $amount, $paymentMethod, $bankAccount, $accountHolder, $bankName, $receiptPath); 

// Execute the statement
if ($stmt->execute()) {
    echo "New payment record created successfully!";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();

$conn->close();
?>
