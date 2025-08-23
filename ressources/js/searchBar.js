
export function search () {
    const searchBar = document.querySelector("#searchBar");
    const nav = document.querySelector("nav");
    searchBar.addEventListener("focus", () => {
    console.log("I'm focusing UwU")
    const cancelBtn = document.createElement("button");

    cancelBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>`;
    searchBar.before(cancelBtn);
    nav.classList.add("inSearch")
        
    searchBar.addEventListener("focusout", () => {
            nav.removeChild(cancelBtn);
            nav.classList.remove("inSearch")
    })
})


}