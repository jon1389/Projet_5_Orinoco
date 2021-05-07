// Déclaration des variables //
let productName = document.getElementById("productName");
let productImg = document.getElementById("productImg");
let lense = document.getElementById("lense");
let price = document.getElementById("price");
let addCart = document.getElementById("addCart");
let quantity = document.getElementById("quantity");
let cartNumber = document.getElementById("cartNumber");
let product = document.getElementById("product");
let mainUrl = "https://ab-p5-api.herokuapp.com/api/cameras/";

// Création d'une classe pour structurer le tableau product
class MyProduct {
    constructor(idCamera, selectedLenses, itemQuantity) {
        this.idCamera = idCamera;
        this.selectedLenses = selectedLenses;
        this.itemQuantity = itemQuantity;
    }
}

// Requête API pour obtenir les informations des produits
async function getCameras() {
    return fetch(mainUrl)
    .then((response) => response.json ())
    .then((response) => {
        let cameras = response;
        // console.log(cameras); // Affiche l'ensemble des produits
        getIdUrlAndCard(cameras);
    }) 
    .catch(() => {
        error();
        product.remove();
    })
}

// Récupération de l'Id dans l'url
function getIdUrlAndCard(cameras) {
    let urlSearch = new URLSearchParams(window.location.search);
    idCamera = urlSearch.get('id'); 
    // console.log(idCamera); //Affiche l'id de la l'article choisie
    getCameraItem(cameras, idCamera);
};

// Récupération de la caméra correspondant à l'Id
function getCameraItem(cameras, idCamera) {
    let choosenCamera = cameras.find(cameras => cameras["_id"] == idCamera);
    // console.log(choosenCamera);
    updateCameraCard(choosenCamera, idCamera)
};

// Mise à jour de la carte produit
function updateCameraCard (choosenCamera) {
    productName.textContent = choosenCamera.name;
    productImg.src = choosenCamera.imageUrl;
    price.textContent = "Prix unitaire : " + choosenCamera.price/100 + " €";
    
    // Boucle qui affiche chaque lentille dans la liste déroulante 
    let lenses = choosenCamera.lenses;
    for (let option = 0; option < lenses.length; option++) {
        // console.log(lenses[option]); // Affiche la valeur de l'index
        // console.log(option); // Affiche l'index
        lense.innerHTML += '<option class="lenseOption" value=' + option + ' >'+ lenses[option] + '</option>';
    };
    addToCart(addCart, choosenCamera);
};

// Fonction d'ajout du produit au panier
function addToCart(addCart) {
    let goToCart = document.getElementById("goToCart");
    let itemQuantity = 1;
    addCart.addEventListener('click', () => {
        let cartContent = JSON.parse(localStorage.getItem("cartContent"));
        let selectedLenses = lense.options[lense.selectedIndex].text;
        if (cartContent === null) {
            cartContent = [];
        }
        let product = new MyProduct(idCamera, selectedLenses, itemQuantity);
        let itemInCart = cartContent.find(cartContent => cartContent["idCamera"] == product.idCamera && cartContent["selectedLenses"] == product.selectedLenses)
        if(itemInCart){
            itemInCart.itemQuantity++;
        }
        else{
            cartContent.push(product);
        }
        // console.log(itemInCart); // Affiche la caméra ajoutée dans le panier
        // console.log(cartContent); // Affiche le contenu du panier sous forme d'array
        localStorage.setItem("cartContent", JSON.stringify(cartContent));
        // console.log(JSON.stringify(cartContent)); // Affiche le contenu du panier sous forme de chaîne JSON
        numberInCart()
    });
    goToCart.addEventListener("click", () => {
        window.location.href = "cart.html"
    })
};

// Fonction qui permet d'obtenir la quantité de produit dans le panier
function numberInCart(){
    let totalItemNumber = 0;
    let cartNumber = document.getElementById("cartNumber");
    let cartContent = JSON.parse(localStorage.getItem("cartContent"));
    let itemNumber = [];
    if (cartContent === null) {
        cartContent = [];
    }
    for (let index = 0; index < cartContent.length; index++) {
        itemNumber.push(cartContent[index].itemQuantity);
        // console.log(itemNumber);
    }
    // console.log(itemNumber);
    for (let i = 0; i < itemNumber.length; i++) {
        totalItemNumber += itemNumber[i];
    }
    // console.log(totalItemNumber);
    localStorage.setItem("totalItemNumber", totalItemNumber)
    if(totalItemNumber){
        cartNumber.textContent = totalItemNumber;
    }
}

// Appel des fonctions 
getCameras();
onLoadNumberInCart()