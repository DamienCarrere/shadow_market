export function products() {
    const dealsForYou = document.querySelector(".dealsForYou")

fetch('https://dummyjson.com/products')
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
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
            productImg.src = element.thumbnail;
            productName.textContent = element.title;
            ProductPrice.textContent = `$${element.price}`;

            productBtn.addEventListener("click", () => {
                console.log("UwU");
            })
        });
    })
}