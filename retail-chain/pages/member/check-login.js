var listAccount = [];
// Khởi tạo đối tượng XMLHttpRequest
var xhr = new XMLHttpRequest();

// Xác định phương thức và URL để gửi yêu cầu GET
xhr.open("GET", "./model/get-account.php");

// Đăng ký hàm xử lý sự kiện cho khi yêu cầu hoàn thành
xhr.onload = function () {
  if (this.status === 200) {
    // Xử lý dữ liệu nhận được từ phía máy chủ
    listAccount = JSON.parse(this.responseText);
  }
};

// Gửi yêu cầu GET đến máy chủ
xhr.send();
var email='', password='';
function checkValidatedEmail(input) {
  email = input.value;
  var errorMessage = document.getElementById("email-error");
  if (!email.length) {
    input.style.borderColor = "red";
    errorMessage.innerText = "Không để trống";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      input.style.borderColor = "#d2d6da";
      errorMessage.innerText = "";
    } else {
      input.style.borderColor = "red";
      errorMessage.innerText = "Email không hợp lệ";
    }
  }
}

function checkValidatedPassword(input) {
  password = input.value;
  var errorMessage = document.getElementById("password-error");
  if (!password.length) {
    input.style.borderColor = "red";
    errorMessage.innerText = "Không để trống";
  } else if (password.length < 6) {
    input.style.borderColor = "red";
    errorMessage.innerText = "Mật khẩu phải chứa ít nhất 6 ký tự";
  } else {
    input.style.borderColor = "#d2d6da";
    errorMessage.innerText = "";
  }
}

function checkLogin() {
  if(!email.length) {
    document.querySelector('input[name="email"]').style.borderColor = "red";
    document.getElementById("email-error").innerText = "Không để trống";   
  } else if (!password.length) {
    document.querySelector('input[name="password"]').style.borderColor = "red";
    document.getElementById("password-error").innerText = "Không để trống";
  } else {
    if(listAccount.length){
      var checkEmail = false;
      listAccount.forEach((e) => {
        if(e.SaleEmail === email){
          if (e.SalePassword === password){
            document.getElementById("account-error").innerText = "";

            $.ajax({
              url: './session_start.php',
              type: 'POST',
              data: {id: e.SaleID},
              success: function(response) {
                console.log(response);
              },
              error: function(xhr, status, error) {
                console.log(xhr.responseText);
              }
            });            
            window.location.href = "../sales/home_nv.php";
          } else {
            document.getElementById("account-error").innerText = "Mật khẩu không chính xác";
          }
          checkEmail = true
        }
      })
      if(!checkEmail) {
        document.getElementById("account-error").innerText = "Email không tồn tại";
      }
    }
  }
}
