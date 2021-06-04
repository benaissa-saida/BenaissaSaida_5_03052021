// *************************** VARIABLE LOCALSTORAGE ****************************
let objectStorage = JSON.parse(localStorage.getItem("object"));
let objectStorageId = JSON.parse(localStorage.getItem("id"));

function  showCartContent (){
  for (let productInCart of objectStorage) {
    blockCartProduct +=
            `
            <tr class="align-middle d-flex flex-column  align-items-center d-md-table-row mb-4 gap-2 container-sm">
                <td class="align-self-end">
                    <button type="button" id="delete_${productInCart._id}" class="btn-close" aria-label="Supprimer"></button>
                </td>
                <td class="">
                    <a href="/public/page/produit.html?id=${productInCart._id}" class="btn">
                        <img src="${productInCart.imageUrl}" alt="voir-produit-${productInCart.name}" height="80" width="84">
                    </a>
                </td>
                <td class="fw-light">${productInCart.name}</td>
                <td class="fw-light">
                    <span class="rounded py-2 px-3 varnish-color"></span>
                    <span class="py-2 px-3 text-nowrap">${productInCart.choice}</span>
                </td>
                <td class="fw-light text-center d-none d-md-table-cell">${productInCart.price}</td>
                <td class="fw-light text-center">
                    <div id="quantity_${productInCart._id}" class="btn-group me-2" role="group" aria-label="quantité de ${productInCart.name}">
                        <button type="button" class="btn btn-lg btn-light fw-light quantity" aria-label="enlever">-</button>
                        <span class="btn btn-lg fw-light">${productInCart.quantity}</span>
                        <button type="button" class="btn btn-lg btn-light fw-light quantity" aria-label="ajouter">+</button>
                    </div>
                </td>
                <td id="total-produit_${productInCart._id}" class="fw-light text-center total-product">${calcTotalproduct(productInCart)}</td>
            </tr>
        `;
    
  };

  document.getElementById('listProduct').innerHTML = blockCartProduct;

}








































// ********************************* VARIABLES **********************************
let blockCartProduct = '';








// ********************************* FONCTIONS **********************************


const calcTotalproduct = (product) => {
	return product.price * product.quantity;
};


const calcTotal = () => {

  let summTotal = 0;

  for (let product of cartStorage) {

      productPrice = calcTotalproduct(product);
      summTotal = summTotal + productPrice;
  }
  return summTotal;
}


if (objectStorage) {
  showCartContent();
  // totalDiv.textContent = euro.format(calcTotal());
}









// let productPage = document.querySelector('.product');
// let prod = document.querySelector('.prod');

// let price = document.querySelector('.price');
// let sousTot = document.querySelector('.sousTotal');


// let imgbasket = document.querySelector('.img');

// let sum = 0;

// let tab = document.getElementById('tab');



//***********************Variables formulaire************************************


// let products = objectStorageId;

// contprod = {contact, products}

// creatOrder = JSON.stringify(contprod);

// console.log('creatOrder', creatOrder);


//*******************Panier vide, ou plein après choix****************************
// if (objectStorage == null){
//     prod.removeChild(imgbasket);
// } else{
//   let form = document.getElementById('form');
//   form.classList.remove('hidden');






// //*********************************** GET ****************************************  
  const getDataMain = (url) => {
    getAll('GET', url )
    .then(response =>{
      showCartContent(response)
      // cloneProduct(response);
      // addRemoveProduct(response);
      // sendForm(response);
    })
    .catch(function (err) {
      console.log(err);
      alert("serveur Hors service");
    });
  };

  getDataMain('http://localhost:3000/api/cameras/');
// }

// //*********************************** POST ***************************************
// // const sendData = (url) =>{
// //   getAll('POST', url).then(function(reponse){
// //     postOrder(reponse);
// //   })
// //   .catch(err => {
// //     console.log(err);
// //   })
// // }

// // sendData('http://localhost:3000/api/cameras/order', creatOrder);

// // ************************* FONCTION CLONAGE PRODUITS ***************************
// function cloneProduct(){


