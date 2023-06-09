<?php
include('../../../database/dbcon.php');
$request = $_GET['request'];
    
// Khởi tạo mảng để lưu trữ tất cả các hàng
$data = array();
if($request === 'revenue'){
    $managerID = $_GET['managerID'];
    $s = "SELECT * FROM `bill` WHERE `ManagerID` = '$managerID'";
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
} elseif( $request === 'expiredProduct'){
  $managerID = $_GET['managerID'];
  $currentYearMonth = date('Y-m');
  $s = "SELECT * FROM store WHERE DATE_FORMAT(ExpirationDate, '%Y-%m') = '$currentYearMonth' AND `ManagerID` = '$managerID'";
  $result = mysqli_query($con, $s);

  while ($row = mysqli_fetch_array($result)) {
      $data[] = $row;
  }
} else if ( $request === 'sellingProduct'){
  $managerID = $_GET['managerID'];
  $s = "SELECT P.ProductName, SUM(B.Amount) AS TotalSold
  FROM Bill AS B
  JOIN Products AS P ON B.ProductID = P.ProductID
  WHERE B.ManagerID = '$managerID' AND YEAR(B.CreateDate) = YEAR(CURRENT_DATE) AND MONTH(B.CreateDate) = MONTH(CURRENT_DATE)
  GROUP BY P.ProductID
  ORDER BY TotalSold DESC
  LIMIT 10;";
  $result = mysqli_query($con, $s);

  while ($row = mysqli_fetch_array($result)) {
      $data[] = $row;
  }
} else if ( $request === 'unSellingProduct' ) {
  $managerID = $_GET['managerID'];
  $s = "SELECT P.ProductName, SUM(B.Amount) AS TotalSold
  FROM Bill AS B
  JOIN Products AS P ON B.ProductID = P.ProductID
  WHERE B.ManagerID = '$managerID' AND YEAR(B.CreateDate) = YEAR(CURRENT_DATE) AND MONTH(B.CreateDate) = MONTH(CURRENT_DATE)
  GROUP BY P.ProductID
  ORDER BY TotalSold ASC
  LIMIT 10;";
  $result = mysqli_query($con, $s);

  while ($row = mysqli_fetch_array($result)) {
      $data[] = $row;
  }
} else if ( $request === 'goodEmployee' ) {
  $managerID = $_GET['managerID'];
  $s = "SELECT S.SaleID, S.SaleName, SUM(B.Cost) AS TotalRevenue
  FROM Bill AS B
  JOIN Sales AS S ON B.SaleID = S.SaleID
  WHERE B.ManagerID = '$managerID' AND YEAR(B.CreateDate) = YEAR(CURRENT_DATE) AND MONTH(B.CreateDate) = MONTH(CURRENT_DATE)
  GROUP BY S.SaleID, S.SaleName
  ORDER BY TotalRevenue DESC
  LIMIT 5;
  
  ";
  $result = mysqli_query($con, $s);

  while ($row = mysqli_fetch_array($result)) {
      $data[] = $row;
  }
} else if ( $request === 'goodTime' ) {
  $managerID = $_GET['managerID'];
  $s = "SELECT HOUR(CreateDate) AS Hour, COUNT(*) AS TotalBills
  FROM Bill
  WHERE ManagerID = '$managerID' AND YEAR(CreateDate) = YEAR(CURRENT_DATE) AND MONTH(CreateDate) = MONTH(CURRENT_DATE)
  GROUP BY HOUR(CreateDate)
  ORDER BY TotalBills DESC
  LIMIT 10;
  ";
  $result = mysqli_query($con, $s);

  while ($row = mysqli_fetch_array($result)) {
      $data[] = $row;
  }
} else if ( $request === 'billList') {
  $managerID = $_GET['managerID'];
  $s = "SELECT BillID, SUM(Cost) AS TotalCost FROM Bill WHERE DATE(CreateDate) = CURDATE() AND `ManagerID` = '$managerID' GROUP BY BillID;";
  $result = mysqli_query($con, $s);

  while ($row = mysqli_fetch_array($result)) {
      $data[] = $row;
  }
} else if ( $request === 'totalCount' ) {
  $managerID = $_GET['managerID'];
  $s = "SELECT SUM(Cost) AS TotalRevenue
  FROM Bill
  WHERE ManagerID = '$managerID' AND DATE(CreateDate) = CURDATE();
  ";
  $result = mysqli_query($con, $s);

  while ($row = mysqli_fetch_array($result)) {
      $data[] = $row;
  }
}

// Trả về kết quả bằng cách sử dụng 'echo'
echo json_encode($data);
?>