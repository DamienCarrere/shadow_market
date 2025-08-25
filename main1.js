const products = [
  {
    id: 1,
    name: "Clavier mécanique",
    category: "Informatique",
    price: 59.9,
    stock: 23,
    rating: 4.5,
    image: "https://placehold.co/200x200?text=Clavier",
    description: "Clavier mécanique compact avec switchs bleus.",
  },
  {
    id: 2,
    name: "Souris sans fil",
    category: "Informatique",
    price: 29.9,
    stock: 45,
    rating: 4.3,
    image: "https://placehold.co/200x200?text=Souris",
    description: "Souris ergonomique sans fil avec capteur optique.",
  },
];

// корзина (сохраняем в localStorage)
// panier
let cart1 = JSON.parse(localStorage.getItem("cart1")) || [];

// рисуем товары
//articles
const productsDiv = document.getElementById("products");
productsDiv.innerHTML = "";
for (let i = 0; i < products.length; i++) {
  let p = products[i];
  let div = document.createElement("div");
  div.innerHTML =
    "<img src='" +
    p.image +
    "' width='80'><br>" +
    "<b>" +
    p.name +
    "</b><br>" +
    "Prix: " +
    p.price +
    "$<br>" +
    "Stock: " +
    p.stock +
    "<br>" +
    "<button onclick='addToCart(" +
    i +
    ")'>Ajouter</button>";
  productsDiv.appendChild(div);
}

// показать корзину
function showCart() {
  const container = document.getElementById("cart1");
  container.innerHTML = "";

  if (cart.length == 0) {
    container.innerHTML = "<p>Panier vide</p>";
    document.getElementById("total").innerText = "0";
    return;
  }

  let table = document.createElement("table");
  let header =
    "<tr><th>Image</th><th>Nom</th><th>Prix unitaire</th><th>Quantité</th><th>Sous-total</th><th>Action</th></tr>";
  table.innerHTML = header;

  let total = 0;

  for (let j = 0; j < cart.length; j++) {
    let item = cart[j];
    let sousTotal = item.price * item.quantity;
    total = total + sousTotal;

    const novo = document.createElement("tr");
    novo.innerHTML =
      "<td><img src='" +
      item.image +
      "' width='50'></td>" +
      "<td>" +
      item.name +
      "</td>" +
      "<td>" +
      item.price +
      "$</td>" +
      "<td>" +
      "<button onclick='decreaseQty(" +
      j +
      ")'>-</button>" +
      item.quantity +
      "<button onclick='increaseQty(" +
      j +
      ")'>+</button>" +
      "</td>" +
      "<td>" +
      sousTotal +
      "$</td>" +
      "<td><button onclick='removeFromCart(" +
      j +
      ")'>Supprimer</button></td>";
    table.appendChild(novo);
  }

  container.appendChild(table);
  document.getElementById("total").innerText = total;
}

// +
function addToCart(i) {
  let product = products[i];
  let found = null;

  for (let k = 0; k < cart.length; k++) {
    if (cart[k].id == product.id) {
      found = cart1[k];
    }
  }

  if (found) {
    if (found.quantity < product.stock) {
      found.quantity = found.quantity + 1;
    } else {
      alert("Stock épuisé !");
    }
  } else {
    cart1.push({
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      image: product.image,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart1));
  showCart();
}

// +
function increaseQty(i) {
  if (cart1[i].quantity < cart[i].stock) {
    cart1[i].quantity = cart[i].quantity + 1;
  } else {
    alert("Stock épuisé !");
  }
  localStorage.setItem("cart", JSON.stringify(cart1));
  showCart();
}

// -
function decreaseQty(i) {
  if (cart1[i].quantity > 1) {
    cart1[i].quantity = cart[i].quantity - 1;
  }
  localStorage.setItem("cart1", JSON.stringify(cart1));
  showCart();
}

// supprimer
function removeFromCart(i) {
  cart1.splice(i, 1);
  localStorage.setItem("cart1", JSON.stringify(cart1));
  showCart();
}

//
showCart();
