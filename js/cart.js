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
                    onLoadNumberInCart()
                })
            }
            else{
                removeCart.dataset.target = "#cartIsEmptyModal";
                returnToHome.addEventListener('click', () =>{
                    window.location.href = "index.html"
                    onLoadNumberInCart()
                })
            }
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
    // console.log(cartContent);
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

// console.log(arrayPrice);

let form = document.getElementById("form");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");
let successElement = []; 
let validateButton = document.getElementById("validateButton");

class ClientData {
    constructor(firstName, lastName, address, city, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email;
    }
}

form.addEventListener('click', (e) => {
    e.preventDefault();
    checkInputs();
    let successElement = localStorage.getItem("successElement");
    validateButton.addEventListener('click', () => {
        if (successElement == 5) {
            console.log("ok");
            confirmationOrder()
        }
        else{
            console.log("moins de 5");
        }
    })
})

//vérifie si les champs complétés sont conformes
function checkInputs() {
    //trim pour supprimer les espaces
    let firstNameValue = firstName.value.trim();
    let lastNameValue = lastName.value.trim();
    let addressValue = address.value.trim();
    let cityValue = city.value.trim();
    let emailValue = email.value.trim();

    if (firstNameValue === "") {
        setErrorFor(firstName, "Le champs ne peut pas être vide.")
    }
    else if (!isAlpha(firstNameValue)){
        setErrorFor(firstName, "Ce champs ne peut contenir que des lettres");
    }
    else {
        setSuccessFor(firstName)
    }

    if (lastNameValue === "") {
        setErrorFor(lastName, "Le champs ne peut pas être vide.")
    }
    else if (!isAlpha(lastNameValue)){
        setErrorFor(lastName, "Ce champs ne peut contenir que des lettres");
    }
    else {
        setSuccessFor(lastName)
    }

    if (addressValue === "") {
        setErrorFor(address, "Le champs ne peut pas être vide.")
    }
    else {
        setSuccessFor(address)
    }

    if (cityValue === "") {
        setErrorFor(city, "Le champs ne peut pas être vide.")
    }
    else if (!isAlpha(cityValue)){
        setErrorFor(city, "Ce champs ne peut contenir que des lettres");
    }
    else {
        setSuccessFor(city)
    }

    if(emailValue === '') {
		setErrorFor(email, 'Le champs ne peut pas être vide.');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, "l'adresse email saisie n'est pas valide.");
	} else {
		setSuccessFor(email);
	}

    successElement = document.querySelectorAll("div.success")
    localStorage.setItem("successElement", successElement.length)

    contact = new ClientData(firstNameValue, lastNameValue, addressValue, cityValue, emailValue);

    // console.log(successElement.length)
    localStorage.setItem("firstName", firstNameValue);
    console.log(firstNameValue)
}


function setErrorFor(input, message) {
    let formControl = input.parentElement;
    let small = formControl.querySelector('small');

    //ajout du message d'erreur dans la balise small
    small.innerText = message;

    //ajout de la class error
	formControl.classList.add('error');
    formControl.classList.remove('success');
}

function setSuccessFor(input) {
	let formControl = input.parentElement;
	formControl.classList.add('success');
    formControl.classList.remove('error');

}

function isAlpha(input) {
    return (/^[a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+$/i).test(input)
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function getOrderConfirmationId(responseId) {
    let orderId = responseId.orderId;
    // console.log(orderId);
    localStorage.setItem("orderConfirmationId", orderId);
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
    dataToSend = JSON.stringify({ contact, products });
    console.log(dataToSend);
    postForm(dataToSend);
    console.log(contact.firstName);
}