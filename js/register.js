// function shoesshop() {
//     this.name = '';
//     this.password = '';
//     this.gender = '';
//     this.email = "";
//     this.phone = "";
// }
class myUser {
    constructor(userEmail, userPass, userName, userPhone, userGender) {
        this.userEmail = userEmail;
        this.userPass = userPass;
        this.userName = userName;
        this.userPhone = userPhone;
        this.userGender = userGender;
    }
}

let fnCheckRadioButton = (btn) => {
    if (btn === 'isMale') {
        document.getElementById('isFemale').checked = false;
        document.getElementById('isMale').checked = true;
    }
    else {
        document.getElementById('isFemale').checked = true;
        document.getElementById('isMale').checked = false;
    }
}


let fnValidate = (param, confirmPass) => {
    document.getElementById("warningEmail").innerHTML = ''
    document.getElementById("warningPassword").innerHTML = ''
    document.getElementById("warningPasswordconfirm").innerHTML = ''
    document.getElementById("warningName").innerHTML = ''
    document.getElementById("warningPhone").innerHTML = ''

    let regNumber = /[^0-9]/g; //Kiểm tra Chỉ có các ký tự số
    let onlyLetter = /^[A-Za-z]+$/;
    let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let regPass = new RegExp('/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/');
    let regDate = new RegExp('/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/');

    var tempName = removeVietnameseTones(param.userName)
    let isValid = true;
    if (param.userEmail.trim() === '' || !regEmail.test(param.userEmail)) {
        document.getElementById("warningEmail").innerHTML = '** Email phải đúng định dạng, không để trống **'
        // document.getElementById("tbEmail").style.display = 'inline-block'
        isValid = false;
    }

    if (param.userPass.trim() === '' || param.userPass.length < 6 || param.userPass.length > 10 || regPass.test(param.userPass)) {
        document.getElementById("warningPassword").innerHTML = '** Mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt), không để trống **'
        // document.getElementById("tbMatKhau").style.display = 'inline-block'
        isValid = false;
    } else if (param.userPass.trim() !== confirmPass.trim()) {
        document.getElementById("warningPasswordconfirm").innerHTML = '** Mật khẩu xác nhận không giống Mật khẩu **'
    }

    if (param.userName.trim() === '' || !onlyLetter.test(tempName)) {
        document.getElementById("warningName").innerHTML = '** Tên user phải là chữ, không để trống **'
        // document.getElementById("tbTen").style.display = 'inline-block'
        isValid = false;
    }

    if (param.userPhone === '' || regNumber.test(param.userPhone)) {
        document.getElementById("warningPhone").innerHTML = '** Chỉ được nhập số **'
        // document.getElementById("tbGiolam").style.display = 'inline-block'
        isValid = false;
    }
    return isValid;
}


let fnSubmit = () => {
    let _email = document.getElementById('input_Email').value;
    let _pass = document.getElementById('input_Password').value;
    let _passConfirm = document.getElementById('input_Passwordconfirm').value;
    let _name = document.getElementById('input_Name').value;
    let _phone = document.getElementById('input_Phone').value;
    let _isGender = document.getElementById('isMale').checked

    let newUser = new myUser(_email, _pass, _name, _phone, _isGender, _passConfirm);
    let isValid = fnValidate(newUser, _passConfirm);
    if (!isValid)
        return;

    var promise = axios({
        url: 'https://shop.cyberlearn.vn/api/Users/signup',
        method: 'POST',
        data: {
            email: _email,
            password: _pass,
            name: _name,
            gender: _isGender,
            phone: _phone
        }
    });

    //thành công 
    promise.then(function (result) {
        window.alert("Đăng ký thành công!")
    });

    promise.catch(function (err) {
        let noti = err.response.data.message
        document.getElementById("warningEmail").innerHTML = noti
        // window.alert(err.response.data.message)
    })
}


// document.querySelector(".submit-register").onclick = function () {
//     var khachHang = new shoesshop();
//     khachHang.email = document.querySelector("#email").value;
//     khachHang.password = document.querySelector("#password").value;
//     khachHang.name = document.querySelector("#name").value;
//     khachHang.gender = document.querySelector("#gender").value;
//     khachHang.phone = document.querySelector("#phone").value;

//     console.log(khachHang);

//     var promise = axios({
//         url: "https://shop.cyberlearn.vn/api/Users/signup",
//         method: "POST",
//         data: khachHang,
//     });
//     promise.then(function (result) {
//         console.log(result.data);

//     })
//     promise.catch(function (error) {
//         console.log(error);
//     })
// }
