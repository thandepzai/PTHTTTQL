<?php
session_start();
if (isset($_SESSION['id'])) { 
  include('../../database/dbcon.php');
  $saleId = $_SESSION['id']; 
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <link
      rel="apple-touch-icon"
      sizes="76x76"
      href="../../assets/img/apple-icon.png"
    />
    <link rel="icon" type="image/png" href="../../assets/img/favicon.png" />
    <title>Soft UI Dashboard by Creative Tim</title>
    <!--     Fonts and icons     -->
    <link
      href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.4/font/bootstrap-icons.css"
    />
    <!-- Shopping Card -->
    <link href="../../assets/css/shopping-card.css" rel="stylesheet" />
    <!-- Nucleo Icons -->
    <link href="../../assets/css/nucleo-icons.css" rel="stylesheet" />
    <link href="../../assets/css/nucleo-svg.css" rel="stylesheet" />
    <!-- Font Awesome Icons -->
    <script
      src="https://kit.fontawesome.com/42d5adcbca.js"
      crossorigin="anonymous"
    ></script>
    <link href="../../assets/css/nucleo-svg.css" rel="stylesheet" />
    <!-- CSS Files -->
    <link
      id="pagestyle"
      href="../../assets/css/soft-ui-dashboard.css?v=1.0.3"
      rel="stylesheet"
    />
    <!-- Script -->
  </head>
  <body class="g-sidenav-show bg-gray-100">
    <div class="card min-vh-100 bg-gradient-secondary container-fluid py-4">
      <div class="row">
        <div class="col-12 col-xl-9 h-80">
          <div class="card" style="height: 92vh;">
            <div class="card-header pt-3 pl-4 pb-2 border-bottom-2">
              <h4 class="text-black font-weight-bolder">Thanh toán</h4>
            </div>
            <hr class="dark mt-0 mb-0">
            <div class="h-75 px-0 pt-0 pb-2">
              <div class="row m-4 mb-0">
                <div class="col-12 col-xl-4 text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-8">Name</div>
                <div class="col-12 col-xl-2 text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-8 ps-2">Quantity</div>
                <div class="col-12 col-xl-2 text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-8">Price</div>
                <div class="col-12 col-xl-2 text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-8">Total</div>
                <div class="col-12 col-xl-2 text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-8">Delete</div>
              </div>
              <div class="card-body h-100 pt-0 shopping-card m-1" id="listProduct"> 
              </div>
            </div>
            <div class="find">
              <div class="px-0 pt-0 max-h-100 pb-2 find-container">
                <div class="row m-4 mb-0">
                  <div class="col-12 col-xl-6 text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-8">Name</div>
                  <div class="col-12 col-xl-4 text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-8">Price</div>
                  <div class="col-12 col-xl-2 text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-8 ps-2">The remaining amount</div>
                </div>
                <div class="card-body h-100 pt-0 shopping-card m-1" id="listProductChose">
                </div>
              </div>
              <div class="row m-3 mb-0 mt-6">
                <div class="col-10">
                  <input type="text" class="form-control" placeholder="Nhập để tìm kiếm..." aria-label="Name" aria-describedby="email-addon" id="find-item">
                </div>
                <div class="col-2">
                  <button type="button" class="btn bg-gradient-dark w-100">Tìm kiếm</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-xl-3">
          <div class="card h-50">
            <div class="card-header pt-3 pl-4 pb-2 border-bottom-2">
              <h4 class="text-black font-weight-bolder">Sumary</h4>
            </div>
            <hr class=" dark mt-0 mb-0">
            <div class="row m-3">
              <div class="col-6">
                <div class="w-100 text-left">
                  <h5 class="font-weight-bolder text-secondary mb-0 w-100">Total number</h5>
                </div>
              </div>
              <div class="col-6">
                <div class="w-100 text-left d-flex justify-content-end">
                  <h6 class="text-secondary mb-0" id="total-number"></h6>
                </div>
              </div>
            </div>
            <div class="row m-3">
              <div class="col-6">
                <div class="w-100 text-left">
                  <h5 class="font-weight-bolder text-secondary mb-0 w-100">Total money</h5>
                </div>
              </div>
              <div class="col-6">
                <div class="w-100 text-left d-flex justify-content-end">
                  <h6 class="text-secondary mb-0" id="total-money"></h6>
                </div>
              </div>
            </div>
            <div class="w-50 m-auto">
              <button type="button" class="btn bg-gradient-dark w-100 p-3" onclick="handlePay(<?php echo $saleId?>)">Thanh toán</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--   Core JS Files   -->
    <script src="../../assets/js/core/popper.min.js"></script>
    <script src="../../assets/js/core/bootstrap.min.js"></script>
    <script src="../../assets/js/plugins/perfect-scrollbar.min.js"></script>
    <script src="../../assets/js/plugins/smooth-scrollbar.min.js"></script>
    <script>
      var win = navigator.platform.indexOf("Win") > -1;
      if (win && document.querySelector("#sidenav-scrollbar")) {
        var options = {
          damping: "0.5",
        };
        Scrollbar.init(document.querySelector("#sidenav-scrollbar"), options);
      }
    </script>
    <!-- Github buttons -->
    <script async defer src="https://buttons.github.io/buttons.js"></script>
    <!-- Control Center for Soft Dashboard: parallax effects, scripts for the example pages etc -->
    <script src="../../assets/js/soft-ui-dashboard.min.js?v=1.0.3"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="shopping-card.js"></script>
  </body>
</html>
<?php
}else{
  header("Location: ../member/login.php");
  exit();
}
?>