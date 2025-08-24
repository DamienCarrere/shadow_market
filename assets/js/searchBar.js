import { importData } from "./importData.js";
import { createCard, clearProducts} from "./createCards.js";

export async function search (importingData = importData()) {
    const data = await importingData;
    const parentSearchBar = document.querySelector("nav")
    const searchBar = document.querySelector("#searchBar");
    const cancelBtn = document.querySelector("#cancelBtn");
    const titleSection = document.querySelector("#titleSectionCard")


    searchBar.addEventListener("focus", () => {
    parentSearchBar.classList.add("inSearch");
    searchBar.addEventListener("input", () => {
        const search = searchBar.value.toLowerCase();
        if (search !== ""){
            titleSection.textContent = `You are looking for : ${search}`;
        }else {
            titleSection.textContent = "For You";
        }
        const results = data.products.filter(element => element.title.toLowerCase().includes(search));
        clearProducts()
        results.forEach(element => {
            createCard(element.title, element.price, element.brand, element.thumbnail)
        });
    });
    })

    searchBar.addEventListener("keydown", (k) => {
        if (k.key === "Enter" && searchBar.value !== ""){
        }
        
    })

    searchBar.addEventListener("focusout", () => {
            cancelBtn.style.display = "none";
            parentSearchBar.classList.remove("inSearch");
    })
}
