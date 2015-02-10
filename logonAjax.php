<?php
session_start();

header('Content-Type: application/json');

if(isset($_POST['userName']) && isset($_POST['password'])) {

  $url = 'http://localhost:8080/user/login';

  $args = "userName=" . $_POST['userName'] . "&password=" . $_POST['password'];


  $ch = curl_init();

  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $args);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

  $server_output = curl_exec($ch);
  curl_close($ch);

  $decoded = json_decode($server_output, true);

  if($decoded['Status'] == "Success") {
    $_SESSION['userName'] = $_POST['userName'];
    $_SESSION['password'] = $_POST['password'];
  }

  echo json_encode($server_output);
  die();

}
