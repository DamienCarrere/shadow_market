import { importData } from "../utils/importData.js";
import { createCard, clearProducts} from "../utils/createCards.js";

const localHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
export async function search (importingData = importData()) {
    const data = await importingData;
    const parentSearchBar = document.querySelector("nav");
    const searchBar = document.querySelector("#searchBar");
    const cancelBtn = document.querySelector("#cancelBtn");
    const titleSection = document.querySelector("#titleSectionCard");
    const searchIcon = document.querySelector("#searchIcon");
    const history = [];
    let search;

    searchBar.addEventListener("focus", () => {
    cancelBtn.style.display = "";
    parentSearchBar.classList.add("inSearch");
    searchIcon.style.marginTop = "0";
    searchBar.addEventListener("input", () => {
        search = searchBar.value.toLowerCase();
        if (search !== ""){
            titleSection.textContent = `You are looking for : ${search}`;
            titleSection.style.fontSize = "18px"
        } else {
            titleSection.textContent = "For You";
            titleSection.style.fontSize = ""
        }
        const results = data.products.filter(element => element.title.toLowerCase().includes(search));
        clearProducts()
        results.forEach(element => {
            createCard(element.title, element.price, element.brand, element.thumbnail)
        });
    });
    })

    cancelBtn.addEventListener("click", () => {
            exitBar()
        })

    searchBar.addEventListener("keydown", (k) => {
        if (k.key === "Enter" && searchBar.value !== ""){
            history.push(search);
            localStorage.setItem("searchHistory", JSON.stringify(history));
        }
        
    })

    searchBar.addEventListener("focusout", () => {
            cancelBtn.style.display = "none";
            parentSearchBar.classList.remove("inSearch");
            searchIcon.style.marginTop = "0.8rem";
    })

    function exitBar() {
    cancelBtn.style.display = "none";
            searchIcon.style.marginTop = "0.8rem";
            parentSearchBar.classList.remove("inSearch");
            searchBar.value = "";
            search = "";
            titleSection.textContent = "For You";
            titleSection.style.fontSize = ""
            clearProducts()
            data.products.forEach(element => {
                createCard(element.title, element.price, element.brand, element.thumbnail)
            });
}
}

