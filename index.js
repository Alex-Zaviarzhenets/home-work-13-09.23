const form = document.querySelector("form");
const titleInput = document.querySelector("#title");
const priceInput = document.querySelector("#price");

const allProducts = document.querySelector("#allProducts");
const h2 = document.createElement("h2");
h2.innerText = "No products";
allProducts.append(h2);

let products = [];

form.onsubmit = (e) => {
  e.preventDefault();
  products.push({ title: titleInput.value, price: priceInput.value });
  titleInput.value = "";
  priceInput.value = "";
  newProducts();
};

function createNode(title, price, index) {
  const div = document.createElement("div");
  div.classList.add("product");
  const titleP = document.createElement("p");
  const priceP = document.createElement("p");

  titleP.innerText = title;
  priceP.innerText = price;

  const btn = closeBtn();

  btn.onclick = () => {
    allProducts.removeChild(div);

    const newProd = [];
    for (let i = 0; i < products.length; i++) {
      if (i !== index) newProd.push(products[i]);
    }
    products = newProd;

    if (!products.length) {
      allProducts.append(h2);
    }
  };

  div.append(titleP, priceP, btn);

  div.onmouseover = () => {
    btn.style.opacity = "1";
  };
  div.onmouseleave = () => {
    btn.style.opacity = "0";
  };

  allProducts.append(div);
}

function newProducts() {
  allProducts.innerHTML = "";
  for (let i = 0; i < products.length; i++) {
    createNode(products[i].title, products[i].price, i);
  }
}

function closeBtn() {
  const btn = document.createElement("button");
  btn.innerText = "X";
  btn.classList.add("close");
  return btn;
}

const searchInput = document.querySelector("#search");
const searchBtn = document.querySelector("#searchBtn");

searchBtn.onclick = () => {
  allProducts.innerHTML = "";
  for (let i = 0; i < products.length; i++) {
    if (products[i].title === searchInput.value) {
      createNode(products[i].title, products[i].price, i);
    }
  }
};

const sortBtn = document.querySelector("#sort");

sortBtn.onclick = () => {
  products.sort((a, b) => a.price - b.price);
  newProducts();
};


//1)кнопка при клике на данную кнопку пользователь должен 
// видеть итоговую сумму всех продуктов на странице.

const calculateTotalBtn = document.createElement("button");
calculateTotalBtn.innerText = "Calculate Total";
calculateTotalBtn.onclick = calculateTotal;
document.body.appendChild(calculateTotalBtn);


function calculateTotal (){
    let total = 0;
    for (let i = 0; i < products.length; i++){
        total +=
        parseFloat(products[i].price);
    };
    const totalPriceElement = document.querySelector("#totalPrice");
    totalPriceElement.innerText = `Total Price: $${total.toFixed(2)}`;
}


//2) кнопка которая удоляет все товары


const clearAllBtn = document.createElement("button");
clearAllBtn.innerText = "ClearAll";
calculateTotalBtn.onclick = clearAllProducts;
document.body.appendChild(clearAllBtn);

function clearAllProducts () {
    products = [];
    allProducts.innerHTML = "";
    const totalPriceElement = document.querySelector("#totalPrice");
    totalPriceElement.innerText = "Total price: $0";
    allProducts.append(h2);
}

