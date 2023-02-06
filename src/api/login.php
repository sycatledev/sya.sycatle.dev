<?php header('Content-Type: application/json');
session_start();
$results = array();

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data["identifier"]) && isset($data['password'])) {
    $identifier = $data['identifier'];
    $password = $data['password'];

    try {
        $database = new PDO("mysql:host=127.0.0.1;dbname=projectmarket;charset=utf8", "root", "root");

        $statement = $database->prepare("SELECT `user_id` , `user_name`, `user_password`  FROM `users` WHERE `user_mail` = :identifier OR `user_name` = :identifier");
        $statement->execute(['identifier' => $identifier]);

        $row = $statement->fetch();

        if ($row) {
            if (password_verify($password, $row["user_password"])) {
                $results["status"] = 200;
                $results["message"] = "Successfully authenticated.";
                $results["user"] = [
                    "token" => $row['user_id'],
                    "username" => $row['user_name'],
                ];

                $_SESSION["user_token"] = $row['user_id'];
            } else {
                $results['status'] = 401;
                $results["message"] = "Incorrect password.";
            }
        } else {
            $results['status'] = 401;
            $results["message"] = "Please provide valid credentials.";
        }
    } catch (PDOException $exception) {
        $results["status"] = 401;
        $results['message'] = $exception->getMessage();
    }
} else {
    $results["status"] = 401;
    $results["message"] = "Please provide credentials.";
} ?>
<?= json_encode($results) ?>