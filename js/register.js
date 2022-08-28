function shoesshop() {  
    this.name = '';
    this.password = '';
    this.gender = '';
    this.email = "";
    this.phone = "";
}

document.querySelector(".submit-register").onclick = function(){
    var khachHang = new shoesshop();
    khachHang.email = document.querySelector("#email").value;
    khachHang.password = document.querySelector("#password").value;
    khachHang.name = document.querySelector("#name").value;
    khachHang.gender = document.querySelector("#gender").value;
    khachHang.phone = document.querySelector("#phone").value;

    console.log(khachHang);

    var promise = axios({
        url: "https://shop.cyberlearn.vn/api/Users/signup",
        method: "POST",
        data: khachHang,
    });
    promise.then(function(result){
        console.log(result.data);
        
    })
    promise.catch(function(error){
        console.log(error);
    })
}