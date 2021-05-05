// Déclaration des variables 
let cartNumber = document.getElementById("cartNumber");


onLoadNumberInCart();

// Fonction principale 
async function main() {
    const products = await getProducts();
    // Boucle pour afficher chaque produit dans une carte/template
    for (product of products) {
        displayProduct(product);
    }
}

// Fonction pour obtenir la liste des produits 
function getProducts() {
    return fetch("https://ab-p5-api.herokuapp.com/api/cameras/")
        .then(function(httpBodyResponse) {
            return httpBodyResponse.json();
        })
        .then(function(products) {
            return products;
        })
        .catch(() => {
            error();
            product.remove()
        })
}

//Fonction pour afficher un produit selon ses informations
function displayProduct(product) {
    // Template qui contiendra la trame d'un produit
    const templateElement = document.getElementById("templateProduct");
    
    // Clone du template pour chaque produit
    const cloneElement = document.importNode(templateElement.content, true);

    // Selection des éléments qui seront changés en fonction de l'article
    cloneElement.getElementById("productImg").src = product.imageUrl;
    cloneElement.getElementById("productName").textContent = product.name;
    cloneElement.getElementById("productDescription").textContent = product.description;
    cloneElement.getElementById("productPrice").textContent = product.price /100 + " €";
    cloneElement.getElementById("id").textContent = product._id;
    cloneElement.getElementById("productUrl").href = `/product.html?id=${product._id}`;

    // Applique le "clone" à la trame
    document.getElementById("main").appendChild(cloneElement);
}

// Appel des fonctions 
main()

