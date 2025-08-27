import { makeNode } from "../utils/makeNode.js";
import { importData } from "../utils/importData.js";
import { bitoniauCart } from "./bitoniau.js";

bitoniauCart();

window.addEventListener("DOMContentLoaded", () => {
	const id = new URLSearchParams(window.location.search).get("id");

	if (id) {
		loadProduct(id);
	}
});

export async function loadProduct(productId) {
	const jsonContent = await importData(productId);

	const main = document.querySelector("main");

	const localStorageLoad =
		JSON.parse(localStorage.getItem("storageProducts")) || [];

	const productInStorage = localStorageLoad.find(
		(item) => item.identifier === jsonContent.id
	);
	const isInPanierOrNot = productInStorage ? productInStorage.quantity : 0;

	let stockActualise = jsonContent.stock - isInPanierOrNot;

	const section1 = makeNode({
		type: "section",
		id: "section-titre-images",
		parent: main,
	});
	makeNode({ type: "h1", content: jsonContent.title, parent: section1 });

	// Note
	makeNode({
		type: "span",
		className: "rating",
		content: `⭐ ${Number(jsonContent.rating).toFixed(1)}`,
		parent: section1,
	});

	// Div images
	const imagesDiv = makeNode({
		type: "div",
		className: "product-images",
		parent: section1,
	});

	const mainImg = makeNode({
		type: "img",
		parent: imagesDiv,
		attributes: {
			src: jsonContent.thumbnail || jsonContent.images[0],
			alt: jsonContent.title,
		},
	});

	// Thumbnails (les petites images)
	const thumbs = makeNode({
		type: "div",
		className: "thumbnails",
		parent: imagesDiv,
	});

	jsonContent.images.slice(0, 3).forEach((url, i) => {
		makeNode({
			type: "img",
			parent: thumbs,
			attributes: {
				src: url,
				alt: `${jsonContent.title} image numéro ${i + 1}`,
				style: "cursor:pointer",
			},
			events: {
				click: () => {
					mainImg.setAttribute("src", url);
					mainImg.setAttribute(
						"alt",
						`${jsonContent.title} image numéro ${i + 1}`
					);
				},
			},
		});
	});

	// Prix
	const section2 = makeNode({
		type: "section",
		id: "section-prix-buttons-achat",
		parent: main,
	});
	makeNode({
		type: "p",
		className: "price",
		content: `${jsonContent.price} USD`,
		parent: section2,
	});

	// Stock
	const resteEnStock = makeNode({
		type: "p",
		className: "stock",
		content: jsonContent.stock > 0 ? "En stock" : "Rupture de stock",
		parent: section2,
	});

	//Date de livraiso,
	const now = new Date();

	const arrival = new Date();
	arrival.setDate(now.getDate() + 4);

	const days = [
		"dimanche",
		"lundi",
		"mardi",
		"mercredi",
		"jeudi",
		"vendredi",
		"samedi",
	];
	const months = [
		"janvier",
		"février",
		"mars",
		"avril",
		"mai",
		"juin",
		"juillet",
		"août",
		"septembre",
		"octobre",
		"novembre",
		"décembre",
	];

	const dayName = days[arrival.getDay()];
	const date = arrival.getDate().toString().padStart(2, "0");
	const monthName = months[arrival.getMonth()];

	const formattedDate = `${dayName} ${date} ${monthName}`;

	makeNode({
		type: "p",
		className: "delivery",
		content: `Livraison gratuite à partir du ${formattedDate}.`,
		parent: section2,
	});
	// Actions
	const actions = makeNode({
		type: "div",
		className: "actions",
		parent: section2,
	});

	if (stockActualise > 0) {
		const selectionQuantite = makeNode({
			type: "select",
			parent: actions,
			className: "selection-quantite",
		});
		for (let i = 1; i <= stockActualise; i++) {
			makeNode({
				type: "option",
				parent: selectionQuantite,
				content: i,
				attributes: { value: i },
			});
		}
		const buttonAjouterPanier = makeNode({
			type: "button",
			className: "btn button-ajouter-panier",
			content: "Ajouter au panier",
			parent: actions,
			events: {
				click: () => {
					const getStorage =
						JSON.parse(localStorage.getItem("storageProducts")) ||
						[];
					const isProductSavedInLocalStorage = getStorage.find(
						(p) => p.identifier === jsonContent.id
					);

					if (isProductSavedInLocalStorage) {
						isProductSavedInLocalStorage.quantity += Number(
							selectionQuantite.value
						);
					} else {
						getStorage.push({
							identifier: jsonContent.id,
							quantity: Number(selectionQuantite.value),
						});
					}
					localStorage.setItem(
						"storageProducts",
						JSON.stringify(getStorage)
					);
					stockActualise -= Number(selectionQuantite.value);
					if (stockActualise > 0) {
						resteEnStock.textContent = "En stock";
						selectionQuantite.innerHTML = "";
						for (let i = 1; i <= stockActualise; i++) {
							makeNode({
								type: "option",
								parent: selectionQuantite,
								content: i,
								attributes: { value: i },
							});
						}
					} else {
						resteEnStock.textContent = "Rupture de stock";
						resteEnStock.style.color = "red";
						selectionQuantite.disabled = true;
						selectionQuantite.value = 0;
						buttonAjouterPanier.disabled = true;
					}
					bitoniauCart();
				},
			},
		});
		makeNode({
			type: "button",
			className: "btn button-achat-click",
			content: "Acheter en 1 clic",
			parent: actions,
		});
	} else {
		resteEnStock.textContent = "Rupture de stock";
		resteEnStock.style.color = "red";
	}

	const section3 = makeNode({
		type: "section",
		id: "section-description",
		parent: main,
	});
	// Description
	makeNode({
		type: "div",
		className: "description",
		content: jsonContent.description,
		parent: section3,
	});

	// Features
	const features = makeNode({
		type: "div",
		className: "features",
		parent: section3,
	});
	makeNode({
		type: "h3",
		content: "Caractéristiques principales :",
		parent: features,
	});
	const ul = makeNode({ type: "ul", parent: features });

	[
		`Catégorie : ${jsonContent.category}`,
		`Marque : ${jsonContent.brand}`,
		`Réduction : ${jsonContent.discountPercentage}%`,
	].forEach((txt) => {
		makeNode({ type: "li", content: txt, parent: ul });
	});
}
