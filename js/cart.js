const mainUrl = "https://ab-p5-api.herokuapp.com/api/cameras/";
const arrayPrice = [];
let products = [];

document.getElementById("cartNumber").defaultValue = "0"

onLoadNumberInCart()

async function getCart() {
    return fetch(mainUrl)
    .then((response) => response.json ())
    .then((response) => {
        let cameras = response;
        let cartContent = JSON.parse(localStorage.getItem("cartContent")) || {};
        for (i = 0; i < cartContent.length; i++) {
            let itemCamera = cameras.find(cameras => cameras['_id'] == cartContent[i].idCamera);
            // console.log(itemCamera);
            itemsDisplayInCart(itemCamera, cartContent)
            addItemPrice(itemCamera);
            addIdProducts(cartContent);
        }
        totalPriceOrder(arrayPrice, cartContent);
        let removeCart = document.getElementById("removeCart");
        let cartTableBody = document.getElementById("cartTableBody");
        removeCart.addEventListener('click', () => {
            localStorage.clear(cartContent);
            cartTableBody.remove(cartTableBody);
            document.getElementById('cartTableTotalPrice').textContent = 0 +" €";
            onLoadNumberInCart()
        })
    })
    .catch(function(error){
        alert(error);
        let errorDiv = document.querySelector(".error")
        errorDiv.textContent = "Une erreur est survenu, veuillez revenir plus tard.";
    })
}

getCart()

//Tableau de prix des articles choisis
function addItemPrice(itemCamera) {
    let itemPrice = itemCamera.price;
    arrayPrice.push(itemPrice);
    // console.log(itemPrice);
    // console.log(arrayPrice);
}


//Ajout des id des articles choisis dans le tableau products
function addIdProducts(cartContent) {
    products.push(cartContent[i].idCamera);
    // console.log(cartContent[i].idCamera);
}

//Prix total de la commande 
function totalPriceOrder(arrayPrice, cartContent) {
    let totalPrice = document.getElementById('cartTableTotalPrice');
    let total = 0;
    for (i = 0; i < arrayPrice.length; i++) {
        total = total + (arrayPrice[i]*cartContent[i].itemQuantity);
        totalPrice.textContent = total/100 + "€";
        //Stockage du prix dans le localStorage pour la page de confirmation
        // localStorage.setItem("totalOrder", JSON.stringify(total));
    }
}

function itemsDisplayInCart(itemCamera, cartContent) {
    //template qui contiendra la trame d'un produit
    const templateCart = document.getElementById("templateCart");
    //clone du template pour chaque produit
    const cloneCart = document.importNode(templateCart.content, true);

    cloneCart.getElementById("cameraName").textContent = itemCamera.name;
    cloneCart.getElementById("cameraLense").textContent = cartContent[i].selectedLenses;
    cloneCart.getElementById("cameraQuantity").textContent = cartContent[i].itemQuantity;
    cloneCart.getElementById("cameraPrice").textContent = itemCamera.price /100 + " €";
    cloneCart.getElementById("cameraTotalPrice").textContent = (itemCamera.price /100) * cartContent[i].itemQuantity + " €";

    document.getElementById("cartTableBody").appendChild(cloneCart);
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




class ClientData {
    constructor(firstName, lastName, address, city, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email;
    }
}

async function postForm(dataToSend) {
    return fetch(mainUrl+"order", {
        method: "POST",
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
        },
        body: dataToSend
    })
    .then((response) => response.json())
    .then((response) => {
        getOrderConfirmationId(response)
        window.location.href = "confirmation.html"
    })
    .catch(function(error){
        alert(error);
        let errorDiv = document.querySelector(".error")
        errorDiv.textContent = "Une erreur est survenu, veuillez revenir plus tard.";
    })
}

