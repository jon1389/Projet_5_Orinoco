class MyProduct {
    constructor(idCamera, selectedLenses) {
        this.idCamera = idCamera;
        this.selectedLenses = selectedLenses;
    }
}

//////////////////////////////CREATION DES CARDS INDIVIDUELLES DE PRODUIT //////////////////////////////////

//Récupération de l'Id dans l'url
function getIdUrlAndCard(cameras) {
    let urlSearch = new URLSearchParams(window.location.search);
    console.log(urlSearch);
    let idCamera = urlSearch.get('id');
    console.log(idCamera);
    getCameraItem(cameras, idCamera);
}

//Récupération de la caméra correspondant à l'Id
function getCameraItem(cameras, idCamera) {
    let choosenCamera = cameras.find(cameras => cameras['_id'] == idCamera);
    console.log(choosenCamera);
    createCardCamera(choosenCamera, idCamera);
}

getIdUrlAndCard()

getCameraItem()