<?php
include('../../../database/dbcon.php');

$request = $_SERVER["REQUEST_METHOD"];
if ($request === 'PUT') {
    // Lấy dữ liệu từ yêu cầu PUT
    $data = json_decode(file_get_contents("php://input"), true);
    $request = $data['request'];
    $oldPassword = $data['oldPassword'];
    $newPassword = $data["newPassword"];
    if($request === 'changePasswordManager') {
        $managerId = $data['managerId'];
        $query = "SELECT * FROM `manager` WHERE ManagerID = '$managerId';";
        $result = mysqli_query($con, $query);
        $row = mysqli_fetch_array($result);
        if($row['ManagerPassword'] == $oldPassword){
            $query = "UPDATE manager SET ManagerPassword ='$newPassword' WHERE ManagerID = '$managerId'";
            if (mysqli_query($con, $query)) {
                // Trả về phản hồi JSON
                echo json_encode(["message" => "Successfully"]);
            } else {
                echo json_encode(["message" => "error"]);
            }
        } else {
            echo json_encode(["message" => "Wrong Password"]);
        }
    } else {
        $saleId = $data['saleId'];
        $query = "SELECT * FROM `sales` WHERE SaleID = '$saleId';";
        $result = mysqli_query($con, $query);
        $row = mysqli_fetch_array($result);
        if($row['SalePassword'] == $oldPassword){
            $query = "UPDATE sales SET SalePassword ='$newPassword' WHERE SaleID = '$saleId'";
            if (mysqli_query($con, $query)) {
                // Trả về phản hồi JSON
                echo json_encode(["message" => "Successfully"]);
            } else {
                echo json_encode(["message" => "error"]);
            }
        } else {
            echo json_encode(["message" => "Wrong Password"]);
        }
    }
}
?>
