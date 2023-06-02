<?php
session_start();
if (isset($_POST['id'])) {
  $_SESSION['id'] = $_POST['id'];
  echo 'Session started with ID: ' . $_SESSION['id'];
} else {
  echo 'ID not found in POST data.';
}
?>