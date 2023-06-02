// data variable
var listedArray = [];


// VARIABLE
const allStatistics = [
  {
    name: "Doanh thu cửa hàng",
    function: "handleRevenue()",
    selection: {
      name: "Chọn cửa hàng",
      option: ["cửa hàng 1", "cửa hàng 2"],
    },
    table: {
      fistNameTable: 'Tháng',
      secondNameTable: 'Tổng doanh thu'
    }
  },
  {
    name: "Doanh thu chuỗi cửa hàng",
    function: "revenue",
  },
  {
    name: "Sản phẩm sắp hết hạn",
    function: "handleExpiredProduct()",
    table: {
      fistNameTable: 'Tên sản phẩm',
      secondNameTable: 'Hạn sử dụng'
    }
  },
  {
    name: "Sản phẩm bán chạy",
    function: "handleSellingProducts()",
    table: {
      fistNameTable: 'Tên sản phẩm',
      secondNameTable: 'Số lượng'
    }
  },
  {
    name: "Sản phẩm bán chậm",
    function: "handleUnSellingProducts()",
    table: {
      fistNameTable: 'Tên sản phẩm',
      secondNameTable: 'Số lượng'
    }
  },
  {
    name: "Khách hàng mua nhiều nhất",
    function: "revenue",
  },
  {
    name: "Nhân viên bán nhiều nhất",
    function: "handleGoodEmployee()",
    table: {
      fistNameTable: 'Tên nhân viên',
      secondNameTable: 'Tổng doanh thu'
    }
  },
  {
    name: "Giờ bán nhiều nhất",
    function: "handleGoodTime()",
    table: {
      fistNameTable: 'Giờ',
      secondNameTable: 'Số lượng bill'
    }
  },
  {
    name: "So sánh doanh thu cửa hàng",
    function: "revenue",
  },
];

// Render views
var onChooseStatistics = -1;
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
function renderStoreRevenueTable(data, fistNameTable, secondNameTable) {
  return `
  <div class="col-12">
    <div class="card mb-4">
      <div class="card-body px-0 pt-0 pb-2">
        <div class="table-responsive p-0">
          <table class="table align-items-center mb-0">
            <thead>
              <tr>
                <th class="text-uppercase text-secondary text-xl font-weight-bolder opacity-7 w-50 text-center">${fistNameTable}</th>
                <th class="text-uppercase text-secondary text-xl font-weight-bolder opacity-7 ps-2 text-center">${secondNameTable}</th>
              </tr>
            </thead>
            <tbody>
              ${data.map((item) => {
                return `
                <tr>
                  <td>
                    <p class="text-xl font-weight-bold mb-0 text-center">${item.name}</p>
                  </td>
                  <td class="align-middle text-center text-sm">
                    <p class="text-xl font-weight-bold mb-0 text-center">${item.title}</p>
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
function CharView(labels, data) {
  var CheckChart = Chart.getChart('chart-bars');
  if (CheckChart) {
    CheckChart.data.labels = labels;
    CheckChart.data.datasets[0].data = data;
    CheckChart.update();
  }else {
    var ctx = document.getElementById("chart-bars").getContext("2d");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: "Sales",
          tension: 0.4,
          borderWidth: 0,
          borderRadius: 10,
          borderSkipped: false,
          backgroundColor: "#fff",
          data: data,
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


function renderStoreRevenueTableView(data, fistNameTable, secondNameTable) {
  var render = renderStoreRevenueTable(data, fistNameTable, secondNameTable).toString();
  document.getElementById("render-table").innerHTML = render;
}
// handle function

function handleRevenue() {
  fetch('./model/get-statistical.php?request=revenue')
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error calling get-statistical.php');
      }
    })
    .then(function(data) {
      onChooseStatistics = 0;
      renderStatisticsView();
      renderStatisticsSelectView();
      document.getElementById("render-statistics-select").classList.remove("chart-mode");
      // render table
      var dataTable = [];
      data.forEach((item, index) => {
        dataTable.push({name: `Tháng ${index + 1}`, title: item})
      })
      renderStoreRevenueTableView(dataTable, allStatistics[0].table.fistNameTable, allStatistics[0].table.secondNameTable);
      // render char
      var currentTime = new Date();
      var currentMonth = currentTime.getMonth() + 1;
      var monthArray = Array.from({ length: currentMonth }, (_, i) => `Tháng ${i + 1}`);
      CharView(monthArray, data);
      document.getElementById("chart-container").classList.remove("chart-mode");
    })
    .catch(function(error) {
      console.error('Error:', error);
    });
}

