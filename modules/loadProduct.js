import { makeNode } from "../utils/makeNode.js";
import { importData } from "../utils/importData.js";

export async function loadProduct(productId) {
	const jsonContent = await importData(productId);

	const main = document.querySelector("main");
	main.innerHTML = "";

	makeNode({ type: "h1", content: jsonContent.title, parent: main });

	// Note (grosse flemme de mettre plusieus étoiles avec les virgules)
	makeNode({
		type: "span",
		className: "rating",
		content: `⭐ ${Number(jsonContent.rating).toFixed(1)}`,
		parent: main,
	});

	// Div images
	const imagesDiv = makeNode({
		type: "div",
		className: "product-images",
		parent: main,
	});

	const mainImg = makeNode({
		type: "img",
		parent: imagesDiv,
		attributes: {
			src: jsonContent.thumbnail || jsonContent.images[0],
			alt: jsonContent.title,
		},
	});

	// Thumbnails (les petites iomages de merde)
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
	makeNode({
		type: "p",
		className: "price",
		content: `${jsonContent.price} USD`,
		parent: main,
	});

	// Stock
	makeNode({
		type: "p",
		className: "stock",
		content: jsonContent.stock > 0 ? "En stock" : "Rupture de stock",
		parent: main,
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
		parent: main,
	});
	// Actions
	const actions = makeNode({
		type: "div",
		className: "actions",
		parent: main,
	});
	makeNode({
		type: "button",
		className: "btn btn-cart",
		content: "Ajouter au panier",
		parent: actions,
	});
	makeNode({
		type: "button",
		className: "btn btn-buy",
		content: "Acheter en 1 clic",
		parent: actions,
	});

	// Description
	makeNode({
		type: "div",
		className: "description",
		content: jsonContent.description,
		parent: main,
	});

	// Features
	const features = makeNode({
		type: "div",
		className: "features",
		parent: main,
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
