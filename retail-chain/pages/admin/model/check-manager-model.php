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
    $managerId = $data["managerId"];
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
    $ManagerName = $data["ManagerName"];
    $ManagerPassword = $data["ManagerPassword"];
    $ManagerLogInName = $data["ManagerLogInName"];
    $ManagerLocation = $data["ManagerLocation"];

    // Thực hiện xử lý hoặc lưu dữ liệu vào cơ sở dữ liệu
    $query = "SELECT * FROM manager";
    $result = mysqli_query($con, $query);
    $row = mysqli_fetch_assoc($result);
    $row_count = mysqli_num_rows($result);
    $managerId = "M" . $row_count;

    while(true) {
        $query = "SELECT * FROM manager WHERE ManagerID = $managerId";
        $row = mysqli_fetch_assoc($result);
        $check = mysqli_num_rows($result);
        if($check) {
            $row_count = $row_count + 1;
            $managerId = "M" . $row_count;
        }else {
            break;
        }
    }

    $query = "INSERT INTO Manager (ManagerID, ManagerName, ManagerPassword, ManagerLogInName, ManagerLocation)
    VALUES ('$managerId','$ManagerName', '$ManagerPassword', '$ManagerLocation')";
    if (mysqli_query($con, $query)) {
    // Trả về phản hồi JSON
    echo json_encode(["message" => "Employee created successfully"]);
    } else {
    echo json_encode(["message" => "error creating employee"]);
    }
}
else {
    $request = $_GET['request'];
    if ($request === 'getManager') {
        $s = "SELECT * FROM `manager`";
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
