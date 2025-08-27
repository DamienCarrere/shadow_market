const cardsSection = document.querySelector(".cardsSection");

export function createCard(title, price, brand, thumbnail, id) {
    const productCard = document.createElement("div");
    const pictureDiv = document.createElement("div");
    const productBtn = document.createElement("button");
    const productImg = document.createElement("img");
    const productName = document.createElement("h3");
    const productDescription = document.createElement("p");
    const ProductPrice = document.createElement("h4");

    cardsSection.appendChild(productCard);
    productCard.append(
        pictureDiv,
        productBtn,
        productName,
        productDescription,
        ProductPrice
    );
    pictureDiv.appendChild(productImg);

    productCard.classList.add("productsCard");
    pictureDiv.classList.add("pictureCard");
    productBtn.classList.add("productButton");
    productBtn.id = id;
    productBtn.ariaLabel = title;
    productImg.src = thumbnail;
    productImg.alt = `${title} ${brand}`;
    productImg.loading = "lazy";
    productName.textContent = title;
    productDescription.textContent = brand;
    ProductPrice.textContent = `$${price}`;

    productBtn.addEventListener("click", () => {
        console.log("UwU");
        window.location.href = `./pages/desc.html?id=${id}`;
    });
}

export function clearProducts() {
    cardsSection.innerHTML = "";
}
