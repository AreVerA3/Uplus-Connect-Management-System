<?php
include("uplusconnect.php");

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
        $action = $_POST['action'];

        if ($action === 'post_announcement') {
            $title = trim($_POST['title']);
            $deadline = trim($_POST['deadline']);
            $elaboration = trim($_POST['elaboration']);
            $postedDate = date('Y-m-d');

            $sql = "INSERT INTO announcements (title, posted_date, deadline, elaboration) VALUES (?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ssss", $title, $postedDate, $deadline, $elaboration);

            if ($stmt->execute()) {
                $response = ["status" => "success", "message" => "Announcement posted successfully!"];
            } else {
                throw new Exception("Error posting announcement: " . $stmt->error);
            }
            $stmt->close();
        }else {
            throw new Exception("Invalid action specified.");
        }
    } else {
        throw new Exception("Invalid request method or missing action.");
    }
} catch (Exception $e) {
    $response = ["status" => "error", "message" => $e->getMessage()];
}

header('Content-Type: application/json');
echo json_encode($response);
$conn->close();