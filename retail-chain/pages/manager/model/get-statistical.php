<?php
include('../../../database/dbcon.php');
$request = $_GET['request'];
    
// Khởi tạo mảng để lưu trữ tất cả các hàng
$data = array();
if($request === 'revenue'){
    $s = "SELECT * FROM `bill`";
    $result = mysqli_query($con, $s);
    
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
    $data = $listedArray;
} elseif( $request === 'chuoi cua hang'){

} elseif( $request === 'expiredProduct'){
  $currentYearMonth = date('Y-m');
  $s = "SELECT * FROM store WHERE DATE_FORMAT(ExpirationDate, '%Y-%m') = '$currentYearMonth'";
  $result = mysqli_query($con, $s);

  while ($row = mysqli_fetch_array($result)) {
      $data[] = $row;
  }
} else if ( $request === 'sellingProduct'){
  $s = "SELECT p.ProductName, b.amount_sum 
  FROM products p 
  JOIN ( 
    SELECT ProductID, SUM(Amount) AS amount_sum 
    FROM bill_detail 
    GROUP BY ProductID 
    ORDER BY amount_sum DESC 
    LIMIT 10 
  ) b ON p.ProductID = b.ProductID";
  $result = mysqli_query($con, $s);

  while ($row = mysqli_fetch_array($result)) {
      $data[] = $row;
  }
} else if ( $request === 'unSellingProduct' ) {
  $s = "SELECT p.ProductName, b.amount_sum 
  FROM products p 
  JOIN ( 
    SELECT ProductID, SUM(Amount) AS amount_sum 
    FROM bill_detail 
    GROUP BY ProductID 
    ORDER BY amount_sum ASC 
    LIMIT 10 
  ) b ON p.ProductID = b.ProductID";
  $result = mysqli_query($con, $s);

  while ($row = mysqli_fetch_array($result)) {
      $data[] = $row;
  }
} else if ( $request === 'goodEmployee' ) {
  $s = "SELECT s.SaleName, SUM(bd.total_price) AS total_price_sum
  FROM sales s
  JOIN bill b ON s.SaleID = b.SaleID
  JOIN bill_detail bd ON b.BillID = bd.BillID
  GROUP BY s.SaleName
  ORDER BY total_price_sum DESC
  LIMIT 10;
  ";
  $result = mysqli_query($con, $s);

  while ($row = mysqli_fetch_array($result)) {
      $data[] = $row;
  }
} else if ( $request === 'goodTime' ) {
  $s = "SELECT CONCAT(HOUR(CreateDate), ' giờ') AS Hour, COUNT(*) AS bill_count
  FROM bill
  GROUP BY HOUR(CreateDate)
  ORDER BY bill_count DESC
  LIMIT 10;
  ";
  $result = mysqli_query($con, $s);

  while ($row = mysqli_fetch_array($result)) {
      $data[] = $row;
  }
}

// Trả về kết quả bằng cách sử dụng 'echo'
echo json_encode($data);
?>