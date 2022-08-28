async function getData() {
  try {
    var result = await axios({
      url: "https://shop.cyberlearn.vn/api/Product",
      method: "GET",
      ResponseType: JSON,
    });
    renderShoes(result.data.content);
  } catch (err) {
    console.log(err);
  }
}

window.onload = function () {
  getData();
};

function renderShoes(arr) {
  var html = "";
  for (var i = 0; i < arr.length; i++) {
    var shoes = arr[i];
    html += `
        <div class="card d-flex flex-column p-0">
                <img src="${shoes.image}" alt="card-1" class="w-100">
                <div class="card-body">
                    <h5 class="card-title">${shoes.name}</h5>
                    <p class="card-text">${shoes.description}</p>
                    <div class="d-flex justify-content-between align-item-center">                   
                        <button class="button-product col-6" onclick="buy('${shoes.id}')">
                                <a href="../detail.html?productid=${shoes.id}" class="text-decoration-none fs-5 text-dark">
                                     Buy now
                                </a>
                        </button>                     
                        <span class="money col-6">${shoes.price}$</span>
                    </div>
                </div>
            </div>
        `;
  }

  document.querySelector(".card--items").innerHTML = html;
}

