const mainUrl = "https://ab-p5-api.herokuapp.com/api/cameras/";
const url_string = window.location.href;
const url = new URL(url_string);
const id = url.searchParams.get("id");

const productName = document.getElementById("productName");
const productImg = document.getElementById("productImg");
const lenseType = document.getElementById("lense");
const errorDiv = document.querySelector(".error");

var addCart = document.getElementById("addCart");

// console.log(url_string);
// console.log(url);
// console.log(id);

// const request = new XMLHttpRequest();
// request.open("GET", mainUrl+id);
// request.responseType ='json';
// request.send();

// request.onload = function() {
//     if (request.readyState === XMLHttpRequest.DONE) {
//         if (request.status === 200) {
//         let reponse = request.response; // on stock la réponse
//         document.getElementById("productName").textContent = reponse.name;
//         document.getElementById("productImg").src = reponse.imageUrl;
//         LensesList = reponse.lenses; //liste des lentilles
//         console.log(LensesList);
//         let option;
//         LensesList.forEach(lense => {
//             option = document.createElement("option");
//             option.textContent = "test";
//             lenseType.add(option);
//         }); 
//         }
//         else {
//         alert('Un problème est intervenu, merci de revenir plus tard.');
//         }
//     }
// }

function getItem() {
    return fetch(mainUrl+id)
        .then(function(httpBodyResponse) {
            return httpBodyResponse.json();
        })
        .then(item => {
            // console.log(item); // affiche les informations sur l'article
            // affiche les informations du produit selectionné
            document.getElementById("productName").textContent = item.name;
            document.getElementById("productImg").src = item.imageUrl;
            let lenses = item.lenses
            // console.log(lenses) //affiche la liste des lentilles

            // Boucle qui affiche chaque élément dans la liste déroulante 
            for (let option = 0; option < lenses.length; option++) {
                // console.log(lenses[option]); // affiche la valeur de l'index
                // console.log(option); // affiche l'index
                document.getElementById("lense").innerHTML += '<option value=' + option + '>'+ lenses[option] + '</option>';
                
            }
        })
        .catch(function(error){
            alert(error);
            document.querySelector(".error").textContent = "Une erreur est survenu, veuillez revenir plus tard.";
        })
}

getItem ()

// function addtoCart(){
//     addCart.addEventListener(click, () => {
        
//     })
// }

// function getLenses() {
//     return new Promise((resolve, reject) => {
//         fetch(`${mainUrl+id}`)
//             .then(data => data.json())
//             .then(data => {
//                 productName.textContent = data.name;
//                 productImg.src = data.imageUrl;  
//                 resolve()
//             })
//             .catch(error => {
//                 reject(error);
//                 errorDiv.innerText = "Une erreur est survenu, veuillez revenir plus tard."
//             })
//     });
// }

// getLenses().then(data => {
//     console.log("ça marche");
// })
