import { importData } from "./importData.js";

export async function categories(importingData = importData()) {
    const data = await importingData;
    data.products.forEach(element => {
        console.log(element.category);
        const categories = [];
       
    });
    console.log(data);
}