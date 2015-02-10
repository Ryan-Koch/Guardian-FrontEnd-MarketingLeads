<?php
session_start();
header('Content-Type: application/json');

if(isset($_POST['timeSpan'])) {

  $url2 = 'http://localhost:8080/customerLead/getRVLeads';

  $args1 = "userName=" . $_SESSION['userName'] . "&password=" . $_SESSION['password'] . "&timeSpan=" . $_POST['timeSpan'];

  $ch2 = curl_init();

  curl_setopt($ch2, CURLOPT_URL, $url2);
  curl_setopt($ch2, CURLOPT_POST, 1);
  curl_setopt($ch2, CURLOPT_POSTFIELDS, $args1);
  curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);

  $server_output = curl_exec($ch2);
  curl_close($ch2);

  echo json_encode($server_output);
  die();




}
