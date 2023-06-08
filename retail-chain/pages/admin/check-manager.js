// list Employess
var listManager = []
var managerId = document.getElementById("admin-id").innerHTML;
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
                <th class="text-uppercase text-secondary text-xl font-weight-bolder opacity-7 w-30 text-center">Tên</th>
                <th class="text-uppercase text-secondary text-xl font-weight-bolder opacity-7 w-20 text-center">Tên tài khoản</th>
                <th class="text-uppercase text-secondary text-xl font-weight-bolder opacity-7 w-10 text-center">Địa Chỉ</th>
                <th class="text-uppercase text-secondary text-xl font-weight-bolder opacity-7 w-10 text-center"></th>
              </tr>
            </thead>
            <tbody>
              ${data.map((item, index) => {
                return `
                <tr>
                <td>
                  <p class="text-xl font-weight-bold mb-0 text-center">${item.ManagerID}</p>
                </td>
                <td class="align-middle text-center text-sm">
                  <p class="text-xl font-weight-bold mb-0 text-center">${item.ManagerName}</p>
                </td>
                <td class="align-middle text-center text-sm">
                  <p class="text-xl font-weight-bold mb-0 text-center">${item.ManagerLogInName}</p>
                </td>
                <td class="align-middle text-center text-sm">
                  <p class="text-xl font-weight-bold mb-0 text-center">${item.ManagerLocation}</p>
                </td>
                <td class="align-middle text-center text-sm">
                  <button class="text-xl button-employee-manager font-weight-bold mb-0 text-center" onclick="editManager(${index + 1})">Sửa</button>
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
function renderEditManager(index){
  return `
  <div class="row">
    <div class="col-xl-5 col-lg-6 col-md-7 mx-auto">
      <div class="card z-index-0">
        <div class="text-center pt-4">
          <h5>${index ? 'Sửa thông tin' : 'Thêm quản lý'}</h5>
        </div>
        <div class="card-body">
          <form role="form text-left">
            <div class="mb-3">
              <input type="text" id="name" class="form-control" placeholder="Họ và Tên" aria-label="Name" aria-describedby="email-addon" value='${index ? listManager[index - 1].ManagerName : '' }'>
            </div>
            <div class="mb-3">
              <input type="text" id="username" class="form-control" placeholder="Tài Khoản" aria-label="Name" aria-describedby="email-addon" value='${index ? listManager[index - 1].ManagerName : '' }'>
            </div>
            <div class="mb-3">
              <input type="text" id="location" class="form-control" placeholder="Địa Chỉ" aria-label="Name" aria-describedby="email-addon" value='${index ? listManager[index - 1].ManagerName : '' }'>
            </div>
            <div class="mb-3">
              <input type="text" id="password" class="form-control" placeholder="Mật Khẩu" aria-label="Name" aria-describedby="email-addon" value='${index ? listManager[index - 1].ManagerName : '' }'>
            </div>
            <div class="text-center">
              <div id="error-input">
              </div>
              ${!index ? '<button type="button" class="btn bg-gradient-dark w-100 my-4 mb-2" onclick="handleAddManager()">Thêm quản lý</button>': 
              `
                <div class="d-flex justify-content-around">
                  <button type="button" class="btn bg-gradient-dark w-40 my-4 mb-2" onclick="handleEditManager(${listManager[index - 1].ManagerID})">Cập nhật</button>
                  <button type="button" class="btn bg-gradient-danger w-40 my-4 mb-2" onclick="handleDeleteManager(${listManager[index - 1].ManagerID})">Xóa</button>
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
      <button type="button" class="btn btn-sm mb-0 bg-gradient-light text-dark text-lg mb-3" onclick="addManager()">Thêm nhân viên</button>
    `
  }
}
function renderEditManagerView(index) {
  var render = renderEditManager(index).toString();
  document.getElementById("render-edit-manager").innerHTML = render;
}
function renderTableView(data) {
  var render = renderTable(data).toString();
  document.getElementById("render-table").innerHTML = render;
}
function renderButtonTypeView(type) {
  var render = renderButtonType(type).toString();
  document.getElementById("render-button-type").innerHTML = render;
}

function handleManager() {
  fetch("./model/check-manager-model.php?request=getManager")
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error calling get-statistical.php");
      }
    })
    .then(function (data) {
      listManager = data;
      renderButtonTypeView(0);
      renderTableView(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
handleManager();

function addManager() {
  document.getElementById("render-table").innerHTML = "";
  renderEditManagerView(0);
  renderButtonTypeView(1);
}
function comeBack() {
  document.getElementById("render-edit-manager").innerHTML = "";
  handleManager();
}
function editManager(index) {
  document.getElementById("render-table").innerHTML = "";
  renderButtonTypeView(1);
  renderEditManagerView(index);
}
function handleAddManager() {
  const name = document.getElementById("name").value;
  const userName = document.getElementById("username").value;
  const location = document.getElementById("location").value;
  const password = document.getElementById("password").value;
  
  if (name.trim().length === 0 || userName.trim().length === 0 || location.trim().length === 0 
      || password.trim().length === 0) {
    document.getElementById("error-input").innerHTML = `<h8 class="text-danger">Không để trống</h8>`;
  } else {
    const data = {
      request: "createManager",
      ManagerName: name,
      ManagerPassword: password,
      ManagerLogInName: userName,
      ManagerLocation: location,
    };

    fetch("./model/check-manager-model.php", {
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
          throw new Error("Error calling check-manager-model.php");
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

function handleEditManager(saleID){
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
      request: "editManager",
      saleID: saleID,
      name: name,
      email: email,
      phone: phone,
      salary: salary,
      hour: hour,
      password: password,
      managerId: managerId
    };
    fetch("./model/check-manager-model.php", {
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
          throw new Error("Error calling check-manager-model.php");
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
function handleDeleteManager(saleID) {
  var confirmed = confirm("Bạn có chắc chắn muốn xóa nhân viên này?");
  if (confirmed) {
    // Gửi yêu cầu xóa đến máy chủ
    fetch("./model/check-manager-model.php", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ request: "deleteManager", saleID: saleID }),
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error calling check-manager-model.php");
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
