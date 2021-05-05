// Fonction qui s'exécute en cas d'erreur
function error() {
    let errorDiv = document.querySelector(".errorDiv");
    let errorImg = document.querySelector(".errorImg");
    errorDiv.textContent = "Une erreur est survenu, veuillez revenir plus tard.";
    console.log(errorImg.classList)
    errorImg.classList.remove("d-none")
}

// Fonction qui met à jour l'icône panier
function onLoadNumberInCart() {
    let totalItemNumber = localStorage.getItem("totalItemNumber");
    if(totalItemNumber){
        cartNumber.textContent = totalItemNumber;
    }
    else{
        cartNumber.textContent = 0;
    }
}

function isAlpha(input) {
    return (/^[a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+$/i).test(input)
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function isCity(city) {
    return (/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test(city));
}