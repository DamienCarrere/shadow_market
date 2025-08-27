export function bitoniauCart() {
    const localCart = JSON.parse(localStorage.getItem("storageProducts")) || [];
    const bitoniauElem = document.querySelector(".cartCounter");
    let counterElemCart = 0;

    bitoniauElem.style.display = "none";
    localCart.forEach(() => {
        counterElemCart++;
        if (window.innerWidth >= 1000) {
            if (counterElemCart > 0) {
                bitoniauElem.textContent = counterElemCart;
                bitoniauElem.style.display = "flex";
            } else {
                bitoniauElem.style.display = "none";
            }
            // Responsive bitoniau
        } else {
            const liBottom = document.querySelector("#liCart");
            const bitoMobile = document.createElement("span");
            bitoMobile.classList.add("cartCounter");
            liBottom.appendChild(bitoMobile);
            if (counterElemCart > 0) {
                bitoMobile.textContent = counterElemCart;
                bitoMobile.style.display = "flex";
            } else {
                bitoMobile.style.display = "none";
            }
        }
    });
}
