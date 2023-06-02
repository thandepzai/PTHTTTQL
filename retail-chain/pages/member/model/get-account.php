<?php
include('../../../database/dbcon.php');
$s = "SELECT * FROM `sales`";
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

