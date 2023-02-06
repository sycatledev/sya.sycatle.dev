<?php

try {
  $pdo = new PDO("mysql:host=127.0.0.1;dbname=projectmarket;charset=utf8", "root", "root");
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  $query = isset($_GET['query']) ? $_GET['query'] : "";
  $stmt = $pdo->prepare("SELECT * FROM users WHERE user_name LIKE :query OR user_mail LIKE :query");
  $stmt->execute(['query' => "%$query%"]);
  $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

  header('Content-Type: application/json');
  echo json_encode($users);
} catch (PDOException $e) {
  echo $e->getMessage();
}