<?php
session_start();
header('Content-Type: application/json');

if(isset($_POST['timeSpan'])) {

  $url1 = 'http://localhost:8080/customerOrder/getRVOrders';

  $args1 = "userName=" . $_SESSION['userName'] . "&password=" . $_SESSION['password'] . "&timeSpan=" . $_POST['timeSpan'];


  $ch = curl_init();

  curl_setopt($ch, CURLOPT_URL, $url1);
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $args1);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

  $server_output = curl_exec($ch);
  curl_close($ch);


  echo json_encode($server_output);
  die();



}
