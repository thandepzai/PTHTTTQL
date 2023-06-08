var allProduct = [];
// Khởi tạo đối tượng XMLHttpRequest
var xhr = new XMLHttpRequest();

// Xác định phương thức và URL để gửi yêu cầu GET
xhr.open("GET", "./model/get-product.php");

// Đăng ký hàm xử lý sự kiện cho khi yêu cầu hoàn thành
xhr.onload = function () {
  if (this.status === 200) {
    // Xử lý dữ liệu nhận được từ phía máy chủ
    allProduct = JSON.parse(this.responseText);
  }
};
// Gửi yêu cầu GET đến máy chủ
xhr.send();

var arr = [];
function renderProduct(image, name, quantity, price, index) {
  return `  
    <div class="row border-bottom pt-3 pb-3">
      <div class="col-12 col-xl-4">
        <div class="d-flex px-4 py-0">
          <div>
            <img src="../../assets/image/${image}" class="avatar me-3" alt="user1">
          </div>
          <div class="d-flex flex-column">
            <h6 class="mb-0 text-sm">${name}</h6>
            <p class="text-xs text-secondary mb-0">john@creative-tim.com</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-xl-2 text-center">
        <div class="h-100 d-flex align-items-center justify-content-center">
          <input type="number" id="quantity-${index}" class="form-control w-50 text-center fw-bold"  onchange="handleChangeQuantity(${index})" min="1" value="${quantity}">
        </div>
      </div>
      <div class="col-12 col-xl-2 text-center">
        <div class="h-100 d-flex align-items-center">
          <h6 class="font-weight-bolder text-secondary mb-0 w-100" id="price-${index}">${price}</h6>
        </div>
      </div>
      <div class="col-12 col-xl-2 text-center">
        <div class="h-100 d-flex align-items-center">
          <h6 class="font-weight-bolder text-secondary mb-0 w-100" id="total-${index}">${
    quantity * price
  }</h6>
        </div>
      </div>
      <div class="col-12 col-xl-2 text-center">
        <Button type="button" class="delete-button" onclick="handleChangeDelete(${index})"><i class="bi bi-trash3-fill"></i></Button>
      </div>
    </div>
  `;
}
let renderProductHtml = "";
let totalNumber = 0;
let totalMoney = 0;
function ResetRenderProduct() {
  renderProductHtml = "";
  totalNumber = 0;
  totalMoney = 0;
  arr.forEach((item, index) => {
    renderProductHtml =
      renderProductHtml +
      renderProduct(item.ImageProduct, item.ProductName, 1, item.Price, index).toString();
    totalNumber += item.quantity;
    totalMoney += item.quantity * item.Price;
  });
  document.getElementById("listProduct").innerHTML = renderProductHtml;
  document.getElementById("total-number").innerHTML = totalNumber;
  document.getElementById("total-money").innerHTML = totalMoney;
}
ResetRenderProduct();

function handleChangeQuantity(i) {
  const quantityChange = parseInt(
    document.getElementById(`quantity-${i}`).value
  );
  document.getElementById(`total-${i}`).innerHTML =
    arr[i].Price * quantityChange;

  totalNumber = totalNumber + quantityChange - parseInt(arr[i].quantity);
  totalMoney =
    totalMoney +
    parseInt(arr[i].Price) * quantityChange -
    parseInt(arr[i].Price) * parseInt(arr[i].quantity);
  arr[i].quantity = quantityChange;
  document.getElementById("total-number").innerHTML = totalNumber;
  document.getElementById("total-money").innerHTML = totalMoney;
}
function handleChangeDelete(i) {
  arr.splice(i, 1);
  ResetRenderProduct();
}

// Chose
let renderProductFindHtml = "";
function renderProductChose(image, name, quantity, price, index) {
  return `  
    <div class="row border-bottom pt-3 pb-3 recommended" onclick="handleChose(${index})">
      <div class="col-12 col-xl-6">
        <div class="d-flex px-4 py-0">
          <div>
            <img src="../../assets/image/${image}" class="avatar me-3" alt="user1">
          </div>
          <div class="d-flex flex-column">
            <h6 class="mb-0 text-sm">${name}</h6>
            <p class="text-xs text-secondary mb-0">john@creative-tim.co323m</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-xl-4 text-center">
        <div class="h-100 d-flex align-items-center">
          <h6 class="font-weight-bolder text-secondary mb-0 w-100">${price}</h6>
        </div>
      </div>
      <div class="col-12 col-xl-2 text-center">
        <div class="h-100 d-flex align-items-center">
          <h6 class="font-weight-bolder text-secondary mb-0 w-100">${quantity}</h6>
        </div>
      </div>
    </div>
  `;
}

const inputElement = document.querySelector("#find-item");
let listProductFind = [];
inputElement.addEventListener("input", function (event) {
  const value = event.target.value;
  listProductFind = [];
  allProduct.forEach((item) => {
    if (
      item.ProductName.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    ) {
      listProductFind.push(item);
    }
  });
  renderProductFindHtml = "";
  listProductFind.forEach((item, index) => {
    renderProductFindHtml =
      renderProductFindHtml +
      renderProductChose(item.ImageProduct, item.ProductName, 1, item.Price, index).toString();
  });
  document.getElementById("listProductChose").innerHTML = renderProductFindHtml;
});
inputElement.addEventListener("focus", function () {
  document.querySelector(".find-container").style.display = "inline";
});

document.addEventListener("click", function (event) {
  if (!document.querySelector(".find").contains(event.target)) {
    document.querySelector(".find-container").style.display = "none";
  }
});

function handleChose(index) {
  let check = false;
  arr.forEach((item) => {
    if (item.ProductName === listProductFind[index].ProductName) {
      check = true;
    }
  });
  if (!check) {
    arr.push(listProductFind[index]);
    arr[arr.length - 1].quantity = 1;
    ResetRenderProduct();
  }
}

//Pay
function getTime() {
  // Lấy thời gian hiện tại
  let now = new Date();
  // Lấy các thông tin về năm, tháng, ngày, giờ, phút, giây
  let year = now.getFullYear();
  let month = ("0" + (now.getMonth() + 1)).slice(-2);
  let day = ("0" + now.getDate()).slice(-2);
  let hour = ("0" + now.getHours()).slice(-2);
  let minute = ("0" + now.getMinutes()).slice(-2);
  let second = ("0" + now.getSeconds()).slice(-2);

  // Ghép các thông tin lại với nhau
  let dateTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  return dateTime;
}
let amountBill = 0;
$.ajax({
  url: "./model/get-bill.php",
  type: "GET",
  success: function (data) {
    amountBill = data;
  },
  error: function (xhr, status, error) {
    // Xử lý lỗi nếu có
    console.log(error);
  },
});
function handlePay(id) {
  if (totalNumber && amountBill) {
    let billSend = [];
    arr.forEach((item) => {
      if(item.quantity >= 1){
        billSend.push({
          ProductID: item.ProductID,
          Amount: item.quantity,
          Cost: item.Price,
          SaleID: id,
          CreateDate: getTime(),
          BillID: `Bill${amountBill + 1}`
        })
      }
    })
    console.log(billSend)
    $.ajax({
      type: "POST",
      url: "./model/post-bill.php",
      data: {
        billSend: billSend,
        SaleId: id,
      },
      success: function (data) {
        if(data === "Success"){
          alert("Thanh toán thành công");
          resetAll();
        }
      },
      error: function (xhr, status, error) {
        // Xử lý lỗi nếu có
        console.log(xhr.responseText);
      },
    });
  }
}

function resetAll() {
  arr=[];
  ResetRenderProduct();
}