<?php
include('../../../database/dbcon.php');

$request = $_SERVER["REQUEST_METHOD"];
if ($request === "DELETE") {
    // Lấy dữ liệu từ yêu cầu DELETE
    $data = json_decode(file_get_contents("php://input"), true);
    $ManagerID = $data['ManagerID'];
    // Thực hiện xử lý hoặc xóa dữ liệu
    $query = "DELETE FROM manager
    WHERE ManagerID = '$ManagerID';
    ";
    if (mysqli_query($con, $query)) {
    // Trả về phản hồi JSON
    echo json_encode(["message" => "Manager delete successfully"]);
    } else {
    echo json_encode(["message" => "error"]);
    }
} elseif ($request === 'PUT') {
    // Lấy dữ liệu từ yêu cầu POST
    $data = json_decode(file_get_contents("php://input"), true);
    $ManagerName = $data["ManagerName"];
    $ManagerPassword = $data["ManagerPassword"];
    $ManagerLogInName = $data["ManagerLogInName"];
    $ManagerLocation = $data["ManagerLocation"];
    $ManagerID = $data["ManagerID"];
    // Thực hiện xử lý hoặc cập nhật dữ liệu
    $query = "UPDATE manager
    SET ManagerName = '$ManagerName', ManagerPassword = '$ManagerPassword', ManagerLogInName = '$ManagerLogInName', ManagerLocation = '$ManagerLocation'
    WHERE ManagerID = '$ManagerID'
    ";
    if (mysqli_query($con, $query)) {
    // Trả về phản hồi JSON
    echo json_encode(["message" => "manager edit successfully"]);
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
    $textRanDom = "M";
    $query = "SELECT COUNT(*) FROM `manager`";
    $result = mysqli_query($con, $query);
    $row = mysqli_fetch_row($result);
    $count = $row[0] + 1;
    $managerID = $textRanDom . $count;
    
    while (true) {
        $query = "SELECT * FROM `manager` WHERE ManagerID = '$managerID'";
        $result = mysqli_query($con, $query);
        if (mysqli_num_rows($result) > 0) {
            $count = $count + 1;
            $managerID = $textRanDom . $count;
        } else {
            break;
        }
    }    

    $query = "INSERT INTO manager (ManagerID, ManagerName, ManagerPassword, ManagerLogInName, ManagerLocation) 
    VALUES ('$managerID', '$ManagerName', '$ManagerPassword', '$ManagerLogInName', '$ManagerLocation')";

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
