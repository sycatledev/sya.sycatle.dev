<?php session_start(); 

if (isset($_SESSION['user_token'])) { 
    require("./src/server/views/pages/chat.php");
} else {
    require("./src/server/views/pages/login.php");
}