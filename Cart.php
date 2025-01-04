<?php
// Database connection details (replace with your credentials)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "uplusconnect";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (isset($_POST["action"])) {
            $action = $_POST["action"];
            $user_id = 1; // Replace with the actual logged-in user's ID!

            switch ($action) {
                case "addToCart":
                    $subject_name = $_POST["subjectName"];
                    $subject_price = $_POST["subjectPrice"];

                    $stmt = $conn->prepare("INSERT INTO cart_items (user_id, subject_name, subject_price) VALUES (:user_id, :subject_name, :subject_price)");
                    $stmt->bindParam(':user_id', $user_id);
                    $stmt->bindParam(':subject_name', $subject_name);
                    $stmt->bindParam(':subject_price', $subject_price);
                    $stmt->execute();
                    echo "Item added to cart";
                    break;

                case "getCartItems":
                    $stmt = $conn->prepare("SELECT * FROM cart_items WHERE user_id = :user_id");
                    $stmt->bindParam(':user_id', $user_id);
                    $stmt->execute();
                    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    echo json_encode($result); // Send cart items as JSON
                    break;
                case "clearCart":
                    $stmt = $conn->prepare("DELETE FROM cart_items WHERE user_id = :user_id");
                    $stmt->bindParam(':user_id', $user_id);
                    $stmt->execute();
                    echo "Cart cleared";
                    break;
            }
        }
    }
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
$conn = null;
?>