//   for (let j = 0; j < objectStorage.length -1; j++) {
//     let cloneproduct = productPage.cloneNode(true);
//     tab.appendChild(cloneproduct);

//     console.log(objectStorage.length);
//   }


// }


// // ********************* FONCTION AJOUT/SUPP CONTENU PRODUIT ********************
// function addRemoveProduct() {
//   let imgbasket = document.querySelectorAll('.img');
//   let prodCloned = document.querySelectorAll('.prod');
//   let priceCloned  = document.querySelectorAll('.price');
//   let qtyCloned  = document.querySelectorAll('.selectedQty');
    
//   for (i = 0; i < objectStorage.length ; i++) {

//     prodCloned[i].textContent = objectStorage[i][0].name;
//     imgbasket[i].setAttribute("src", objectStorage[i][0].imageUrl);
//     imgbasket[i].setAttribute("width", "100px");
//     imgbasket[i].setAttribute("height", "80px");

//     prodCloned[i].setAttribute("data-id", objectStorageId[i]);
//     prodCloned[i].appendChild(imgbasket[i]);

//     priceCloned[i].textContent = (objectStorage[i][0].price * objectStorage[i][1]) + " €";

//     sum += parseInt(priceCloned[i].textContent);

//     sousTot.textContent = sum + ' €';

//     qtyCloned[i].textContent = objectStorage[i][1];
    
//     let btnRemove = document.createElement("button");
    
//     btnRemove.setAttribute("data-id", objectStorageId[i]);
//     btnRemove.setAttribute("data-qty", objectStorage[i][1]);
    
//     btnRemove.classList.add(
//       "btn",
//       "btn-primary",
//       "btn-sm",
//       "btn-block",
//       "d-flex",
//       "justify-content-center",
//       "align-items-center",
//       "mt-4",
//       "remove"
//     )

//     btnRemove.textContent = "Supprimer";

//     qtyCloned[i].appendChild(btnRemove);


//     btnRemoveProd(i);
//   } 

// }




// function btnRemoveProd(i) {

//   let allBtn = document.querySelectorAll('.remove');
  

//   allBtn[i].addEventListener("click", (e) => {
//     const id = e.target.getAttribute("data-id");
//     const qty = e.target.getAttribute("data-qty");
    
    
    
//     objectStorageId.splice(objectStorageId.findIndex((x) => x === id), 1);
//     objectStorage.splice(objectStorage.findIndex((x) => x[0]._id === id && x[1] === qty), 1);
    
    
//     localStorage.setItem("object", JSON.stringify(objectStorage));
//     localStorage.setItem("id", JSON.stringify(objectStorageId));
 
//     location.reload();
//     if( objectStorage.length === 0){
//     localStorage.removeItem("object");
//     localStorage.removeItem("id");
//     };
//   });
// }


// // **************************** FONCTION SEND FORM *******************************


// const sendForm = function () {

//   form.addEventListener("submit", function(e){
//     e.preventDefault()
//     const contact = getUserData();
//     const errors = []
//     console.log('contact', contact)
//     const alphaRegExp = /^[A-Za-zàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+$/

//     document.getElementById('firstName').classList.remove('good', 'error')
//     document.getElementById('lastName').classList.remove('good', 'error')
//     document.getElementById('address').classList.remove('good', 'error')
//     document.getElementById('city').classList.remove('good', 'error')
//     document.getElementById('email').classList.remove('good', 'error')

//     // Test firstName
//     let firstNameValid = true
//     if(!alphaRegExp.test(contact.firstName)) {
//         errors.push('Le prénom doit uniquement contenir des lettres')
//         firstNameValid = false
//     }
//     document.getElementById('firstName').classList.add(firstNameValid ? 'good': 'error')

//     // Test lastname
//     let lastNameValid = true
//     if(!alphaRegExp.test(contact.lastName)) {
//         errors.push('Le nom doit uniquement contenir des lettres')
//         lastNameValid = false
//     }
//     document.getElementById('lastName').classList.add(lastNameValid ? 'good': 'error')
    
