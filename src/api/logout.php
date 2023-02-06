<?php header('Content-Type: application/json');
session_start();
$results = array();

try {
    unset($_SESSION['user_token']);
    $results['status'] = 200;
    $results["message"] = "Successfuly disconnected.";
} catch (Exception $exception) {
    $results['status'] = 401;
    $results["message"] = "Error while disconnecting: " . $exception->getMessage();
}
?>
<?= json_encode($results) ?>