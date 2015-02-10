<?php
session_start();

if(isset($_POST['timeSpan'])) {

  $url1 = 'http://localhost:8080/customerOrder/getRVOrders';
  $url2 = 'http://localhost:8080/customerLead/getRVLeads';

  $args1 = "userName=" . $_SESSION['userName'] . "&password=" . $_SESSION['password'] . "&timeSpan=" . $_POST['timeSpan'];


  $ch = curl_init();

  curl_setopt($ch, CURLOPT_URL, $url1);
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $args1);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

  $server_output = curl_exec($ch);
  curl_close($ch);


  //var_dump($server_output);


  $ch2 = curl_init();

  curl_setopt($ch2, CURLOPT_URL, $url2);
  curl_setopt($ch2, CURLOPT_POST, 1);
  curl_setopt($ch2, CURLOPT_POSTFIELDS, $args1);
  curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);

  $server_output2 = curl_exec($ch2);
  curl_close($ch2);


  //var_dump($server_output2);

  $server_output3 = $server_output . $server_output2;
  var_dump(json_encode($server_output3));




}
