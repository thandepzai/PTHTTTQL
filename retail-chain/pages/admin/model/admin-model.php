<?php
include('../../../database/dbcon.php');
$request = $_GET['request'];
    
// Khởi tạo mảng để lưu trữ tất cả các hàng
$data = array();
if ($request === 'getbill') {
    // Lấy tổng tiền ngày hôm nay
    $todayQuery = "SELECT SUM(Cost) AS TotalCost FROM Bill WHERE DATE(CreateDate) = CURDATE()";
    $todayResult = mysqli_query($con, $todayQuery);
    $todayRow = mysqli_fetch_assoc($todayResult);
    $totalCostToday = $todayRow['TotalCost'];

    // Lấy tổng tiền ngày hôm qua
    $yesterdayQuery = "SELECT SUM(Cost) AS TotalCost FROM Bill WHERE DATE(CreateDate) = CURDATE() - INTERVAL 1 DAY";
    $yesterdayResult = mysqli_query($con, $yesterdayQuery);
    $yesterdayRow = mysqli_fetch_assoc($yesterdayResult);
    $totalCostYesterday = $yesterdayRow['TotalCost'];

    // Tính phần trăm tăng trưởng
    $percentageChange = 0;
    if ($totalCostYesterday > 0) {
        $percentageChange = (($totalCostToday - $totalCostYesterday) / $totalCostYesterday) * 100;
    }

    // Kiểm tra phần trăm tăng trưởng và tạo thông báo tương ứng
    $changeMessage = '';
    if ($percentageChange > 0) {
        $changeMessage = 'Tăng';
    } elseif ($percentageChange < 0) {
        $changeMessage = 'Giảm';
    }

    // Tạo mảng JSON chứa kết quả
    $response = [
        "totalCostToday" => $totalCostToday,
        "percentageChange" => $percentageChange,
        "changeMessage" => $changeMessage
    ];

    // Trả về kết quả dưới dạng JSON
    echo json_encode($response);
}

if ($request === 'getamount') {
    // Lấy số lượng hóa đơn trong ngày
    $billCountQuery = "SELECT COUNT(DISTINCT BillID) AS TotalBillCount FROM Bill WHERE DATE(CreateDate) = CURDATE()";
    $billCountResult = mysqli_query($con, $billCountQuery);
    $billCountRow = mysqli_fetch_assoc($billCountResult);
    $totalBillCount = $billCountRow['TotalBillCount'];

    // Tạo mảng JSON chứa kết quả
    $response = [
        "totalBillCount" => $totalBillCount
    ];

    // Trả về kết quả dưới dạng JSON
    echo json_encode($response);
}

if ($_GET['request'] === 'getrevenue2') {
    $query = "SELECT ManagerLocation, ManagerName, SUM(B.Cost) AS TotalRevenue
              FROM Manager M
              LEFT JOIN Store S ON M.ManagerID = S.ManagerID
              LEFT JOIN Bill B ON S.ProductID = B.ProductID AND S.ManagerID = B.ManagerID
              WHERE MONTH(B.CreateDate) = MONTH(CURRENT_DATE())
              GROUP BY M.ManagerID";
    
    $result = mysqli_query($con, $query);
    
    // Chuyển đổi kết quả thành mảng JSON
    $data = [];
    while ($row = mysqli_fetch_assoc($result)) {
      $data[] = $row;
    }
    
    // Trả về dữ liệu dưới dạng JSON
    echo json_encode($data);
}

if ($_GET['request'] === 'getmanagerlocations') {
    $query = "SELECT ManagerID, ManagerLocation FROM Manager";

    $result = mysqli_query($con, $query);

    // Convert the result to a JSON array
    $data = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }

    // Return the data as JSON
    header('Content-Type: application/json');
    echo json_encode($data);
}

if ($_GET['request'] === 'getrevenue') {
    $managerID = $_GET['managerID'];

    // Query to get the total revenue and month for the corresponding ManagerID
    $query = "SELECT MONTH(CreateDate) AS Month, SUM(Cost) AS TotalRevenue
              FROM Bill
              WHERE ManagerID = '$managerID'
              GROUP BY MONTH(CreateDate)";

    // Perform the query and fetch the results
    $result = mysqli_query($con, $query);

    $data = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }

    // Return the results as JSON
    echo json_encode($data);
}

if ($_GET['request'] === 'getrevenue1') {
    $managerID = $_GET['managerID'];

    // Query to get the total revenue and month for the current year
    $queryCurrentYear = "SELECT MONTH(CreateDate) AS Month, SUM(Cost) AS TotalRevenue
                         FROM Bill
                         WHERE YEAR(CreateDate) = YEAR(CURDATE()) AND ManagerID = '$managerID'
                         GROUP BY MONTH(CreateDate)";

    // Query to get the total revenue and month for the previous year
    $queryPreviousYear = "SELECT MONTH(CreateDate) AS Month, SUM(Cost) AS TotalRevenue
                          FROM Bill
                          WHERE YEAR(CreateDate) = YEAR(CURDATE()) - 1 AND ManagerID = '$managerID'
                          GROUP BY MONTH(CreateDate)";

    // Perform the query and fetch the results for the current year
    $resultCurrentYear = mysqli_query($con, $queryCurrentYear);
    $dataCurrentYear = array();
    while ($row = mysqli_fetch_assoc($resultCurrentYear)) {
        $dataCurrentYear[] = $row;
    }

    // Perform the query and fetch the results for the previous year
    $resultPreviousYear = mysqli_query($con, $queryPreviousYear);
    $dataPreviousYear = array();
    while ($row = mysqli_fetch_assoc($resultPreviousYear)) {
        $dataPreviousYear[] = $row;
    }

    // Combine the results for the current and previous year
    $response = [
        "currentYear" => $dataCurrentYear,
        "previousYear" => $dataPreviousYear
    ];

    // Return the results as JSON
    echo json_encode($response);
}
?>

