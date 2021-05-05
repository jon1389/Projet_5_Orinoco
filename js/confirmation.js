
// Confirmation de la commande
function addConfirmationOrder() {
    const confirmationId = localStorage.getItem("orderConfirmationId");
    const messageConfirmation = document.getElementById("orderId");
    let firstname = localStorage.getItem("firstName");
    messageConfirmation.innerHTML = "Merci " + firstname + " pour votre commande n° " + confirmationId;
    const totalPrice = localStorage.getItem("totalOrder");
    const confirmationPrice = document.getElementById("total-price");
    confirmationPrice.innerHTML = "Prix total : " + totalPrice /100 + " €";
}

// Vider le panier, le prix total et l'id de commande
function resetOrder() {
    confirmationButton = document.getElementById('confirmationButton');
    confirmationButton.addEventListener('click', function () {
        localStorage.clear("cartContent")
        window.location.href = "./index.html";
    })
}

// Appel des fonctions
onLoadNumberInCart()
addConfirmationOrder()
resetOrder()