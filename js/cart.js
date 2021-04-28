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
        console.log(cartContent)
        removeCart.addEventListener('click', () => {
            if(cartContent) {
                cartConfirmation()
                onLoadNumberInCart()
            }
        })
    })
    .catch(function(error){
        alert(error);
        let errorDiv = document.querySelector(".error")
        errorDiv.textContent = "Une erreur est survenu, veuillez revenir plus tard.";
    })
}

function cartConfirmation(cartContent){
    let cartTableBody = document.getElementById("cartTableBody");
    if(confirm("Êtes-vous sûr de vouloir vider le panier ?")){
        localStorage.clear(cartContent);
        cartTableBody.remove(cartTableBody);
        document.getElementById('cartTableTotalPrice').textContent = 0 +" €";
    }
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
    console.log(cartContent);
}

//Prix total de la commande 
function totalPriceOrder(arrayPrice, cartContent) {
    let totalPrice = document.getElementById('cartTableTotalPrice');
    let total = 0;
    for (i = 0; i < arrayPrice.length; i++) {
        total = total + (arrayPrice[i]*cartContent[i].itemQuantity);
        totalPrice.textContent = total/100 + "€";
        // Stockage du prix dans le localStorage pour la page de confirmation
        localStorage.setItem("totalOrder", JSON.stringify(total));
    }
}

function itemsDisplayInCart(itemCamera, cartContent) {
    //template qui contiendra la trame d'un produit
    const templateCart = document.getElementById("templateCart");
    //clone du template pour chaque produit
    const cloneCart = document.importNode(templateCart.content, true);

    cloneCart.getElementById("cameraImg").src = itemCamera.imageUrl;
    console.log(itemCamera.imageUrl)
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

console.log(arrayPrice);

class ClientData {
    constructor(firstName, lastName, address, city, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email;
    }
}

function getOrderConfirmationId(responseId) {
    let orderId = responseId.orderId;
    console.log(orderId);
    localStorage.setItem("orderConfirmationId", orderId);
}

//Récupération des données du formulaire dans l'objet contact
function getForm() {
    let firstname = document.getElementById('firstName').value;
    let lastname = document.getElementById('lastName').value;
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    let email = document.getElementById('email').value;
    contact = new ClientData(firstname, lastname, address, city, email);
}

async function postForm(dataToSend) {
    try {
        let response = await fetch(mainUrl+"order", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: dataToSend,
        });
        if (response.ok) {
            let responseId = await response.json();
            getOrderConfirmationId(responseId);
            window.location.href = "confirmation.html";
        } else {
            console.error('Retour du serveur : ', response.status);
        }
    } catch (e) {
        console.log(e);
    }
}

//Validation de la commande et envoie de l'objet contact et du tableau product à l'API
function confirmationOrder() {
        getForm();
        dataToSend = JSON.stringify({ contact, products });
        console.log(dataToSend);
        postForm(dataToSend);
}

//Validation des données du formulaire
function validateForm() {
    let buttonValidation = document.getElementById('validateButton');
    buttonValidation.addEventListener('click', function () {
        let firstname = document.getElementById('firstName').value;
        let lastname = document.getElementById('lastName').value;
        let address = document.getElementById('address').value;
        let city = document.getElementById('city').value;
        let email = document.getElementById('email').value;
        localStorage.setItem("firstname", firstname);
        if (firstname, lastname, address, city, email != "" && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            confirmationOrder();
            return true;
        } else {
            alert("Saisissez tous les champs et entrez un email valide");
            return false;
        }
    })
}

validateForm()