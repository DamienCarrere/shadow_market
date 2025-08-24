import { importData } from "../utils/importData.js";
import { createCard } from "../utils/createCards.js";

export async function products(importingData = importData()) {
        const data  = await importingData;
        data.products.forEach(element => {
            createCard(element.title, element.price, element.brand, element.thumbnail, element.id);
        });
}

