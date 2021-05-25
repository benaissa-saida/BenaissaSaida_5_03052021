// ********************************* VARIABLES **********************************

let btnPopup = document.querySelector('.btnPopup');
let overlay = document.getElementById('overlay');
let btnClose = document.getElementById('btnClose');


let productImg = document.getElementById("imageProduct");
let productTitle = document.getElementById("titleProduct");
let productDescrip = document.getElementById("descriptionProduct");
let productLenses = document.getElementById("lenses");
let productPrice = document.getElementById("priceProduct");
let basket = document.getElementById("basket");


//******** Récupérer id de la page produit choisie ainsi que son chemin *********
const id = window.location.search.split("=")[1];
// console.log(id);
let url = `http://localhost:3000/api/cameras/${id}`;

// ******************************** POPUP ***************************************
// Fonction d'ouverture popup
btnPopup.addEventListener('click',openMoadl);
function openMoadl() {
overlay.style.display='block';
};

// Fonction de fermeture popup
btnClose.addEventListener('click',closeModal);
function closeModal() {
overlay.style.display='none';
};


// ******************************** GET ****************************************
const getDataProduct = (url) => {
    sendHttpRequest('GET', url ).then(response =>{
      product(response);
      addStorage(response);
    })
    .catch(function (err) {
      console.log(err);
      alert("serveur Hors service");
    });
  };

getDataProduct(url);
// *************************** FUNCTION PRODUCT *********************************
product = (response) => {
  // ajout du contenu dans la fiche du produit

  
  productImg.setAttribute("src", response.imageUrl);
  productImg.setAttribute("height", "320px");
  productImg.setAttribute( "object-fit", "cover");
  productTitle.textContent = "Appareil photo " + response.name;
  productDescrip.textContent = response.description;
  productPrice.textContent = response.price + " euro";

  for (i = 0; i < response.lenses.length; i++) {
    let option = document.createElement("option");
    productLenses.appendChild(option);
    option.textContent = response.lenses[i];
    option.value = response.lenses[i];
  }
}
// *************** FUNCTION USER CHOICE (localstorage) **************************


  addStorage = (response) => {
    addbasket = () => {
    let objectStorage = JSON.parse(localStorage.getItem("object"));
    let objectStorageId = JSON.parse(localStorage.getItem("id"));

    if (objectStorage === null && objectStorageId === null) {
      objectStorage = [];
      objectStorageId = [];
    }

    objectStorage.push([response, lenses.value]);
    objectStorageId.push(response._id);

    localStorage.setItem("object", JSON.stringify(objectStorage));
    localStorage.setItem("id", JSON.stringify(objectStorageId));

    console.log(localStorage);
    } 
    basket.addEventListener("click", addbasket);
  }