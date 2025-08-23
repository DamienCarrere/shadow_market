import { importData } from "./importData.js";

export async function products(importingData = importData()) {
    const dealsForYou = document.querySelector(".dealsForYou")

        const data  = await importingData;
        data.products.forEach(element => {
            const productCard = document.createElement("div");
            const pictureDiv = document.createElement("div");
            const productBtn = document.createElement("button");
            const productImg = document.createElement("img");
            const productName = document.createElement("h3");
            const ProductPrice = document.createElement("h4");

            dealsForYou.appendChild(productCard)
            productCard.append(pictureDiv, productBtn, productName, ProductPrice)
            pictureDiv.appendChild(productImg);

            productCard.classList.add("productsCard")
            pictureDiv.classList.add("pictureCard")
            productBtn.id = "productButton";
            productBtn.ariaLabel = element.title;
            productImg.src = element.thumbnail;
            productImg.alt = `${element.title} ${element.brand}`;
            productImg.loading = "lazy";
            productName.textContent = element.title;
            ProductPrice.textContent = `$${element.price}`;

            productBtn.addEventListener("click", () => {
                console.log("UwU");
            })
        });
}