//     // Test city
//     let cityValid = true
//     if(!alphaRegExp.test(contact.city)) {
//         errors.push('La ville doit uniquement contenir des lettres')
//     cityValid = false
//     }
//     document.getElementById('city').classList.add(cityValid ? 'good': 'error')
    

//     // Test address
//     let addressValid = true
//     document.getElementById('address').classList.add(addressValid ? 'good': 'error')


//     // Test email
//     let emailValid= true
//     document.getElementById('email').classList.add(emailValid ? 'good': 'error')

//     if(!errors.length) {
//       sendData();

      
//       // let products = 
//       // const contprod = {
//       //   "contact": contact , 
//       //   "products": products,
//       // }

//       // creatOrder = JSON.stringify(contprod);

//       // console.log('creatOrder', creatOrder);


//       // const sendData = fetch('http://localhost:3000/api/cameras/order', {  //fetch méthode qui fait un appel au serveur 
//       //   method: 'POST',
//       //   body: JSON.stringify(contprod),
//       //   headers: {
//       //   'Content-Type': 'application/json'
//       //   }
//       // }).then(async (response)=> {
      

//       //   try{

//       //     const contenu = await response.json();
//       //     localStorage.setItem("orderId", JSON.stringify(contenu));
//       //     location.href = "commande.html";
//       //   }catch(e){
//       //     console.log(e);
//       //   }




//         // let orderIdent = JSON.parse(localStorage.getItem("orderId"));

//         // //suppression du local storage des produit panier apres commande si nouvel commande suppression total

//         // if (orderIdent === null) {
//         //   localStorage.removeItem("id");
//         //   localStorage.removeItem("object");
//         //   orderIdent = [];
//         // } else {
//         //   localStorage.removeItem("id");
//         //   localStorage.removeItem("object");
//         //   localStorage.removeItem("orderId");
//         //   orderIdent = [];
//         // }

//         // // integre la nouvelle commande apres l ancienne commande

//         // orderIdent.push(reponse, sum);
//         // localStorage.setItem("orderId", JSON.stringify(orderIdent));

//       // })
//     } else {
//         let htmlError = ''
//         for(const error of errors) {
//             htmlError += `${error} <br/>`
//         }
//       document.getElementById('form-err').innerHTML = htmlError;
//     }


//   });

//   }

// const sendDataJs= (contact, products) =>{

//   const contprod = {
//     "contact": contact, 
//     "products": products,
//   }

//   const dataSent = fetch('http://localhost:3000/api/cameras/order', {  //fetch méthode qui fait un appel au serveur 
//     method: 'POST',
//     body: JSON.stringify(contprod),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//   .then(response => response.text())
//   .then(result => JSON.parse(result)) //JSON.parse() = transforme du text en JSON
//   .catch(error => console.log('error', error));

//     return dataSent
// }



//   const sendData = async () => {
//     const contact = getUserData();
//     const products = objectStorageId;
    
//     const contenu = await sendDataJs(contact, products);
//     localStorage.setItem("orderId", JSON.stringify(contenu));
//     // location.href = "commande.html";
//     return contenu; 
    
//   }


// const getUserData = () => {
//   const contact = {
//     firstName: document.getElementById('firstName').value,
//     lastName: document.getElementById('lastName').value,
//     address: document.getElementById('address').value,
//     city: document.getElementById('city').value,
//     email: document.getElementById('email').value,
//   };
//   return contact;
// }



// const getCartTotalPrice = () => {
//   // Recuperer les articles de mon panier dans le localStorage + vérifie si mon panier existe
//   const objectStorage = localStorage.getItem("object") ? JSON.parse(localStorage.getItem("object")) : [];

//   // Si existe = Faire une boucle pour récuperer le prix et la quantité de mon article
//   let sum = 0;
//   for (let product of objectStorage) {
//     // sumTotal += product[0].price * product[1];
//     sum += parseInt[i].textContent((product[0].price * product[1]) + " €");
//   }
  
//   return sum;
  
//   // Ajouter au montant total chaque prix des articles multiplié par leur quantité dans le panier // SumTotal
//   // Retourne SumTotal
  
// };
