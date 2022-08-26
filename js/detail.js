window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("productid");
  console.log("param", myParam);

  async function getDataDetail() {
    try {
      var result = await axios({
        url: "https://shop.cyberlearn.vn/api/Product/getbyid?id="+myParam,
        method: "GET",
      });
      console.log(result);
      renderShoesDetail(result.data.content);
      
    } catch (err) {
      console.log(err);
    }
   
  }

  function renderShoesDetail(shoes) {
    var html = "";
    for (var i = 0; i < shoes.length; i++) {
      var giay = shoes[i];
      html += `
      <div class="col-4">
      <img src="${giay.image}" alt="abc">
       </div>
      <div class="col-8">
      <h4>${giay.name}</h4>
      <p>
      ${giay.description}
      </p>

      <h5 class="text-success">Available size</h5>
      <ul class="size-shoes">
          // <li>${giay.size[0]}</li>
          // <li>${giay.size[1]}</li>
          // <li>${giay.size[2]}</li>
          // <li>${giay.size[3]}</li>
          // <li>${giay.size[4]}</li>
      </ul>
   
      <span class="fw-bolder fs-5 text-danger">${giay.price}$</span>
      <br>
      <button class="button-detail-1">+</button>
      <span>1</span>
      <button class="button-detail-1">-</button>
      <br>
      <button class="mt-1 p-2">Add to cart</button>
       </div>
      `;
    }
    document.querySelector(".detail-row").innerHTML = html;
  }

  getDataDetail();
};
