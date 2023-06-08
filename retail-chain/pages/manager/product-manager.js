// list Products
var listProducts = []
var managerId = document.getElementById("manager-id").innerHTML;
// view
function renderTable(data, page, numberOfPages) {
  return `
    <div class="col-12">
    <div class="card mb-4">
      <div class="card-body px-0 pt-0 pb-2">
        <div class="table-responsive p-0">
          <table class="table align-items-center mb-0">
            <thead>
              <tr>
                <th class="text-uppercase text-secondary text-xl font-weight-bolder opacity-7 w-10 text-center"></th>
                <th class="text-uppercase text-secondary text-xl font-weight-bolder opacity-7 w-10 text-center">ID</th>
                <th class="text-uppercase text-secondary text-xl font-weight-bolder opacity-7 w-20 text-center">Tên Sản Phẩm</th>
                <th class="text-uppercase text-secondary text-xl font-weight-bolder opacity-7 w-10 text-center">Giá Nhập Vào</th>
                <th class="text-uppercase text-secondary text-xl font-weight-bolder opacity-7 w-10 text-center">Giá Xuất Ra</th>
                <th class="text-uppercase text-secondary text-xl font-weight-bolder opacity-7 w-10 text-center">Số Lượng</th>
                <th class="text-uppercase text-secondary text-xl font-weight-bolder opacity-7 w-20 text-center">Hạn Sử Dụng</th>
                <th class="text-uppercase text-secondary text-xl font-weight-bolder opacity-7 w-10 text-center"></th>
              </tr>
            </thead>
            <tbody>
              ${data.map((item, index) => {
                return `
                <tr>
                <td>
                  <div class="w-100 d-flex justify-content-center">
                    <div class="image-container">
                      <img src="../../assets/image/${item.ImageProduct}" class="image-manager">
                    </div>
                  </div>
                </td>
                <td>
                  <p class="text-xl font-weight-bold mb-0 text-center">${item.ProductID}</p>
                </td>
                <td class="align-middle text-center text-sm">
                  <p class="text-xl font-weight-bold mb-0 text-center">${item.ProductName}</p>
                </td>
                <td class="align-middle text-center text-sm">
                  <p class="text-xl font-weight-bold mb-0 text-center">${item.ImportPrice}</p>
                </td>
                <td class="align-middle text-center text-sm">
                  <p class="text-xl font-weight-bold mb-0 text-center">${item.OutputPrice}</p>
                </td>
                <td class="align-middle text-center text-sm">
                  <p class="text-xl font-weight-bold mb-0 text-center">${item.ProductQuantity}</p>
                </td>
                <td class="align-middle text-center text-sm">
                  <p class="text-xl font-weight-bold mb-0 text-center">${item.ExpirationDate}</p>
                </td>
                <td class="align-middle text-center text-sm">
                  <button class="text-xl button-employee-manager font-weight-bold mb-0 text-center" onclick="editProduct(${index + 1})">Sửa</button>
                </td>
              </tr>      
                `
              }).join('')}
            </tbody>
          </table>
          ${
            renderNumberOfPages(page, numberOfPages)         
          }
        </div>
      </div>
    </div>
  </div>
  `;
}
function renderEditProduct(index){
  return `
  <div class="row">
    <div class="col-xl-5 col-lg-6 col-md-7 mx-auto">
      <div class="card z-index-0">
        <div class="text-center pt-4">
          <h5>${index ? 'Sửa thông tin sản phẩm' : 'Thêm sản phẩm'}</h5>
        </div>
        <div class="card-body">
          <form role="form text-left">
            <div class="mb-3">
              <input type="file" id="imageInput" class="form-control">
            </div>
            <div class="mb-3">
              <input type="text" id="name" class="form-control" placeholder="Tên sản phẩm" aria-label="Name" aria-describedby="email-addon" value='${index ? listProducts[index - 1].ProductName : '' }'>
            </div>
            <div class="mb-3">
              <input type="email" id="inputPrice" class="form-control" placeholder="Giá nhập vào" aria-label="Email" aria-describedby="email-addon" value='${index ? listProducts[index - 1].ImportPrice : '' }'>
            </div>
            <div class="mb-3">
              <input type="text" id="quantity" class="form-control" placeholder="Số lượng" aria-label="Name" aria-describedby="email-addon" value='${index ? listProducts[index - 1].ProductQuantity : '' }'>
            </div>
            <div class="mb-3">
              <input type="text" id="expiry" class="form-control" placeholder="Hạn sử dụng yyyy-mm-dd" aria-label="Name" aria-describedby="email-addon" value='${index ? listProducts[index - 1].ExpirationDate : '' }'>
            </div>
            <div class="mb-3">
              <input type="text" id="outputPrice" class="form-control" placeholder="Giá xuất ra" aria-label="Name" aria-describedby="email-addon" value='${index ? listProducts[index - 1].OutputPrice : '' }'>
            </div>
            <div class="text-center">
              <div id="error-input">
              </div>
              ${!index ? '<button type="button" class="btn bg-gradient-dark w-100 my-4 mb-2" onclick="handleAddProduct()">Thêm sản phẩm</button>': 
              `
                <div class="d-flex justify-content-around">
                  <button type="button" class="btn bg-gradient-dark w-40 my-4 mb-2" onclick="handleEditProduct('${listProducts[index - 1].ProductID}')">Cập nhật</button>
                  <button type="button" class="btn bg-gradient-danger w-40 my-4 mb-2" onclick="handleDeleteProduct('${listProducts[index - 1].ProductID}')">Xóa</button>
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
      <button type="button" class="btn btn-sm mb-0 bg-gradient-light text-dark text-lg mb-3" onclick="addProducts()">Thêm Sản Phẩm</button>
    `
  }
}

function renderNumberOfPages(page, numberOfPages) {
  let paginationHTML = `
    <nav aria-label="Page navigation example">
      <div class="d-flex w-100 justify-content-center pt-4 border-top">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
  `;

  for (let i = 0; i < numberOfPages; i++) {
    paginationHTML += `
      <li class="page-item ${page === i + 1 ? 'active' : ''}">
        <button class="page-link" onClick="handleChangePage(${i + 1})">${i + 1}</button>
      </li>
    `;
  }

  paginationHTML += `
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  `;

  return paginationHTML;
}

function renderEditProductView(index) {
  index = (page-1)*10 + index;
  var render = renderEditProduct(index).toString();
  document.getElementById("render-edit-product").innerHTML = render;
}
function renderTableView(data, page, numberOfPages) {
  var render = renderTable(data, page, numberOfPages).toString();
  document.getElementById("render-table").innerHTML = render;
}
function renderButtonTypeView(type) {
  var render = renderButtonType(type).toString();
  document.getElementById("render-button-type").innerHTML = render;
}

function handleProduct() {
  fetch("./model/product-manager.php?request=getProducts&&managerID=" + managerId)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error calling get-statistical.php");
      }
    })
    .then(function (data) {
      listProducts = data;
      handleChangePage(1);
      renderButtonTypeView(0);
    })
    .catch(function (error) {
      console.log(error);
    });
}
handleProduct();
let page = 0;
function handleChangePage(newPage) {
  page = newPage;
  let numberOfPages = (listProducts.length/10);
  let dataPage = 0;
  if (page === numberOfPages) {
    dataPage = listProducts.slice((page - 1)*10, listProducts.length)
  } else {
    dataPage = listProducts.slice((page - 1)*10, page*10)
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
  renderTableView(dataPage, page, numberOfPages);
}

function addProducts() {
  document.getElementById("render-table").innerHTML = "";
  renderEditProductView(0);
  renderButtonTypeView(1);
}
function comeBack() {
  document.getElementById("render-edit-product").innerHTML = "";
  handleProduct();
}
function editProduct(index) {
  document.getElementById("render-table").innerHTML = "";
  renderButtonTypeView(1);
  renderEditProductView(index);
}
function handleAddProduct() {
  var name = document.getElementById('name').value;
  var price = document.getElementById('inputPrice').value;
  var quantity = document.getElementById('quantity').value;
  var expiry = document.getElementById('expiry').value;
  var outputPrice = document.getElementById('outputPrice').value;
  var image = document.getElementById('imageInput').files[0];

  if (name.trim().length === 0 || price.trim().length === 0 || quantity.trim().length === 0 
      || expiry.trim().length === 0 || outputPrice.trim().length === 0) {
    document.getElementById("error-input").innerHTML = `<h8 class="text-danger">Không để trống</h8>`;
  } else {
    var formData = new FormData();
    formData.append('image', image);
    formData.append('request', 'addProduct');
    formData.append('name', name);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('expiry', expiry);
    formData.append('outputPrice', outputPrice);
    formData.append('managerId', managerId);

    fetch("./model/product-manager.php", {
      method: "POST",
      body: formData
    })
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error calling Product-manager.php");
      }
    })
    .then(function(data) {
      console.log(data);
      comeBack();
    })
    .catch(function(error) {
      console.log(error);
    });
  }
}


function handleEditProduct(ProductID){
  var name = document.getElementById('name').value;
  var price = document.getElementById('inputPrice').value;
  var quantity = document.getElementById('quantity').value;
  var expiry = document.getElementById('expiry').value;
  var outputPrice = document.getElementById('outputPrice').value;
  if (name.trim().length === 0 || price.trim().length === 0 || quantity.trim().length === 0 
      || expiry.trim().length === 0 || outputPrice.trim().length === 0) {
    document.getElementById("error-input").innerHTML = `<h8 class="text-danger">Không để trống</h8>`;
  } else {
    var formData = new FormData();
    formData.append('request', 'editProduct');
    formData.append('name', name);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('expiry', expiry);
    formData.append('outputPrice', outputPrice);
    formData.append('managerId', managerId);
    formData.append('productId', ProductID);

    fetch("./model/product-manager.php", {
      method: "PUT",
      body: formData
    })
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error calling Product-manager.php");
      }
    })
    .then(function(data) {
      console.log(data);
      comeBack();
    })
    .catch(function(error) {
      console.log(error);
    });
  }
}
function handleDeleteProduct(ProductID) {
  var confirmed = confirm("Bạn có chắc chắn muốn xóa nhân viên này?");
  if (confirmed) {
    // Gửi yêu cầu xóa đến máy chủ
    fetch("./model/Product-manager.php", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ request: "deleteProduct", ProductID: ProductID, ManagerID: managerId }),
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error calling Product-manager.php");
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
