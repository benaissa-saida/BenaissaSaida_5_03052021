// ********************************* VARIABLES **********************************

let btnPopup = document.querySelector('.btnPopup');
let overlay = document.getElementById('overlay');
let btnClose = document.getElementById('btnClose');


let productImg = document.getElementById("imageProduct");
let productTitle = document.getElementById("titleProduct");
let productDescrip = document.getElementById("descriptionProduct");
let productLenses = document.getElementById("lenses");
let productPrice = document.getElementById("priceProduct");


let product; 

//******** Récupérer id de la page produit choisie ainsi que son chemin *********
const id = window.location.search.split("=")[1]; //Coupe le lien http en deux, pour avoir seulement id

const url = `http://localhost:3000/api/cameras/${id}`; //Id introduit ensuite dans l'url

// ******************************** POPUP ***************************************
// Fonction d'ouverture popup
btnPopup.addEventListener('click',openPopup); //rècupère l'événement clic sur le bouton btnPopup et déclenche la fonction openPopup.
function openPopup() {
overlay.style.display='block'; //montre le popup
};

// Fonction de fermeture popup
btnClose.addEventListener('click',closePopup); //rècupère l'événement clic sur le bouton btnPopup et déclenche la fonction ClosePopup.
function closePopup() {
overlay.style.display='none'; //cache le popup
};


// ******************************** GET ****************************************
getId(url)
.then(product => {
  productCard(product);
  addStorage(product);
})
.catch(error => { document.getElementById('product').innerHTML = error.message });




// *************************** FUNCTION PRODUCT *********************************
const productCard = (productToShow) => {
  //Fonction qui créera notre card afin de l'afficher
  
  let productLensesChoice = productToShow.lenses;


  productImg.setAttribute("src", productToShow.imageUrl);
  productImg.setAttribute("height", "320px");
  productImg.setAttribute( "object-fit", "cover");
  productTitle.textContent = "Appareil photo " + productToShow.name;
  productDescrip.textContent = productToShow.description;
  productPrice.textContent = productToShow.price + " €";


  for (let i in productLensesChoice) {
    //Boucle qui crée les options des lentilles.
    let option = document.createElement("option"); //Crée l'élément option 
    productLenses.appendChild(option); //ajoute l'option dans notre balise select
    option.textContent = productLensesChoice[i]; //affichera le texte dans les différentes options
    option.value = productLensesChoice[i]; //Permet connaitre et de modifier la valeur de notre option 
  }
};
// *************** FUNCTION USER CHOICE (localstorage) **************************

addStorage =  (product) => {
 /* Fonction qui permettra aux choix des utilisateurs 
 /* de rester stockés sur leur page de navigation */
  addCart = () =>{ 

    let objectStorage = localStorage.getItem("object") ? JSON.parse(localStorage.getItem("object")) : []; //permet d'avoir nos items stockés précèdemment dans le local Storage

    const checkProduct = objectStorage.find((e) => e._id === id);
    if (checkProduct) {
      //S'il y a bien le produit ajoute sa quantité
    checkProduct.quantity++;
    } else {
    product.quantity = 1; //met la quantité du produit à 1 dans le localStorage
    product.lenses = lenses.value; //Envoie la valeur de lentilles choisie dans le localStorage
    objectStorage.push(product); //Le produit est ensuite poussé dans le localStorage
    }


    localStorage.setItem("object", JSON.stringify(objectStorage)); //stock notre key et sa valeur qui n'est autre que notre objet objectStorage

    console.log(localStorage);
  } 
  document.getElementById("cart").addEventListener("click", addCart); //Au clic sur le bouton envoie nos choix dans le localStorage
}

