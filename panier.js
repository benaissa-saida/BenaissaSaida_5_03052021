// *************************** VARIABLE LOCALSTORAGE ****************************
let objectStorage = JSON.parse(localStorage.getItem("object"));
let objectStorageId = JSON.parse(localStorage.getItem("id"));
console.log(objectStorage, objectStorageId);

// ********************************* VARIABLES **********************************
let product = document.getElementById('product');
let lenses = document.getElementById('lenses');
let productQuantity = document.getElementById('productQuantity');
let price = document.getElementById('price');
let sousTotal = document.getElementById('sousTotal');


let eptProd = document.getElementsByClassName('emptyProduct');
let eptLens = document.getElementsByClassName('emptyLenses');
let quantity = document.getElementsByClassName('product_quantity');
let eptPrice = document.getElementsByClassName('emptyPrice');
let eptSousTot = document.getElementsByClassName('emptySousTotal');

let basketImg = document.getElementById('img');

let sum = 0;

let firstName = document.querySelectorAll('#nom');
let lastName = document.querySelectorAll('#prenom');
let email = document.querySelectorAll('#email');
let adress = document.querySelectorAll('#adress');
let city = document.querySelectorAll('#city');
let zip = document.querySelectorAll('#zip');
let form = document.querySelector('.form')


if (objectStorage == null){
product.removeChild(basketImg);
} else{
    const getDataMain = (url) => {
        sendHttpRequest('GET', url ).then(response =>{
          cloneProduct(response);
          removeProduct(response);
          sumProduct(response);
          sendForm(response);
        })
        .catch(function (err) {
          console.log(err);
          alert("serveur Hors service");
        });
      };
      
      getDataMain('http://localhost:3000/api/cameras/');
}



// ************************* FONCTION CLONAGE PRODUITS **************************
function cloneProduct(response) {
    let j = 0;
    while (j++ < objectStorage.length - 1) {
      let productClone = eptProd.cloneNode(true);
      product.appendChild(productClone);

      let lenseClone = eptLens.cloneNode(true);
      lenses.appendChild(lenseClone);

      let quantityClone = productQuantity.cloneNode(true);
      quantity.appendChild(quantityClone);

      let totClone = eptPrice.cloneNode(true);
      price.appendChild(totClone);
    }
  }


// ********************* FONCTION AJOUT/SUPP CONTENU PRODUIT ********************



// ************************* FONCTION SOMME PRODUITS ****************************


// ******************** FONCTION SUPP/RESET LOCALSTORAGE ************************


// ********************************** FORMULAIRE ********************************