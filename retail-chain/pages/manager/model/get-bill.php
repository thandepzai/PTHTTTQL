<?php
include('../../../database/dbcon.php');
$s = "SELECT * FROM `bill`";
$result = mysqli_query($con, $s);

// Khởi tạo mảng để lưu trữ tất cả các hàng
$data = array();

// Duyệt qua từng hàng và thêm chúng vào mảng $data
while ($row = mysqli_fetch_array($result)) {
    $data[] = $row;
}
// Liệt kê doanh thu
$currentMonth = date("n");
$currentYear = date("Y");
$listedArray = array_fill(0, $currentMonth, 0);

foreach ($data as $value) {
    if (substr($value['CreateDate'], 0, 4) === $currentYear) {
        $monthData = substr($value['CreateDate'], 5, 7);
        $listedArray[intval($monthData) - 1] = $listedArray[intval($monthData) - 1] + $value['Cost'];
    }
}
// Trả về kết quả bằng cách sử dụng 'echo'
echo json_encode($listedArray);
?>