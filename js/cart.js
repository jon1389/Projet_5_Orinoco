// Déclaration des variables
const mainUrl = "https://ab-p5-api.herokuapp.com/api/cameras/";
const arrayPrice = [];
let products = [];
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

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs();
    let successElement = localStorage.getItem("successElement");
    if (successElement == 5) {
        console.log("ok");
        confirmationOrder()
    }
    // else {
    //     console.log(successElement)
    // }
    // validateCart()
})

// function validateCart() {
//     validateButton.addEventListener('click', () => {
//         let successElement = localStorage.getItem("successElement");
//         if (successElement == 5) {
//             console.log("ok");
//             confirmationOrder()
//         }
//         else {
//             console.log(successElement)
//         }
//     })
// }

//vérifie si les champs complétés sont conformes
function checkInputs() {
    let firstNameValue = firstName.value.trim(); //trim pour supprimer les espaces
    let lastNameValue = lastName.value.trim();
    let addressValue = address.value.trim();
    let cityValue = city.value.trim();
    let emailValue = email.value.trim();
    
    // firstname.addEventListener('input', () => {
        // let firstNameValue = firstName.value.trim();
        console.log(firstNameValue)
        if (firstNameValue == "" || firstNameValue == null) {
            setErrorFor(firstName, "Le champs ne peut pas être vide.")
        }
        else if (!isAlpha(firstNameValue)){
            setErrorFor(firstName, "Ce champs ne peut contenir que des lettres");
        }
        else {
            setSuccessFor(firstName)
        }
    // })
    
    // lastname.addEventListener('input', () => {
        // let lastNameValue = lastName.value.trim();
        if (lastNameValue === "" || lastNameValue == null ) {
            setErrorFor(lastName, "Le champs ne peut pas être vide.")
        }
        else if (!isAlpha(lastNameValue)){
            setErrorFor(lastName, "Ce champs ne peut contenir que des lettres");
        }
        else {
            setSuccessFor(lastName)
        }
    // })
    
    // address.addEventListener('input', () => {
        // let addressValue = address.value.trim();
        if (addressValue === "" || addressValue == null) {
            setErrorFor(address, "Le champs ne peut pas être vide.")
        }
        else {
            setSuccessFor(address)
        }
    // })

    // city.addEventListener('input', () => {
        // let cityValue = city.value.trim();
        if (cityValue === "" || cityValue == null) {
            setErrorFor(city, "Le champs ne peut pas être vide.")
        }
        else if (!isCity(cityValue)){
            setErrorFor(city, "Ce champs ne peut contenir que des lettres");
        }
        else {
            setSuccessFor(city)
        }
    // })

    // email.addEventListener('input', () => {
        // let emailValue = email.value.trim();
        if(emailValue === '' || emailValue == null) {
            setErrorFor(email, 'Le champs ne peut pas être vide.');
        } else if (!isEmail(emailValue)) {
            setErrorFor(email, "l'adresse email saisie n'est pas valide.");
        } else {
            setSuccessFor(email);
        }
    // })

    successElement = document.querySelectorAll("div.success")
    // console.log(successElement);
    localStorage.setItem("successElement", successElement.length)

    contact = new ClientData(firstNameValue, lastNameValue, addressValue, cityValue, emailValue);
    // console.log(successElement.length);
    localStorage.setItem("firstName", firstNameValue);
    // console.log(firstNameValue);
}

// Fonction qui se lance en cas de champs mal renseigné
function setErrorFor(input, message) {
    let formControl = input.parentElement;
    let small = formControl.querySelector('small');

    //ajout du message d'erreur dans la balise small
    small.innerText = message;

    //ajout de la class error
	formControl.classList.add('error');
    formControl.classList.remove('success');
}

// Fonction qui se lance lorsque le champs et bien renseigné
function setSuccessFor(input) {
	let formControl = input.parentElement;
	formControl.classList.add('success');
    formControl.classList.remove('error');
}

// Fonction qui récupère le code de la commande
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

// Appel des fonctions
onLoadNumberInCart()
getCart()
