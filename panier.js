// *************************** VARIABLE LOCALSTORAGE ****************************
let objectStorage =JSON.parse(localStorage.getItem("object"));
let objectStorageId = JSON.parse(localStorage.getItem("id"));

// ********************************* VARIABLES **********************************
let productPage = document.querySelector('.product');
let prod = document.querySelector('.prod');

let price = document.querySelector('.price');
let sousTot = document.querySelector('.sousTotal');


let imgbasket = document.querySelector('.img');

let sum = 0;

let tab = document.getElementById('tab');




/***********************Variables formulaire**************************/
let name = document.getElementById('nom');
let lastName = document.getElementById('prenom');
let email = document.getElementById('email');
let adress = document.getElementById('adress');
let city = document.getElementById('city');
let zip = document.getElementById('zip');
let form = document.querySelector('.form');


if (objectStorage == null){
    prod.removeChild(imgbasket);
} else{
  let form = document.querySelector('.form');
  form.classList.remove('hidden');
  const getDataMain = (url) => {
    sendAll('GET', url ).then(response =>{
      cloneProduct(response);
      addRemoveProduct(response);
    //   sendForm(response);
    })
    .catch(function (err) {
      console.log(err);
      alert("serveur Hors service");
    });
  };

  getDataMain('http://localhost:3000/api/cameras/');

}



// ************************* FONCTION CLONAGE PRODUITS **************************
function cloneProduct(){

    for (let j = 0; j < objectStorage.length -1; j++) {
      let cloneproduct = productPage.cloneNode(true);
      tab.appendChild(cloneproduct);

      console.log(objectStorage.length);
    }


}


// ********************* FONCTION AJOUT/SUPP CONTENU PRODUIT ********************
function addRemoveProduct() {
    let imgbasket = document.querySelectorAll('.img');
    let prodCloned = document.querySelectorAll('.prod');
    let priceCloned  = document.querySelectorAll('.price');
    let qtyCloned  = document.querySelectorAll('.selectedQty');
    
  for (i = 0; i < objectStorage.length ; i++) {

    prodCloned[i].textContent = objectStorage[i][0].name;
    imgbasket[i].setAttribute("src", objectStorage[i][0].imageUrl);
    imgbasket[i].setAttribute("width", "100px");
    imgbasket[i].setAttribute("height", "80px");

    prodCloned[i].setAttribute("data-id", objectStorageId[i]);
    prodCloned[i].appendChild(imgbasket[i]);

    priceCloned[i].textContent = (objectStorage[i][0].price * objectStorage[i][1]) + " €";

    sum += parseInt(priceCloned[i].textContent);

    sousTot.textContent = sum + ' €';

    qtyCloned[i].textContent = objectStorage[i][1];
    
    let btnRemove = document.createElement("button");
    
    btnRemove.setAttribute("data-id", objectStorageId[i]);
    btnRemove.setAttribute("data-qty", objectStorage[i][1]);
    
    btnRemove.classList.add(
      "btn",
      "btn-primary",
      "btn-sm",
      "btn-block",
      "d-flex",
      "justify-content-center",
      "align-items-center",
      "mt-4",
      "remove"
    )

    btnRemove.textContent = "Supprimer";

    qtyCloned[i].appendChild(btnRemove);


    removeProd(i);
  } 






}

function removeProd(i) {

  let allBtn = document.querySelectorAll('.remove');
  

  allBtn[i].addEventListener("click", (e) => {
    const id = e.target.getAttribute("data-id");
    const qty = e.target.getAttribute("data-qty");
    
    
    
    objectStorageId.splice(objectStorageId.findIndex((x) => x === id), 1);
    objectStorage.splice(objectStorage.findIndex((x) => x[0]._id === id && x[1] === qty), 1);
    
    
    localStorage.setItem("object", JSON.stringify(objectStorage));
    localStorage.setItem("id", JSON.stringify(objectStorageId));
 
    location.reload();
    if( objectStorage.length === 0){
    localStorage.removeItem("object");
    localStorage.removeItem("id");
    };
  });
}


// **************************** FONCTION SEND FORM *******************************


    