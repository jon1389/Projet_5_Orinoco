let productName = document.getElementById("productName");
let productImg = document.getElementById("productImg");
let lense = document.getElementById("lense");
let price = document.getElementById("price");
let addCart = document.getElementById("addCart");
let quantity = document.getElementById("quantity");
let cartNumber = document.getElementById("cartNumber");
let idCamera

const mainUrl = "https://ab-p5-api.herokuapp.com/api/cameras/";

class MyProduct {
    constructor(idCamera, selectedLenses, itemQuantity) {
        this.idCamera = idCamera;
        this.selectedLenses = selectedLenses;
        this.itemQuantity = itemQuantity;
    }
}

async function getCameras() {
    return fetch(mainUrl)
    .then((response) => response.json ())
    .then((response) => {
        let cameras = response;
        // console.log(cameras); // Affiche l'ensemble des produits
        getIdUrlAndCard(cameras);
    })
    .catch(function(error){
        alert(error);
        let errorDiv = document.querySelector(".error")
        errorDiv.textContent = "Une erreur est survenu, veuillez revenir plus tard.";
    })
}

/////////////////////////////APPEL DE LA FONCTION/////////////////////////////////
getCameras();
onLoadNumberInCart()


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

getCameraItem();

// Mise à jour de la carte produit
function updateCameraCard (choosenCamera) {
    // console.log(choosenCamera);
    productName.textContent = choosenCamera.name;
    productImg.src = choosenCamera.imageUrl;
    price.textContent = "Prix unitaire : " + choosenCamera.price/100 + " €";
    
    // Boucle qui affiche chaque élément dans la liste déroulante 
    let lenses = choosenCamera.lenses;
    for (let option = 0; option < lenses.length; option++) {
        // console.log(lenses[option]); // affiche la valeur de l'index
        // console.log(option); // affiche l'index
        lense.innerHTML += '<option class="lenseOption" value=' + option + ' >'+ lenses[option] + '</option>';
    };
    addToCart(addCart, choosenCamera);
};



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
        // console.log(itemInCart);
        // console.log(cartContent);
        // console.log(product);
        localStorage.setItem("cartContent", JSON.stringify(cartContent));
        // console.log(JSON.stringify(cartContent));
        numberInCart()
    });
    goToCart.addEventListener("click", () => {
        window.location.href = "cart.html"
    })
};

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
        // let itemNumber = cartContent[index].itemQuantity;
        // console.log(itemNumber);
    }
    console.log(itemNumber);
    for (let i = 0; i < itemNumber.length; i++) {
        totalItemNumber += itemNumber[i];
    }
    console.log(totalItemNumber);
    localStorage.setItem("totalItemNumber", totalItemNumber)
    if(totalItemNumber){
        cartNumber.textContent = totalItemNumber;
    }
}

function onLoadNumberInCart() {
    let totalItemNumber = localStorage.getItem("totalItemNumber");
    if(totalItemNumber){
        cartNumber.textContent = totalItemNumber;
    }
    else{
        cartNumber.textContent = 0;
    }
}