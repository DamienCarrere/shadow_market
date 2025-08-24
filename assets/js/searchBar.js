import { importData } from "./importData.js";
import { createCard } from "./createCards.js";

export async function search (importingData = importData()) {
    const data = await importingData;
    const parentSearchBar = document.querySelector("nav")
    const searchBar = document.querySelector("#searchBar");
    const cancelBtn = document.querySelector("#cancelBtn");
    const titleSection = document.querySelector("#titleSectionCard")


    searchBar.addEventListener("focus", () => {
    const forYou = document.querySelector(".dealsForYou");
    const searchSection = document.querySelector(".searchSection");
    console.log("I'm focusing UwU")
    cancelBtn.style.display = "";
    parentSearchBar.classList.add("inSearch");
    searchBar.addEventListener("input", () => {
        forYou.innerHTML = "";
        const search = searchBar.value.toLowerCase();
        console.log(search);
        if (search !== ""){
            titleSection.textContent = `You are looking for : ${search}`;
        }else {
            titleSection.textContent = "For You";
        }
        const results = data.products.filter(element => element.title.toLowerCase().includes(search));
        searchSection.innerHTML = "";
        results.forEach(element => {
            createCard(element.title, element.price, element.brand, element.thumbnail, searchSection)
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
