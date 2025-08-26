import { importData } from "../utils/importData.js";
import { createCard, clearProducts } from "../utils/createCards.js";

export async function categories(importingData = importData()) {
    const data = await importingData;
    const menuBtn = document.querySelector("#burdgerMenuBtn");
    const burgerMenu = document.querySelector("#bottomMenu");
    const categoriesListL = document.querySelector("#categoriesListLarge");
    const categoriesListB = document.querySelector("#categoriesList");

    menuBtn.addEventListener("click", () => {
        if (window.getComputedStyle(burgerMenu).display === "none") {
            burgerMenu.style.display = "";
        } else {
            burgerMenu.style.display = "none";
        }
    });
    const categories = [];
    const titleSection = document.querySelector("#titleSectionCard");
    data.products.forEach((element) => {
        if (!categories.includes(element.category)) {
            categories.push(element.category);
        }
    });
    categories.forEach((element) => {
        const list = document.createElement("li");
        const largeList = document.createElement("li");
        const link = document.createElement("a");
        const largeLink = document.createElement("a");
        categoriesListL.appendChild(largeList);
        categoriesListB.appendChild(list);
        list.appendChild(link);
        largeList.appendChild(largeLink);

        link.href = "#";
        link.value = element;
        link.textContent = element;
        link.addEventListener("click", () => {
            clearProducts();
            burgerMenu.style.display = "none";
            titleSection.textContent = `Categories : ${element}`;
            const results = data.products.filter((e) =>
                e.category.includes(element)
            );
            results.forEach((products) => {
                createCard(
                    products.title,
                    products.price,
                    products.brand,
                    products.thumbnail,
                    products.id
                );
            });
        });
        largeLink.href = "#";
        largeLink.value = element;
        largeLink.textContent = element;
        largeLink.addEventListener("click", () => {
            clearProducts();
            titleSection.textContent = `Categories : ${element}`;
            const results = data.products.filter((e) =>
                e.category.includes(element)
            );
            results.forEach((products) => {
                createCard(
                    products.title,
                    products.price,
                    products.brand,
                    products.thumbnail,
                    products.id
                );
            });
        });
    });
}
