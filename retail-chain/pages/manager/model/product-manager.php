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
    $name = $_POST["name"];
    $price = $_POST["price"];
    $quantity = $_POST["quantity"];
    $expiry = $_POST["expiry"];
    $outputPrice = $_POST["outputPrice"];
    $image = $_FILES["image"];
    $managerId = $_POST["managerID"];
    echo json_encode(["message" => "error"]);
    // // Random ID
    // $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // $charactersLength = strlen($characters);
    // $textRanDom = '';
    
    // for ($i = 0; $i < 3; $i++) {
    //     $randomIndex = rand(0, $charactersLength - 1);
    //     $randomCharacter = $characters[$randomIndex];
    //     $textRanDom .= $randomCharacter;
    // }
    
    // $query = "SELECT COUNT(*) FROM `store`";
    // $result = mysqli_query($con, $query);
    // $row = mysqli_fetch_row($result);
    // $count = $row[0];
    // $productID = $textRanDom . $count;
    
    // while (true) {
    //     $query = "SELECT * FROM `store` WHERE ProductID = '$productID'";
    //     $result = mysqli_query($con, $query);
    //     if (mysqli_num_rows($result) > 0) {
    //         $count = $count + 1;
    //         $productID = $textRanDom . $count;
    //     } else {
    //         break;
    //     }
    // }
    
    // // Lưu vào cơ sở dữ liệu
    // $query1 = "INSERT INTO store (ProductID, ImageProduct, ProductName, ImportPrice, ProductQuantity, ExpirationDate, ManagerID) 
    // VALUES ('$productID', '$image', '$name', '$price', '$quantity', '$expiry', '$managerId')";
    // $result1 = mysqli_query($con, $query1);
    // if ($result1) {
    //     $query2 = "INSERT INTO products (ProductID, ImageProduct, ProductName, Price) 
    //     VALUES ('$productID', '$image', '$name', '$price')";
    //     $result2 = mysqli_query($con, $query2);
    //     if($result2) {
    //         echo json_encode(["message" => "Product added successfully"]);
    //     } else {
    //         echo json_encode(["message" => "error"]);
    //     }
    // } else {
    //     echo json_encode(["message" => "error"]);
    // }      
}
else {
    $request = $_GET['request'];
    if ($request === 'getProducts') {
        $s = "SELECT p.ProductID, p.Price as OutputPrice, s.ProductName, s.ImportPrice, s.ProductQuantity, s.ExpirationDate FROM products p INNER JOIN store s ON p.ProductID = s.ProductID;";
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
