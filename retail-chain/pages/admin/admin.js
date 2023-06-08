function totalRevenue() {
    fetch('./model/admin-model.php?request=getbill')
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error calling admin-model.php');
        }
      })
      .then(function(data) {
        const totalCostToday = data['totalCostToday'];
        const percentageChange = data['percentageChange'];
        const changeMessage = data['changeMessage'];
  
        document.getElementById('total-cost').innerHTML = totalCostToday.toString();
        document.getElementById('percent-growth').innerHTML = percentageChange.toString() + "%";
        document.getElementById('percent-growth').classList.add(changeMessage.toLowerCase());
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  
  totalRevenue();

  function totalAmount() {
    fetch('./model/admin-model.php?request=getamount')
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error calling admin-model.php');
        }
      })
      .then(function(data) {
        const totalBillCount = data['totalBillCount'];
        document.getElementById('total-bill').innerHTML = totalBillCount.toString();
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  
  totalAmount();

  function fetchData2() {
    fetch('./model/admin-model.php?request=getrevenue2')
    .then(response => response.json())
    .then(data => {
      // Cập nhật nội dung của bảng HTML
      const tableBody = document.querySelector('.table-responsive table tbody');
      tableBody.innerHTML = '';
  
      data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.ManagerLocation}</td>
          <td>${item.ManagerName}</td>
          <td class="text-center">${item.TotalRevenue}</td>
          <td class="text-center">
            <div class="progress-wrapper w-75 mx-auto">
              <div class="progress-info">
                <div class="progress-percentage">
                  <span class="text-xs font-weight-bold">${(item.TotalRevenue / 100000000 * 100).toFixed(2)}%</span>
                </div>
              </div>
              <div class="progress">
                <div class="progress-bar bg-gradient-info" role="progressbar" aria-valuenow="${item.TotalRevenue}" aria-valuemin="0" aria-valuemax="100000000" style="width: ${(item.TotalRevenue / 1000000 * 100).toFixed(2)}%"></div>
              </div>
            </div>
          </td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.log('Error:', error);
    });
  }
  fetchData2();

  function fetchData3() {
    // Gọi AJAX để lấy danh sách ManagerLocation từ máy chủ
    fetch('./model/admin-model.php?request=getmanagerlocations')
      .then(response => response.json())
      .then(data => {
        // Lấy hộp chọn ManagerLocation
        const locationSelect = document.getElementById('locationSelect');
  
        // Xóa các lựa chọn hiện tại
        while (locationSelect.firstChild) {
          locationSelect.removeChild(locationSelect.firstChild);
        }
  
        // Thêm lựa chọn "All Locations"
        const allOption = document.createElement('option');
        allOption.value = '';
        allOption.textContent = 'All Locations';
        locationSelect.appendChild(allOption);
  
        // Thêm lựa chọn cho từng ManagerLocation
        data.forEach(location => {
          const option = document.createElement('option');
          option.value = location.ManagerID;
          option.textContent = location.ManagerLocation;
          locationSelect.appendChild(option);
        });
  
        // Gọi hàm filterByLocation khi hộp chọn thay đổi
        locationSelect.addEventListener('change', filterByLocation);
  
        // Gọi hàm filterByLocation ban đầu để hiển thị dữ liệu mặc định
        filterByLocation();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  function filterByLocation() {
    const locationSelect = document.getElementById('locationSelect');
    const selectedLocation = locationSelect.value;
    console.log(selectedLocation);
    // Gọi AJAX để lấy dữ liệu doanh thu dựa trên ManagerID được chọn
    fetch('./model/admin-model.php?request=getrevenue&&managerID=' + selectedLocation)
      .then(response => response.json())
      .then(function (data) {
        // Xử lý dữ liệu nhận được từ truy vấn PHP
        var months = [];
        var revenues = [];
        data.forEach(function (item) {
          months.push(item.Month);
          revenues.push(item.TotalRevenue);
        });
  
        // Tạo và cấu hình biểu đồ
        var ctx = document.getElementById("chart-bars").getContext("2d");
        var CheckChart = Chart.getChart('chart-bars');
        if (CheckChart) {
          CheckChart.data.labels = months;
          CheckChart.data.datasets[0].data = revenues;
          CheckChart.update();
        } else {
          new Chart(ctx, {
            type: "bar",
            data: {
              labels: months,
              datasets: [{
                label: "Sales",
                tension: 0.4,
                borderWidth: 0,
                borderRadius: 4,
                borderSkipped: false,
                backgroundColor: "#fff",
                data: revenues,
                maxBarThickness: 6
              }],
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
                    display: false
                  },
                },
              },
            },
          });
        }
      })
      .catch(function (error) {
        console.log(error)
      });
  
    fetch('./model/admin-model.php?request=getrevenue1&&managerID=' + selectedLocation)
      .then(response => response.json())
      .then(function (data) {
        // Xử lý dữ liệu nhận được từ truy vấn PHP
        var months = [];
        var currentYearRevenues = [];
        var previousYearRevenues = [];
  
        // Dữ liệu năm nay
        data.currentYear.forEach(function (item) {
          months.push(item.Month);
          currentYearRevenues.push(item.TotalRevenue);
        });
  
        // Dữ liệu năm trước
        data.previousYear.forEach(function (item) {
          previousYearRevenues.push(item.TotalRevenue);
        });
  
        // Tạo và cấu hình biểu đồ
        var ctx2 = document.getElementById("chart-line").getContext("2d");
        var gradientStroke1 = ctx2.createLinearGradient(0, 230, 0, 50);
        gradientStroke1.addColorStop(1, 'rgba(203,12,159,0.2)');
        gradientStroke1.addColorStop(0.2, 'rgba(72,72,176,0.0)');
        gradientStroke1.addColorStop(0, 'rgba(203,12,159,0)');
  
        var gradientStroke2 = ctx2.createLinearGradient(0, 230, 0, 50);
        gradientStroke2.addColorStop(1, 'rgba(20,23,39,0.2)');
        gradientStroke2.addColorStop(0.2, 'rgba(72,72,176,0.0)');
        gradientStroke2.addColorStop(0, 'rgba(20,23,39,0)');
        var CheckChart = Chart.getChart('chart-line');
        if (CheckChart) {
          CheckChart.data.labels = months;
          CheckChart.data.datasets[0].data = currentYearRevenues;
          CheckChart.data.datasets[1].data = previousYearRevenues;
          CheckChart.update();
        }else {
          new Chart(ctx2, {
            type: "line",
            data: {
              labels: months,
              datasets: [
                {
                  label: "Năm Nay",
                  tension: 0.4,
                  borderWidth: 0,
                  pointRadius: 0,
                  borderColor: "#cb0c9f",
                  borderWidth: 3,
                  backgroundColor: gradientStroke1,
                  fill: true,
                  data: currentYearRevenues,
                  maxBarThickness: 6
                },
                {
                  label: "Năm Trước",
                  tension: 0.4,
                  borderWidth: 0,
                  pointRadius: 0,
                  borderColor: "#3A416F",
                  borderWidth: 3,
                  backgroundColor: gradientStroke2,
                  fill: true,
                  data: previousYearRevenues,
                  maxBarThickness: 6
                }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false
                }
              },
              interaction: {
                intersect: false,
                mode: 'index'
              },
              scales: {
                y: {
                  grid: {
                    drawBorder: false,
                    display: true,
                    drawOnChartArea: true,
                    drawTicks: false,
                    borderDash: [5, 5]
                  },
                  ticks: {
                    display: true,
                    padding: 10,
                    color: '#b2b9bf',
                    font: {
                      size: 11,
                      family: "Open Sans",
                      style: 'normal',
                      lineHeight: 2
                    }
                  }
                },
                x: {
                  grid: {
                    drawBorder: false,
                    display: false,
                    drawOnChartArea: false,
                    drawTicks: false,
                    borderDash: [5, 5]
                  },
                  ticks: {
                    display: true,
                    color: '#b2b9bf',
                    padding: 20,
                    font: {
                      size: 11,
                      family: "Open Sans",
                      style: 'normal',
                      lineHeight: 2
                    }
                  }
                }
              }
            }
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  
    const rows = document.querySelectorAll('.table-responsive table tbody tr');
  
    rows.forEach(row => {
      const locationCell = row.querySelector('td:nth-child(1)'); // Ô chứa ManagerLocation
      if (selectedLocation === '' || locationCell.textContent === selectedLocation) {
        row.style.display = 'table-row'; // Hiển thị hàng nếu đúng ManagerLocation hoặc đã chọn "All Locations"
      } else {
        row.style.display = 'none'; // Ẩn hàng nếu không đúng ManagerLocation
      }
    });
  }
  
  fetchData3();
  




  


