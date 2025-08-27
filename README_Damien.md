# Projet: Shadow Market
# Github: https://github.com/DamienCarrere/shadow_market.git


# Comment fonctionne le ficher descProduct.js:

## Cherche l'ID produit utilisé lors de la page précedente (page homeProduct)

## Chargement des données produit via un fichier JSON (fonction importData).


-----------------------------------------------------------------------------------------------

## Affichage des informations produit SI un ID à bien été trouvé depuis la page précédente :

### Titre et note ⭐

### Galerie d’images (image principale + miniatures cliquables)

### Prix et disponibilité en stock

### Date de livraison estimée calculée dynamiquement

### Description et caractéristiques (catégorie, marque, réduction)

-----------------------------------------------------------------------------------------------

## Gestion du panier :

### Sélection de la quantité disponible

### Ajout au panier avec mise à jour en localStorage

### Stock recalculé en temps réel après ajout

-----------------------------------------------------------------------------------------------

# Extras:

## Fonction bitoniauCart() qui permet de mettre à jour l’icône du panier (chiffre par type d'article pris).

## Fonction makeNode() qui permet de créer rapidement un élément dans le DOM

## Si aucun id n’est fourni dans l’URL, la page reste vide.

-----------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------

# Comment fonctionne le ficher desc.html:

## Il Utilise le même header et le même footer que index.html à la seule différence que le main est vide et que tout est généré dans le DOM depuis le fichier descProduct.js

-----------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------

Arborescence du Projet entier: {

    │
    ├── index.html                      <!--  Page Principale  -->
    ├── home.js                         <!--  Appel des fonctions initiales  -->
    ├── style.css                       <!--  Style pour la Page Principale et descProduct.js -->
    │
    ├── modules/                        <!--  dossier des modules JS  -->
    │   ├── bitoniau.js                 <!--  Petite icône en dessous de l'icône panier pour afficher le nombres de produits différents pris  -->
    │   ├── cart.js                     <!--  Panier   -->
    │   ├── categoriesMenu.js           <!--  Menu pour les catégories  -->
    │   ├── checkout.js                 <!--  Page pour l'achat des produits  -->
    │   ├── descProduct.js              <!--  Page de description des produits  -->
    │   ├── homeProducts.js             <!--  JS pour la page principale  -->
    │   ├── searchbar.js                <!--  Barre de recherche  -->
    │
    ├── pages/                          <!--  Pages HTML  -->
    │   ├── cart.html                   <!--  page HTML du panier  -->
    │   ├── checkout.html               <!--  page HTML du paiement  -->
    │   ├── desc.html                   <!--  page HTML de la description produit  -->
    │
    ├── styles/                         <!--  dossier des styles  -->
    │   ├── checkout.css                <!--  page css pour la page de paiement  -->
    │
    ├── utils/                          <!--  dossier des Utilitaires (petites fonctions pour se faciliter la vie)  -->
    │   ├── createCards.js              <!--  Crée des cartes selon le nombre d'articles dans le JSON  -->
    │   ├── importData.js               <!--  Importe les données du fichier  -->
    │   ├── makeNode.js                 <!--  Fonction pour créer un élément dans le DOM plus facilement  -->

}