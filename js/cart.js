// Déclaration des variables
const mainUrl = "https://ab-p5-api.herokuapp.com/api/cameras/";
const arrayPrice = [];
let products = [];
let contact = {};
let cartTable = document.getElementById("cartTable");
let clientForm = document.querySelector(".clientForm");

document.getElementById("cartNumber").defaultValue = "0"

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
        let emptyCart = document.getElementById("emptyCart");
        let returnToHome = document.getElementById("returnToHome");
        // console.log(cartContent.length)
        removeCart.addEventListener('click', () => {
            if(cartContent.length) {
                emptyCart.addEventListener('click', () => {
                    localStorage.clear(cartContent);
                    cartTableBody.remove(cartTableBody);
                    cartContent.length=0;
                    document.getElementById('cartTableTotalPrice').textContent = 0 +" €";
                    onLoadNumberInCart();
                })
            }
            else{
                removeCart.dataset.target = "#cartIsEmptyModal";
                onLoadNumberInCart();
                returnToHome.addEventListener('click', () =>{
                    window.location.href = "index.html"
                })
            }
        })
    })
    .catch(() => {
        error();
        cartTable.remove();
        clientForm.remove()
    })
}


// Ajout du prix de l'article dans le tableau 
function addItemPrice(itemCamera) {
    let itemPrice = itemCamera.price;
    arrayPrice.push(itemPrice);
    // console.log(itemPrice);
    // console.log(arrayPrice);
}


// Ajout des id des articles choisis dans le tableau products
function addIdProducts(cartContent) {
    products.push(cartContent[i].idCamera);
    // console.log(cartContent[i].idCamera);
    // console.log(cartContent);
}

// Calcule et affiche le total de la commande 
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

// Fonction qui affiche chaque article ajouté au panier 
function itemsDisplayInCart(itemCamera, cartContent) {

    //template qui contiendra la trame d'un produit
    const templateCart = document.getElementById("templateCart");
    
    //clone du template pour chaque produit
    const cloneCart = document.importNode(templateCart.content, true);

    cloneCart.getElementById("cameraImg").src = itemCamera.imageUrl;
    cloneCart.getElementById("cameraName").textContent = itemCamera.name;
    cloneCart.getElementById("cameraLense").textContent = cartContent[i].selectedLenses;
    cloneCart.getElementById("cameraQuantity").textContent = cartContent[i].itemQuantity;
    cloneCart.getElementById("cameraPrice").textContent = itemCamera.price /100 + " €";
    cloneCart.getElementById("cameraTotalPrice").textContent = (itemCamera.price /100) * cartContent[i].itemQuantity + " €";

    document.getElementById("cartTableBody").appendChild(cloneCart);
}

///////// Partie formulaire client ///////// 

// Déclaration des variables
let form = document.getElementById("form");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");
let successElement = []; 
let validateButton = document.getElementById("validateButton");

// Création d'une classe pour structurer le tableau Client
class ClientData {
    constructor(firstName, lastName, address, city, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email;
    }
}

// Vérification des champs du formulaire
form.addEventListener('click', (e) => {
    e.preventDefault();
    
    firstName.addEventListener('input',() =>{
        checkAlpha(firstName)
        localStorage.setItem("firstName", firstName.value);
    });
    
    lastName.addEventListener('input',() =>{
        checkAlpha(lastName);
    });
    
    address.addEventListener('input',() =>{
        checkAlphaNum(address);
    });
    
    city.addEventListener('input',() =>{
        checkCity(city);
    });
    
    email.addEventListener('input',() =>{
        checkEmail(email);
    });
    
    // Déclaration des variables qui seront entrées dans le tableau contact
    let firstNameValue = firstName.value.trim(); //trim pour supprimer les espaces
    let lastNameValue = lastName.value.trim();
    let addressValue = address.value.trim();
    let cityValue = city.value.trim();
    let emailValue = email.value.trim();
    contact = new ClientData(firstNameValue, lastNameValue, addressValue, cityValue, emailValue);
    // console.log(contact);
    // console.log(contact.firstName)
    
    // Variable qui selectionne les éléments qui obtiendront la classe "success"
    let successElement = document.querySelectorAll("div.success");

    // Stockage des champs correctement complétés
    localStorage.setItem("successElement", successElement.length)
    // console.log(successElement.length);    
})

validateButton.addEventListener('click', () => {
    let successElement = localStorage.getItem("successElement");
    let totalItemNumber = localStorage.getItem("totalItemNumber")

    // Si les 5 champs requis ne sont pas correctes alors la fenêtre "formIncomplete" apparaitra 
    if (successElement != 5) {
        // alert("Tous les champs doivent être valides.")
        validateButton.dataset.target = "#formIncomplete"

        //vérification de tous les inputs afin de montrer ceux qui ne sont pas correctement remplis
        checkAllInputs();
    }
    // Vérifie si le panier est vide
    else if (totalItemNumber === null) {
        // alert("Votre panier est vide !")
        validateButton.dataset.target = "#cartIsEmpty"
        checkAllInputs();
    }
    else{
        confirmationOrder()
    }
})

// Fonction qui récupère le code de la commande
function getOrderConfirmationId(responseId) {
    let orderId = responseId.orderId;
    // console.log(orderId);
    localStorage.setItem("orderConfirmationId", orderId);
}

//Validation de la commande et envoie de l'objet contact et du tableau product à l'API
function confirmationOrder() {
    dataToSend = JSON.stringify({ contact, products });
    console.log(dataToSend);
    postForm(dataToSend);
    // console.log(firstName.value);
}

// Requête POST pour envoyer l'objet Contact et le tableau products à l'API
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

// Appel des fonctions
onLoadNumberInCart()
getCart()
