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
getId(url)
.then(product => {
  productCard(product);
  addStorage(product);
})
.catch(error => { document.getElementById('product').innerHTML = error.message });




// *************************** FUNCTION PRODUCT *********************************
const productCard = (productToShow) => {
  
  
  let productLensesChoice = productToShow.lenses;


  productImg.setAttribute("src", productToShow.imageUrl);
  productImg.setAttribute("height", "320px");
  productImg.setAttribute( "object-fit", "cover");
  productTitle.textContent = "Appareil photo " + productToShow.name;
  productDescrip.textContent = productToShow.description;
  productPrice.textContent = productToShow.price + " €";


  for (let i in productLensesChoice) {
    //Boucle qui crée les options des lentilles.
    let option = document.createElement("option");
    productLenses.appendChild(option);
    option.textContent = productLensesChoice[i];
    option.value = productLensesChoice[i];
  }
};
// *************** FUNCTION USER CHOICE (localstorage) **************************

addStorage =  (product) => {
 /* Fonction qui permettra aux choix des utilisateurs 
 /* de rester stockés sur leur page de navigation */
  addCart = () =>{ 

    let objectStorage = localStorage.getItem("object") ? JSON.parse(localStorage.getItem("object")) : [];

    const checkProduct = objectStorage.find((e) => e._id === id);
    if (checkProduct) {
    checkProduct.quantity++;
    } else {
    product.quantity = 1;
    objectStorage.push(product);
    }


    localStorage.setItem("object", JSON.stringify(objectStorage));

    console.log(localStorage);
  } 
  document.getElementById("cart").addEventListener("click", addCart);
}

