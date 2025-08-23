export function search () {
    const parentsearchBar = document.querySelector("#topsearchBar")
    const searchBar = document.querySelector("#searchBar");
    const cancelBtn = document.querySelector("#cancelBtn");
    searchBar.addEventListener("focus", () => {
    console.log("I'm focusing UwU")

    cancelBtn.style.display = "";
    searchBar.addEventListener("input", () => {
        console.log("J'ecris des chose UwU")

    })

    searchBar.addEventListener("keydown", (k) => {
        if (k.key === "Enter" && searchBar.value !== ""){
            console.log("Enter UwU " + searchBar.value)
        }
        
    })

    searchBar.addEventListener("focusout", () => {
            cancelBtn.style.display = "none";
    })
})

}