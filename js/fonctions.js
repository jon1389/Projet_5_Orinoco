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

// Regex acceptant uniquement des lettres et caractères avec accents
function isAlpha(input) {
    return (/^[a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+$/i).test(input)
}

// Regex pour email
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

// Regex acceptant des lettres et espaces
function isCity(city) {
    return (/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test(city));
}

function checkAlpha(input) {
    let inputs = input.value.trim(); //trim pour supprimer les espaces

    if (inputs == "" || inputs == null) {
        setError(input, "Le champs ne peut pas être vide.")
    }
    else if (!isAlpha(inputs)){
        setError(input, "Ce champs ne peut contenir que des lettres");
    }
    else {
        setSuccess(input)
    }
}

function checkAlphaNum(input) {
    let inputs = input.value.trim(); //trim pour supprimer les espaces

    if (inputs == "" || inputs == null) {
        setError(input, "Le champs ne peut pas être vide.")
    }
    else {
        setSuccess(input)
    }
}

function checkCity(input) {
    let inputs = input.value.trim(); //trim pour supprimer les espaces

    if (inputs == "" || inputs == null) {
        setError(input, "Le champs ne peut pas être vide.")
    }
    else if (!isCity(inputs)){
        setError(input, "Ce champs ne peut contenir que des lettres");
    }
    else {
        setSuccess(input)
    }
}

function checkEmail(input) {
    let inputs = input.value.trim(); //trim pour supprimer les espaces

    if (inputs == "" || inputs == null) {
        setError(input, "Le champs ne peut pas être vide.")
    }
    else if (!isEmail(inputs)){
        setError(input, "l'adresse email saisie n'est pas valide.");
    }
    else {
        setSuccess(input)
    }
}

// Fonction qui se lance en cas de champs mal renseigné
function setError(input, message) {
    let formControl = input.parentElement;
    let small = formControl.querySelector('small');

    //ajout du message d'erreur dans la balise small
    small.innerText = message;

    //ajout de la class error
	formControl.classList.add('error');
    formControl.classList.remove('success');
}

// Fonction qui se lance lorsque le champs et bien renseigné
function setSuccess(input) {
	let formControl = input.parentElement;
	formControl.classList.add('success');
    formControl.classList.remove('error');
}

// Vérifie si tous les champs complétés sont conformes
function checkAllInputs() {
    checkAlpha(firstName);
    checkAlpha(lastName);
    checkAlphaNum(address);
    checkCity(city);
    checkEmail(email);
}