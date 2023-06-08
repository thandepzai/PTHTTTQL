var email = "",
  password = "";
function checkValidatedEmail(input) {
  email = input.value;
  var errorMessage = document.getElementById("email-error");
  if (!email.length) {
    input.style.borderColor = "red";
    errorMessage.innerText = "Không để trống";
  } else {
    input.style.borderColor = "#d2d6da";
    errorMessage.innerText = "";
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
  if (!email.length) {
    document.querySelector('input[name="email"]').style.borderColor = "red";
    document.getElementById("email-error").innerText = "Không để trống";
  } else if (!password.length) {
    document.querySelector('input[name="password"]').style.borderColor = "red";
    document.getElementById("password-error").innerText = "Không để trống";
  } else {
    const data = {
      email: email,
      password: password
    };
    fetch("./model/get-account.php", {
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
        if(data['message'] === 'admin') {
          $.ajax({
            url: './session_start.php',
            type: 'POST',
            data: {id: data['id']},
            success: function(response) {
              window.location.href = "../admin/admin.php";
            },
            error: function(xhr, status, error) {
              console.log(xhr.responseText);
            }
          });   
        } else if(data['message'] === 'manage') {
          $.ajax({
            url: './session_start.php',
            type: 'POST',
            data: {id: data['id']},
            success: function(response) {
              window.location.href = "../manager/manager.php";
            },
            error: function(xhr, status, error) {
              console.log(xhr.responseText);
            }
          }); 
        } else if(data['message'] === 'sale') {
          $.ajax({
            url: './session_start.php',
            type: 'POST',
            data: {id: data['id']},
            success: function(response) {
              window.location.href = "../sales/home_nv.php";
            },
            error: function(xhr, status, error) {
              console.log(xhr.responseText);
            }
          }); 
        } else {
          document.getElementById("account-error").innerText = "Tài khoản hoặc mật khẩu không chính xác";
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
