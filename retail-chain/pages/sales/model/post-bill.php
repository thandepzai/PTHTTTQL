<?php
// Kết nối tới cơ sở dữ liệu
include('../../../database/dbcon.php');

// Lấy dữ liệu từ yêu cầu POST
$billSend = $_POST['billSend'];
$saleID = $_POST['SaleId'];

$query = "SELECT ManagerID FROM Sales WHERE SaleID = '$saleID';";
$result = mysqli_query($con, $query);
$row = mysqli_fetch_assoc($result);
$ManagerID = $row['ManagerID'];

$valueEnd = '';
foreach ($billSend as $value) {
  $code = "('$value[SaleID]', '$value[ProductID]', '$value[Amount]', '$value[Cost]', '$value[CreateDate]', '$value[BillID]', '$ManagerID')";
  if ($valueEnd === ''){
    $valueEnd = $valueEnd . $code;
  } else {
    $phay = ', ';
    $valueEnd = $valueEnd . $phay . $code;
  }
}

$sql = "INSERT INTO Bill (SaleID, ProductID, Amount, Cost, CreateDate, BillID, ManagerID) VALUES ";
$query = $sql . $valueEnd;
$result = mysqli_query($con, $query);

if ($result) {
  echo "Success";
} else {
  // Trả về thông báo lỗi nếu thất bại
  echo "Error: " . mysqli_error($con);
}

// Đóng kết nối cơ sở dữ liệu
mysqli_close($con);
?>
