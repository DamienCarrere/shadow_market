export function bitoniauCart() {
    const localCart = JSON.parse(localStorage.getItem("storageProducts")) || [];
    const bitoniauElem = document.querySelector(".cartCounter");
    let counterElemCart = 0;
    bitoniauElem.style.display = "none";
    localCart.forEach(() => {
        counterElemCart++;
        if (counterElemCart > 0) {
            bitoniauElem.textContent = counterElemCart;
            bitoniauElem.style.display = "flex";
        } else {
            bitoniauElem.style.display = "none";
        }
    });
}
