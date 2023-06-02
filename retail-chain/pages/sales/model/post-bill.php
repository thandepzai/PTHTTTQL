<?php
// Kết nối tới cơ sở dữ liệu
include('../../../database/dbcon.php');

// Lấy dữ liệu từ yêu cầu POST
$bill = $_POST['bill'];
$billDetail = $_POST['billDetail'];

// Thực hiện truy vấn để chèn dữ liệu vào cơ sở dữ liệu
// Trong ví dụ này, mình sẽ sử dụng câu lệnh INSERT để chèn dữ liệu vào bảng tương ứng.
// Bạn có thể tùy chỉnh câu lệnh SQL phù hợp với cấu trúc cơ sở dữ liệu của mình.
$sql = "INSERT INTO `bill` (`SaleID`, `Cost`, `CreateDate`, `BillID`, `ManagerID`) VALUES ('$bill[SaleID]', '$bill[Cost]', '$bill[CreateDate]', '$bill[BillID]', '$bill[ManagerID]')";
$result = mysqli_query($con, $sql);

if ($result) {
  // Lấy ID của hóa đơn vừa được chèn vào cơ sở dữ liệu
  $billID = mysqli_insert_id($con);

  // Thêm các chi tiết hóa đơn vào bảng tương ứng
  foreach ($billDetail as $item) {
    $productID = $item['ProductID'];
    $amount = $item['Amount'];
    $totalPrice = $item['total_price'];

    $sql = "INSERT INTO `bill_detail` (`ProductID`, `BillID`, `Amount`, `total_price`) VALUES ('$productID', '$billID', '$amount', '$totalPrice')";
    mysqli_query($con, $sql);
  }

  // Trả về kết quả thành công
  echo "Success";
} else {
  // Trả về thông báo lỗi nếu thất bại
  echo "Error: " . mysqli_error($con);
}

// Đóng kết nối cơ sở dữ liệu
mysqli_close($con);
?>
