<?php
include('../../../database/dbcon.php');

$saleID = $_GET['saleId'];

$query = "SELECT ManagerID FROM Sales WHERE SaleID = '$saleID';";
$result = mysqli_query($con, $query);
$row = mysqli_fetch_assoc($result);
$ManagerID = $row['ManagerID'];

$s = "SELECT p.ProductID, p.ProductName,p.ImageProduct, p.Price, s.ProductQuantity
FROM Products p
JOIN Store s ON p.ProductID = s.ProductID
WHERE s.ManagerID = '$ManagerID';
";

$result = mysqli_query($con, $s);

// Khởi tạo mảng để lưu trữ tất cả các hàng
$data = array();

// Duyệt qua từng hàng và thêm chúng vào mảng $data
while ($row = mysqli_fetch_array($result)) {
    $data[] = $row;
}

// Trả về kết quả bằng cách sử dụng 'echo'
echo json_encode($data);
?>