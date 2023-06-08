<?php
session_start ();
include('../../../database/dbcon.php');
$request = $_SERVER["REQUEST_METHOD"];
if ($request === "POST") {
  $data = json_decode(file_get_contents("php://input"), true);
  $user = $data["email"];
  $pass = $data["password"];
  $adminSelect = "SELECT * FROM `admin` 
  where AdminLogInName = '$user' && AdminPassword = '$pass'";
  $managerSelect = "SELECT * FROM `manager` 
  WHERE ManagerLogInName = '$user' && ManagerPassword = '$pass'";
  $salesSelect = "SELECT * FROM `sales` 
  where SaleEmail = '$user' && SalePassword = '$pass'";

  $result = mysqli_query($con, $adminSelect);
  $admin = mysqli_fetch_assoc($result);

  $result = mysqli_query($con, $managerSelect);
  $manage = mysqli_fetch_assoc($result);

  $result = mysqli_query($con, $salesSelect);
  $sales = mysqli_fetch_assoc($result);

  if(!empty($admin)) {
    echo json_encode(["message" => "admin", "id" => $admin['AdminID']]);
  } elseif(!empty($manage)) {
    echo json_encode(["message" => "manage", "id" => $manage['ManagerID']]);
  } elseif(!empty($sales)) {
    echo json_encode(["message" => "sale", "id" => $sales['SaleID']]);
  } else {
    echo json_encode(["message" => "Tài khoản hoặc mật khẩu không chính xác"]);
  }
}
?>

