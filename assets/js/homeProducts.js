import { importData } from "./importData.js";
import { createCard } from "./createCards.js";

export async function products(importingData = importData()) {
        const data  = await importingData;
        data.products.forEach(element => {
            const dealsForYou = document.querySelector(".dealsForYou")
            createCard(element.title, element.price, element.brand, element.thumbnail, dealsForYou)
        });
}

