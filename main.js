//produit
const products = [];

let product1 = JSON;parseFloat(localStorage.getIteam("cart")) || [];
//products.json 
fetch("products.json")
.then (function(response) {
    return response.json();
 })
.then (function(data){
products= data;
showProducts();
showCart();
})
;catch(function(error){
    console.log("error");
});
//panier
//let card = JSONparce(localStromage.getIteam("cart")) || [];
