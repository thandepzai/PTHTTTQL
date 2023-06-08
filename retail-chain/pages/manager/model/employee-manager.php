<?php
include('../../../database/dbcon.php');

$request = $_SERVER["REQUEST_METHOD"];
if ($request === "DELETE") {
    // Lấy dữ liệu từ yêu cầu DELETE
    $data = json_decode(file_get_contents("php://input"), true);
    $saleID = $data['saleID'];
    // Thực hiện xử lý hoặc xóa dữ liệu
    $query = "DELETE FROM sales
    WHERE saleID = '$saleID';
    ";
    if (mysqli_query($con, $query)) {
    // Trả về phản hồi JSON
    echo json_encode(["message" => "Employee delete successfully"]);
    } else {
    echo json_encode(["message" => "error"]);
    }
} elseif ($request === 'PUT') {
    // Lấy dữ liệu từ yêu cầu PUT
    $data = json_decode(file_get_contents("php://input"), true);
    $saleID = $data['saleID'];
    $name = $data["name"];
    $email = $data["email"];
    $phone = $data["phone"];
    $salary = $data["salary"];
    $hour = $data["hour"];
    $password = $data["password"];
    $managerId = 'M01';
    // Thực hiện xử lý hoặc cập nhật dữ liệu
    $query = "UPDATE sales
    SET SaleName = '$name', SalePassword = '$password', SalePhoneNo = '$phone', SaleEmail = '$email', HourlyWage = '$salary', HoursWorked = '$hour'
    WHERE saleID = '$saleID'
    ";
    if (mysqli_query($con, $query)) {
    // Trả về phản hồi JSON
    echo json_encode(["message" => "Employee edit successfully"]);
    } else {
    echo json_encode(["message" => "error"]);
    }
} elseif ($request === "POST") {
    // Lấy dữ liệu từ yêu cầu POST
    $data = json_decode(file_get_contents("php://input"), true);
    $name = $data["name"];
    $email = $data["email"];
    $phone = $data["phone"];
    $salary = $data["salary"];
    $hour = $data["hour"];
    $password = $data["password"];
    $managerId = 'M01';
    // Thực hiện xử lý hoặc lưu dữ liệu vào cơ sở dữ liệu
    $query = "SELECT saleID FROM sales WHERE saleID = (SELECT MAX(saleID) FROM sales)";
    $result = mysqli_query($con, $query);
    $row = mysqli_fetch_assoc($result);
    $total = $row['saleID'] + 1;
    $query = "INSERT INTO sales (SaleID, SaleName, SalePassword, SalePhoneNo, SaleEmail, ManagerID, HourlyWage, HoursWorked) 
    VALUES ('$total','$name', '$password', '$phone', '$email', 'M01', '$salary', '$hour')";
    if (mysqli_query($con, $query)) {
    // Trả về phản hồi JSON
    echo json_encode(["message" => "Employee created successfully"]);
    } else {
    echo json_encode(["message" => "error creating employee"]);
    }
}
else {
    $request = $_GET['request'];
    if ($request === 'getEmployees') {
        $s = "SELECT * FROM sales WHERE ManagerID = 'M01';";
        $result = mysqli_query($con, $s);

        // Duyệt qua từng hàng và thêm chúng vào mảng $data
        $data = [];
        while ($row = mysqli_fetch_array($result)) {
            $data[] = $row;
        }
        echo json_encode($data);
    }
}
?>
