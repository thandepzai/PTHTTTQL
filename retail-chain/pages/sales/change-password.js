var managerId = document.getElementById("manager-id").innerHTML;
function handleChangePassword() {
  var oldPassword = document.getElementById("oldPass").value;
  var newPassword = document.getElementById("newPass").value;
  if (oldPassword.trim().length === 0 || newPassword.trim().length === 0) {
    var formData = new FormData();
    formData.append('image', image);
    formData.append('request', 'addProduct');
    document.getElementById(
      "error-input"
    ).innerHTML = `<h8 class="text-danger">Không để trống</h8>`;
  } else {
    const data = {
      request: "changePasswordManager",
      oldPassword: oldPassword,
      newPassword: newPassword,
      managerId: managerId,
    };
    fetch("../member/model/change-password.php", {
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
        if(data['message'] === 'Successfully') {
          alert('Đổi mật khẩu thành công');
          window.location.href = "./manager.php";
        } else if(data['message'] === 'Wrong Password') {
          document.getElementById(
            "error-input"
          ).innerHTML = `<h8 class="text-danger">Mật khẩu không chính xác</h8>`;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
