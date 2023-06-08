<?php
include('../../../database/dbcon.php');

$request = $_SERVER["REQUEST_METHOD"];
if ($request === "DELETE") {
    // Lấy dữ liệu từ yêu cầu DELETE
    $data = json_decode(file_get_contents("php://input"), true);

    $productID = $data['ProductID'];
    $managerID = $data['ManagerID'];

    $query1 = "DELETE FROM store WHERE ProductID = '$productID' AND ManagerID = '$managerID'";
    $result1 = mysqli_query($con, $query1);
    
    if ($result1) {
        echo json_encode(["message" => "Successfully uploaded"]);
    } else {
        echo json_encode(["message" => $query1]);
    }       
}
 elseif ($request === "POST") {
    $image = $_FILES['image'];
    $name = $_POST['name'];
    $price = $_POST['price'];
    $quantity = $_POST['quantity'];
    $expiry = $_POST['expiry'];
    $outputPrice = $_POST['outputPrice'];
    $managerId = $_POST['managerId'];

    // // Random ID
    $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $textRanDom = '';
    
    for ($i = 0; $i < 3; $i++) {
        $randomIndex = rand(0, $charactersLength - 1);
        $randomCharacter = $characters[$randomIndex];
        $textRanDom .= $randomCharacter;
    }
    
    $query = "SELECT COUNT(*) FROM `store`";
    $result = mysqli_query($con, $query);
    $row = mysqli_fetch_row($result);
    $count = $row[0];
    $productID = $textRanDom . $count;
    
    while (true) {
        $query = "SELECT * FROM `store` WHERE ProductID = '$productID'";
        $result = mysqli_query($con, $query);
        if (mysqli_num_rows($result) > 0) {
            $count = $count + 1;
            $productID = $textRanDom . $count;
        } else {
            break;
        }
    }
    $type = '.jpg';
    $nameImage = $productID . $type;

    mysqli_autocommit($con, false); // Tắt chế độ tự động commit

    $query1 = "INSERT INTO products (ProductID, ImageProduct, ProductName, Price) 
               VALUES ('$productID', '$nameImage', '$name', '$price')";
    $result1 = mysqli_query($con, $query1);
    
    if ($result1) {
        $query2 = "INSERT INTO store (ProductID, ProductName, ImportPrice, ProductQuantity, ExpirationDate, ManagerID) 
                   VALUES ('$productID', '$name', '$price', '$quantity', '$expiry', '$managerId')";
        $result2 = mysqli_query($con, $query2);
    
        if ($result2) {
            mysqli_commit($con); // Commit transaction nếu cả hai câu lệnh INSERT đều thành công
            mysqli_autocommit($con, true); // Bật chế độ tự động commit trở lại

            $targetDir = '../../../assets/image/';
            $targetFile = $targetDir . $productID . $type;
            if (move_uploaded_file($image['tmp_name'], $targetFile)) {
                echo json_encode(["message" => "Successfully uploaded"]);
            } else {
                echo json_encode(["message" => "error1"]);
            }
        } else {
            mysqli_rollback($con); // Rollback transaction nếu có lỗi trong câu lệnh INSERT thứ hai
            mysqli_autocommit($con, true); // Bật chế độ tự động commit trở lại
            echo json_encode(["message" => "error2"]);
        }
    } else {
        mysqli_rollback($con); // Rollback transaction nếu có lỗi trong câu lệnh INSERT đầu tiên
        mysqli_autocommit($con, true); // Bật chế độ tự động commit trở lại
        echo json_encode(["message" => "error1"]);
    }       
}
else {
    $request = $_GET['request'];
    if ($request === 'getProducts') {
        $managerID = $_GET['managerID'];
        $s = "SELECT p.ProductID, p.Price as OutputPrice, p.ImageProduct, s.ProductName, s.ImportPrice, s.ProductQuantity, s.ExpirationDate FROM products p INNER JOIN store s ON p.ProductID = s.ProductID  WHERE s.managerID = '$managerID';";
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
