
main()

async function main() {
    const products = await getProducts();
    // Boucle pour afficher chaque produit dans une carte/template
    for (product of products) {
        displayProduct(product);
    }
}

//Fonction pour obtenir la liste des produits
function getProducts() {
    return fetch("https://ab-p5-api.herokuapp.com/api/cameras")
        .then(function(httpBodyResponse) {
            return httpBodyResponse.json();
        })
        .then(function(products) {
            return products;
        })
        .catch(function(error){
            alert(error);
        })
}

//Fonction pour afficher un produit selon ses informations
function displayProduct(product) {

    //template qui contiendra la trame d'un produit
    const templateElement = document.getElementById("templateProduct");
    
    //clone du template pour chaque produit
    const cloneElement = document.importNode(templateElement.content, true);

    cloneElement.getElementById("productImg").src = product.imageUrl;
    cloneElement.getElementById("productName").textContent = product.name;
    cloneElement.getElementById("productDescription").textContent = product.description;
    cloneElement.getElementById("productPrice").textContent = product.price /100 + " €";
    cloneElement.getElementById("id").textContent = product._id;
    cloneElement.getElementById("productUrl").href = `/product.html?id=${product._id}`;

    document.getElementById("main").appendChild(cloneElement);
}

