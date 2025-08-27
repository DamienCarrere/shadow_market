import { importData } from "../utils/importData.js";
import { bitoniauCart } from "./bitoniau.js";
import { makeNode } from "../utils/makeNode.js";

bitoniauCart();

const getStorage = JSON.parse(localStorage.getItem("storageProducts")) || [];
console.log(getStorage);

let cart = [];

for (const element of getStorage) {
	const product = await importData(element.identifier);
	product.quantity = element.quantity;
	cart.push(product);
}

function showCart() {
	const container = document.getElementById("cart");
	container.innerHTML = "";

	if (cart.length == 0) {
		container.innerHTML = "<p>Panier vide</p>";
		document.getElementById("total").innerText = "0";
		return;
	}

	let table = document.createElement("table");
	table.innerHTML =
		"<tr><th>Image</th><th>Nom</th><th>Prix unitaire</th><th>Quantité</th><th>Sous-total</th><th>Action</th></tr>";

	let total = 0;

	for (let j = 0; j < cart.length; j++) {
		let item = cart[j];
		let sousTotal = item.price * item.quantity;
		total += sousTotal;

		const lineProduct = makeNode({ type: "tr", parent: table });
		const tdImage = makeNode({ type: "td", parent: lineProduct });
		const imageProduct = makeNode({
			type: "img",
			parent: tdImage,
			attributes: { src: item.thumbnail, width: "50" },
		});

		const tdTitle = makeNode({ type: "td", parent: lineProduct });
		tdTitle.textContent = item.title;
		const tdPrice = makeNode({ type: "td", parent: lineProduct });
		tdPrice.textContent = item.price + "$";
		const tdButtonsAndQuantity = makeNode({
			type: "td",
			parent: lineProduct,
		});
		const buttonDecrement = makeNode({
			type: "button",
			parent: tdButtonsAndQuantity,
			className: "btn-qty",
		});
		buttonDecrement.textContent = "-";
		buttonDecrement.addEventListener("click", () => decreaseQty(j));
		const quantity = makeNode({
			type: "span",
			parent: tdButtonsAndQuantity,
		});
		quantity.textContent = item.quantity;
		const buttonIncrement = makeNode({
			type: "button",
			parent: tdButtonsAndQuantity,
			className: "btn-qty",
		});
		buttonIncrement.textContent = "+";
		buttonIncrement.addEventListener("click", () => increaseQty(j));
		const tdSousTotal = makeNode({ type: "td", parent: lineProduct });
		tdSousTotal.textContent = sousTotal.toFixed(2) + "$";
		const tdRemove = makeNode({ type: "td", parent: lineProduct });
		const buttonRemove = makeNode({
			type: "button",
			parent: tdRemove,
			className: "td-remover",
		});
		buttonRemove.textContent = "Supprimer";
		buttonRemove.addEventListener("click", () => {
			removeFromCart(j);
			bitoniauCart();
		});
	}

	container.appendChild(table);
	document.getElementById("total").innerText = total.toFixed(2);
}

// +
function increaseQty(i) {
	if (cart[i].quantity < cart[i].stock) {
		cart[i].quantity++;
	} else {
		alert("Stock épuisé !");
	}
	storageDeMort();
	showCart();
}

// -
function decreaseQty(i) {
	if (cart[i].quantity > 1) {
		cart[i].quantity--;
	} else {
		cart.splice(i, 1);
	}
	storageDeMort();
	showCart();
}

// supprimer
function removeFromCart(i) {
	cart.splice(i, 1);
	storageDeMort();
	showCart();
}

function storageDeMort() {
	const storageProducts = cart.map((item) => ({
		identifier: item.id,
		quantity: item.quantity,
	}));
	localStorage.setItem("storageProducts", JSON.stringify(storageProducts));
}
showCart();
