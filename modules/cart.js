import { importData } from "../utils/importData.js";

const getStorage = JSON.parse(localStorage.getItem("storageProducts")) || [];
console.log(getStorage);

let cart = [];

for (const element of getStorage) {
    const product = await importData(element.identifier);
    cart.push(product);
    console.log(product.title);
}

//
function showCart() {
    const container = document.getElementById("cart");
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
        let sousTotal = item.price * 1;
        total = total + sousTotal;

        const novo = document.createElement("tr");
        novo.innerHTML = novo.innerHTML =
            "<td><img src='" +
            item.thumbnail +
            "' width='50'></td>" +
            "<td>" +
            item.title +
            "</td>" +
            "<td>" +
            item.price +
            "$</td>" +
            "<td>" +
            "<button onclick='decreaseQty(" +
            j +
            ")'>-</button>" +
            1 +
            "<button onclick='increaseQty(" +
            j +
            ")'>+</button>" +
            "</td>" +
            "<td>" +
            sousTotal +
            "$</td>" +
            "<td><button id='supprimer' onclick='removeFromCart(" +
            j +
            ")'>Supprimer</button></td>";
        table.appendChild(novo);
    }

    container.appendChild(table);
    document.getElementById("total").innerText = total.toFixed(2);
}

// +
function increaseQty(i) {
    if (cart[i].quantity < cart[i].stock) {
        cart[i].quantity = cart[i].quantity + 1;
    } else {
        alert("Stock épuisé !");
    }
    showCart();
}

// -
function decreaseQty(i) {
    if (cart[i].quantity > 1) {
        cart[i].quantity = cart[i].quantity - 1;
    } else {
        cart.splice(i, 1);
    }
    showCart();
}

// supprimer
function removeFromCart(i) {
    cart.splice(i, 1);
    showCart();
}

//
showCart();

console.log(cart);
