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
const url = `http://localhost:3000/api/cameras/${id}`;

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
    sendId('GET', url ).then(response =>{
      productCard(response);
      addStorage(response);
    })
    .catch(function (err) {
      console.log(err);
      alert("serveur Hors service");
    })
    
};

getDataProduct(url);
// *************************** FUNCTION PRODUCT *********************************
productCard = (response) => {
  //Structure de notre input quantité
  let quantityProd = `<select id="select-${response._id}" name="quantityOfProduct">
  <option value="1" selected > 1 </option>
  <option value="2"> 2 </option>
  <option value="3"> 3 </option>
  <option value="4"> 4 </option>
  </select>`

  document.getElementById('rowSelect').innerHTML = quantityProd;


  productImg.setAttribute("src", response.imageUrl);
  productImg.setAttribute("height", "320px");
  productImg.setAttribute( "object-fit", "cover");
  productTitle.textContent = "Appareil photo " + response.name;
  productDescrip.textContent = response.description;
  productPrice.textContent = response.price + " €";


  for (i = 0; i < response.lenses.length; i++) {
    //Boucle qui crée les options des lentilles.
    let option = document.createElement("option");
    productLenses.appendChild(option);
    option.textContent = response.lenses[i];
    option.value = response.lenses[i];
  }
};
// *************** FUNCTION USER CHOICE (localstorage) **************************

addStorage =  (response) => {
 /* Fonction qui permettra aux choix des utilisateurs 
 /* de rester stockés sur leur page de navigation */
  addbasket = () =>{ 

    let qtyChoice = document.getElementById(`select-${response._id}`);
    let choiceUser = qtyChoice.value;

    let objectStorage = localStorage.getItem("object") ? JSON.parse(localStorage.getItem("object")) : [];
    let objectStorageId = localStorage.getItem("id") ? JSON.parse(localStorage.getItem("id")) : [];


    objectStorage.push([response, qtyChoice.value]);
    objectStorageId.push(response._id);


    localStorage.setItem("object", JSON.stringify(objectStorage));
    localStorage.setItem("id", JSON.stringify(objectStorageId));

    console.log(localStorage);
  } 
  basket.addEventListener("click", addbasket);
}
