// list employees
var listEmployees = []
var managerId = document.getElementById("manager-id").innerHTML;
// view
function renderTable(data) {
  return `
    <div class="col-12">
    <div class="card mb-4">
      <div class="card-body px-0 pt-0 pb-2">
        <div class="table-responsive p-0">
          <table class="table align-items-center mb-0">
            <thead>
              <tr>
                <th class="text-uppercase text-secondary text-xl font-weight-bolder opacity-7 w-10 text-center">ID</th>
                <th class="text-uppercase text-secondary text-xl font-weight-bolder opacity-7 w-30 text-center">Tên Nhân Viên</th>
                <th class="text-uppercase text-secondary text-xl font-weight-bolder opacity-7 w-20 text-center">Số Điện Thoại</th>
                <th class="text-uppercase text-secondary text-xl font-weight-bolder opacity-7 w-20 text-center">Mức Lương/Giờ</th>
                <th class="text-uppercase text-secondary text-xl font-weight-bolder opacity-7 w-10 text-center">Số Giờ Làm</th>
                <th class="text-uppercase text-secondary text-xl font-weight-bolder opacity-7 w-10 text-center"></th>
              </tr>
            </thead>
            <tbody>
              ${data.map((item, index) => {
                return `
                <tr>
                <td>
                  <p class="text-xl font-weight-bold mb-0 text-center">${item.SaleID}</p>
                </td>
                <td class="align-middle text-center text-sm">
                  <p class="text-xl font-weight-bold mb-0 text-center">${item.SaleName}</p>
                </td>
                <td class="align-middle text-center text-sm">
                  <p class="text-xl font-weight-bold mb-0 text-center">${item.SalePhoneNo}</p>
                </td>
                <td class="align-middle text-center text-sm">
                  <p class="text-xl font-weight-bold mb-0 text-center">${item.HourlyWage}</p>
                </td>
                <td class="align-middle text-center text-sm">
                  <p class="text-xl font-weight-bold mb-0 text-center">${item.HoursWorked}</p>
                </td>
                <td class="align-middle text-center text-sm">
                  <button class="text-xl button-employee-manager font-weight-bold mb-0 text-center" onclick="editEmployee(${index + 1})">Sửa</button>
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
function renderEditEmployee(index){
  return `
  <div class="row">
    <div class="col-xl-5 col-lg-6 col-md-7 mx-auto">
      <div class="card z-index-0">
        <div class="text-center pt-4">
          <h5>${index ? 'Sửa thông tin' : 'Thêm nhân viên'}</h5>
        </div>
        <div class="card-body">
          <form role="form text-left">
            <div class="mb-3">
              <input type="text" id="name" class="form-control" placeholder="Tên" aria-label="Name" aria-describedby="email-addon" value='${index ? listEmployees[index - 1].SaleName : '' }'>
            </div>
            <div class="mb-3">
              <input type="email" id="email" class="form-control" placeholder="Email" aria-label="Email" aria-describedby="email-addon" value='${index ? listEmployees[index - 1].SaleEmail : '' }'>
            </div>
            <div class="mb-3">
              <input type="text" id="phone" class="form-control" placeholder="Số Điện thoại" aria-label="Name" aria-describedby="email-addon" value='${index ? listEmployees[index - 1].SalePhoneNo : '' }'>
            </div>
            <div class="mb-3">
              <input type="text" id="salary" class="form-control" placeholder="Mức Lương" aria-label="Name" aria-describedby="email-addon" value='${index ? listEmployees[index - 1].HourlyWage : '' }'>
            </div>
            ${index ? `
            <div class="mb-3">
              <input type="text" id="hour" class="form-control" placeholder="Số giờ làm" aria-label="Name" aria-describedby="email-addon" value='${index ? listEmployees[index - 1].HoursWorked : '' }'>
            </div>
            ` : ''}

            <div class="mb-3">
              <input type="password" id="password" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="password-addon" value='${index ? listEmployees[index - 1].SalePassword : '' }'>
            </div>
            <div class="text-center">
              <div id="error-input">
              </div>
              ${!index ? '<button type="button" class="btn bg-gradient-dark w-100 my-4 mb-2" onclick="handleAddEmployee()">Thêm thành viên</button>': 
              `
                <div class="d-flex justify-content-around">
                  <button type="button" class="btn bg-gradient-dark w-40 my-4 mb-2" onclick="handleEditEmployee(${listEmployees[index - 1].SaleID})">Cập nhật</button>
                  <button type="button" class="btn bg-gradient-danger w-40 my-4 mb-2" onclick="handleDeleteEmployee(${listEmployees[index - 1].SaleID})">Xóa</button>
                </div>
              `
              }
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  `
}
function renderButtonType(type) {
  if(type) {
    return `
      <button type="button" class="btn btn-sm mb-0 bg-gradient-light text-dark text-lg mb-3" onclick="comeBack()">Quay lại</button>
    `
  }else {
    return `
      <button type="button" class="btn btn-sm mb-0 bg-gradient-light text-dark text-lg mb-3" onclick="addEmployees()">Thêm nhân viên</button>
    `
  }
}
function renderEditEmployeeView(index) {
  var render = renderEditEmployee(index).toString();
  document.getElementById("render-edit-employees").innerHTML = render;
}
function renderTableView(data) {
  var render = renderTable(data).toString();
  document.getElementById("render-table").innerHTML = render;
}
function renderButtonTypeView(type) {
  var render = renderButtonType(type).toString();
  document.getElementById("render-button-type").innerHTML = render;
}

function handleEmployee() {
  fetch("./model/employee-manager.php?request=getEmployees&&managerID=" + managerId)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error calling get-statistical.php");
      }
    })
    .then(function (data) {
      data.sort(function(a, b) {
        return a.saleID - b.saleID;}
      );
      listEmployees = data;
      renderButtonTypeView(0);
      renderTableView(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
handleEmployee();

function addEmployees() {
  document.getElementById("render-table").innerHTML = "";
  renderEditEmployeeView(0);
  renderButtonTypeView(1);
}
function comeBack() {
  document.getElementById("render-edit-employees").innerHTML = "";
  handleEmployee();
}
function editEmployee(index) {
  document.getElementById("render-table").innerHTML = "";
  renderButtonTypeView(1);
  renderEditEmployeeView(index);
}
function handleAddEmployee() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const salary = document.getElementById("salary").value;
  const hour = 0;
  const password = document.getElementById("password").value;
  
  if (name.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0 
      || phone.trim().length === 0 || salary.trim().length === 0) {
    document.getElementById("error-input").innerHTML = `<h8 class="text-danger">Không để trống</h8>`;
  } else {
    const data = {
      request: "createEmployee",
      name: name,
      email: email,
      phone: phone,
      salary: salary,
      hour: hour,
      password: password,
      managerId: managerId
    };

    fetch("./model/employee-manager.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error calling employee-manager.php");
        }
      })
      .then(function (data) {
        console.log(data);
        comeBack();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

function handleEditEmployee(saleID){
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const salary = document.getElementById("salary").value;
  const hour = document.getElementById("hour").value;
  const password = document.getElementById("password").value;
  
  if (name.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0 
      || phone.trim().length === 0 || salary.trim().length === 0) {
    document.getElementById("error-input").innerHTML = `<h8 class="text-danger">Không để trống</h8>`;
  } else {
    const data = {
      request: "editEmployee",
      saleID: saleID,
      name: name,
      email: email,
      phone: phone,
      salary: salary,
      hour: hour,
      password: password,
      managerId: managerId
    };
    fetch("./model/employee-manager.php", {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error calling employee-manager.php");
        }
      })
      .then(function (data) {
        console.log(data);
        comeBack();
      })
      .catch(function (error) {
        console.log(error);
      });
    }
}
function handleDeleteEmployee(saleID) {
  var confirmed = confirm("Bạn có chắc chắn muốn xóa nhân viên này?");
  if (confirmed) {
    // Gửi yêu cầu xóa đến máy chủ
    fetch("./model/employee-manager.php", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ request: "deleteEmployee", saleID: saleID }),
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error calling employee-manager.php");
        }
      })
      .then(function (data) {
        console.log(data);
        comeBack();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
