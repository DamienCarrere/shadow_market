export function createCard(title, price, brand, thumbnail, parent) {
            const productCard = document.createElement("div");
            const pictureDiv = document.createElement("div");
            const productBtn = document.createElement("button");
            const productImg = document.createElement("img");
            const productName = document.createElement("h3");
            const ProductPrice = document.createElement("h4");

            parent.appendChild(productCard)
            productCard.append(pictureDiv, productBtn, productName, ProductPrice)
            pictureDiv.appendChild(productImg);

            productCard.classList.add("productsCard")
            pictureDiv.classList.add("pictureCard")
            productBtn.id = "productButton";
            productBtn.ariaLabel = title;
            productImg.src = thumbnail;
            productImg.alt = `${title} ${brand}`;
            productImg.loading = "lazy";
            productName.textContent = title;
            ProductPrice.textContent = `$${price}`;

            productBtn.addEventListener("click", () => {
                console.log("UwU");
            })
}