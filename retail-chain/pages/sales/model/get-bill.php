<?php
include('../../../database/dbcon.php');
$s = "SELECT * FROM `bill`";
$result = mysqli_query($con, $s);

// Lấy sl bill
$row = mysqli_num_rows($result);

// Trả về kết quả bằng cách sử dụng 'echo'
echo $row;
?>