function handleExpiredProduct() {
  fetch('./model/get-statistical.php?request=expiredProduct')
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error calling get-statistical.php');
      }
    })
    .then(function(data) {
      onChooseStatistics = 2;
      renderStatisticsView();
      //render table
      var dataTable = [];
      data.forEach((item) => {
        dataTable.push({name: item.ProductName, title: item.ExpirationDate})
      })
      renderStoreRevenueTableView(dataTable, allStatistics[2].table.fistNameTable, allStatistics[2].table.secondNameTable);
      document.getElementById("chart-container").classList.add("chart-mode");
      document.getElementById("render-statistics-select").classList.add("chart-mode");
    })
    .catch(function(error) {
      console.log(error)
    });
}

function handleSellingProducts() {
  fetch('./model/get-statistical.php?request=sellingProduct')
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error calling get-statistical.php');
      }
    })
    .then(function(data) {
      onChooseStatistics = 3;
      renderStatisticsView();
      //render table
      var dataTable = [];
      data.forEach((item) => {
        dataTable.push({name: item.ProductName, title: parseInt(item.amount_sum)})
      })
      renderStoreRevenueTableView(dataTable, allStatistics[3].table.fistNameTable, allStatistics[3].table.secondNameTable);
      //render chart
      var labelsChart = [], dataChart = []
      data.forEach((item) => {
        labelsChart.push(item.ProductName)
        dataChart.push(item.amount_sum)
      })
      CharView(labelsChart, dataChart);
      document.getElementById("chart-container").classList.remove("chart-mode");
      document.getElementById("render-statistics-select").classList.add("chart-mode");
    })
    .catch(function(error) {
      console.log(error)
    });
}

function handleUnSellingProducts() {
  fetch('./model/get-statistical.php?request=unSellingProduct')
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error calling get-statistical.php');
      }
    })
    .then(function(data) {
      onChooseStatistics = 4;
      renderStatisticsView();
      //render table
      var dataTable = [];
      data.forEach((item) => {
        dataTable.push({name: item.ProductName, title: parseInt(item.amount_sum)})
      })
      renderStoreRevenueTableView(dataTable, allStatistics[4].table.fistNameTable, allStatistics[4].table.secondNameTable);
      //render chart
      var labelsChart = [], dataChart = []
      data.forEach((item) => {
        labelsChart.push(item.ProductName)
        dataChart.push(item.amount_sum)
      })
      CharView(labelsChart, dataChart);
      document.getElementById("chart-container").classList.remove("chart-mode");
      document.getElementById("render-statistics-select").classList.add("chart-mode");
    })
    .catch(function(error) {
      console.log(error)
    });
}

function handleGoodEmployee() {
  fetch('./model/get-statistical.php?request=goodEmployee')
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error calling get-statistical.php');
      }
    })
    .then(function(data) {
      onChooseStatistics = 6;
      renderStatisticsView();
      //render table
      var dataTable = [];
      data.forEach((item) => {
        dataTable.push({name: item.SaleName, title: parseInt(item.total_price_sum)})
      })
      renderStoreRevenueTableView(dataTable, allStatistics[6].table.fistNameTable, allStatistics[6].table.secondNameTable);
      //render chart
      var labelsChart = [], dataChart = []
      data.forEach((item) => {
        labelsChart.push(item.SaleName)
        dataChart.push(item.total_price_sum)
      })
      CharView(labelsChart, dataChart);
      document.getElementById("chart-container").classList.remove("chart-mode");
      document.getElementById("render-statistics-select").classList.add("chart-mode");
    })
    .catch(function(error) {
      console.log(error)
    });
}

function handleGoodTime() {
  fetch('./model/get-statistical.php?request=goodTime')
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error calling get-statistical.php');
      }
    })
    .then(function(data) {
      onChooseStatistics = 7;
      renderStatisticsView();
      //render table
      var dataTable = [];
      data.forEach((item) => {
        dataTable.push({name: item.Hour, title: parseInt(item.bill_count)})
      })
      renderStoreRevenueTableView(dataTable, allStatistics[7].table.fistNameTable, allStatistics[7].table.secondNameTable);
      //render chart
      var labelsChart = [], dataChart = []
      data.forEach((item) => {
        labelsChart.push(item.Hour)
        dataChart.push(item.bill_count)
      })
      CharView(labelsChart, dataChart);
      document.getElementById("chart-container").classList.remove("chart-mode");
      document.getElementById("render-statistics-select").classList.add("chart-mode");
    })
    .catch(function(error) {
      console.log(error)
    });
}