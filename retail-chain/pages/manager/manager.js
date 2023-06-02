// data variable
var listedArray = [];
// Call database
// Khởi tạo đối tượng XMLHttpRequest
var xhr = new XMLHttpRequest();

// Xác định phương thức và URL để gửi yêu cầu GET
xhr.open("GET", "./model/get-bill.php");

// Đăng ký hàm xử lý sự kiện cho khi yêu cầu hoàn thành
xhr.onload = function () {
  if (this.status === 200) {
    // Xử lý dữ liệu nhận được từ phía máy chủ
    listedArray = JSON.parse(this.responseText);
  }
};
// Gửi yêu cầu GET đến máy chủ
xhr.send();

// VARIABLE
const allStatistics = [
  {
    name: "Doanh thu cửa hàng",
    function: "handleRevenue()",
    selection: {
      name: "Chọn cửa hàng",
      option: ["cửa hàng 1", "cửa hàng 2"],
    },
  },
  {
    name: "Doanh thu chuỗi cửa hàng",
    function: "revenue",
  },
  {
    name: "Sản phẩm sắp hết hạn",
    function: "revenue",
  },
  {
    name: "Sản phẩm bán chạy",
    function: "revenue",
  },
  {
    name: "Sản phẩm bán chậm",
    function: "revenue",
  },
  {
    name: "Khách hàng mua nhiều nhất",
    function: "revenue",
  },
  {
    name: "Nhân viên bán nhiều nhất",
    function: "revenue",
  },
  {
    name: "Giờ bán nhiều nhất",
    function: "revenue",
  },
  {
    name: "So sánh doanh thu cửa hàng",
    function: "revenue",
  },
];

// Render views
var onChooseStatistics = 0;
function renderStatistics(i, index) {
  return `
    <div class="col-xl-4 col-sm-6 mb-xl-4 mb-4">
      <button class="card button-manager w-100 ${
        index === onChooseStatistics ? "button-choose" : ""
      }" onClick="${i.function}">
        <div class="card-body p-3 w-100">
            <div class="numbers text-center">
              <h5 class="font-weight-bolder mb-0">
                ${i.name}
              </h5>
            </div>
        </div>
      </button>
    </div>
    `;
}
function renderStatisticsSelect(i) {
  return `
  <div class="col-xl-4 col-sm-6 mb-xl-4 mb-4">
    <select class="form-select form-select-lg" aria-label=".form-select-lg example" disable>
      <option disabled selected>${i.selection.name}</option>
      ${i.selection.option.map((item, index) => {
        return `<option value="${index}">${item}</option>`;
      })}
    </select>
  </div>
  `;
}
function renderStoreRevenueTable() {
  return `
  <div class="col-12">
    <div class="card mb-4">
      <div class="card-body px-0 pt-0 pb-2">
        <div class="table-responsive p-0">
          <table class="table align-items-center mb-0">
            <thead>
              <tr>
                <th class="text-uppercase text-secondary text-xl font-weight-bolder opacity-7 w-50 text-center">Tháng</th>
                <th class="text-uppercase text-secondary text-xl font-weight-bolder opacity-7 ps-2 text-center">Tổng doanh thu</th>
              </tr>
            </thead>
            <tbody>
              ${listedArray.map((item, index) => {
                return `
                <tr>
                  <td>
                    <p class="text-xl font-weight-bold mb-0 text-center">Tháng ${index+1}</p>
                  </td>
                  <td class="align-middle text-center text-sm">
                    <p class="text-xl font-weight-bold mb-0 text-center">${item} VNĐ</p>
                  </td>
                </tr>
                `
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  `;
}
function CharView() {
  var ctx = document.getElementById("chart-bars").getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      datasets: [{
        label: "Sales",
        tension: 0.4,
        borderWidth: 0,
        borderRadius: 10,
        borderSkipped: false,
        backgroundColor: "#fff",
        data: listedArray,
        maxBarThickness: 40
      }, ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        }
      },
      interaction: {
        intersect: false,
        mode: 'index',
      },
      scales: {
        y: {
          grid: {
            drawBorder: false,
            display: false,
            drawOnChartArea: false,
            drawTicks: false,
          },
          ticks: {
            suggestedMin: 0,
            suggestedMax: 500,
            beginAtZero: true,
            padding: 15,
            font: {
              size: 14,
              family: "Open Sans",
              style: 'normal',
              lineHeight: 2
            },
            color: "#fff"
          },
        },
        x: {
          grid: {
            drawBorder: false,
            display: false,
            drawOnChartArea: false,
            drawTicks: false
          },
          ticks: {
            font: {
              size: 14,
              family: "Open Sans",
              style: 'normal',
              lineHeight: 2
            },
            color: "#fff"
          },
        },
      },
    },
  });
}
// function run render
function renderStatisticsView() {
  var renderStatisticHtml = "";
  allStatistics.forEach((item, index) => {
    renderStatisticHtml =
      renderStatisticHtml + renderStatistics(item, index).toString();
  });
  document.getElementById("render-statistics").innerHTML = renderStatisticHtml;
}
renderStatisticsView();

function renderStatisticsSelectView() {
  var renderStatisticsSelectHtml = renderStatisticsSelect(
    allStatistics[0]
  ).toString();
  document.getElementById("render-statistics-select").innerHTML =
    renderStatisticsSelectHtml;
}


function renderStoreRevenueTableView() {
  var render = renderStoreRevenueTable().toString();
  document.getElementById("render-table").innerHTML = render;
}
// handle function

function handleRevenue() {
  onChooseStatistics = 0;
  renderStatisticsView();
  renderStatisticsSelectView();
  renderStoreRevenueTableView();
  CharView();
  document.getElementById("chart-container").classList.remove("chart-mode");
}
