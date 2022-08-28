window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("productid");
  console.log("param", myParam);

  async function getDataDetail() {
    try {
      var result = await axios({
        url: "https://shop.cyberlearn.vn/api/Product/getbyid?id="+myParam,
        method: "GET",
        ResponseType: JSON,
      });
      
      renderShoesDetail(result.data.content.relatedProducts,result.data.content.size);
      
    } catch (err) {
      console.log(err);
    }  
  }

  function renderShoesDetail(shoes, size) {
    var html = "";
    for (var i = 0; i < shoes.length; i++) {
      var giay = shoes[i];
      html = `
      <div class="col-4">
      <img src="${giay.image}" alt="abc" class="w-75">
       </div>
      <div class="col-8">
      <h4>${giay.name}</h4>
      <p>
      ${giay.description}
      </p>
      <h5 class="text-success">Available size</h5>
      <ul class="size-shoes">
      <li>${size[0]}</li>
      <li>${size[1]}</li>
         <li>${size[2]}</li>
        <li>${size[3]}</li>
     <li>${size[4]}</li>
      </ul>  
      <span class="fw-bolder fs-5 text-danger">${giay.price}$</span>
      <br>
      <button class="button-detail-1">+</button>
      <span>1</span>
      <button class="button-detail-1">-</button>
      <br>
      <button class="mt-1 p-2" onclick="addToCart(${giay.id})">Add to cart</button>
       </div>
      `;
    }
    document.querySelector(".detail-row").innerHTML = html;
    console.log(html); 
  }
  getDataDetail();
  getData();
};

let cart = []

function addToCart(id){
const item =  shoes.find((giay)=>giay.id === id);
console.log(item);
}