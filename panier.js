// ********************************* VARIABLES **********************************
let blockCartProduct = '';

let totalPrice = document.getElementById('totalPrice');

let formVisibility = document.getElementById('form');


// ********************************* FONCTIONS **********************************

//Montre les produits dans le panier grâce aux données du localStorage
function  showCartContent (){
  
  if (objectStorage) {
    for (let productInCart of objectStorage) {
      blockCartProduct +=
      `
      <tr class="align-middle d-flex flex-column  align-items-center d-md-table-row mb-4 gap-2 container-sm">
          <td class="align-self-end">
              <button type="button" id="delete_${productInCart._id}" class="btn-close" aria-label="Supprimer"></button>
          </td>
          <td>
            <h3 class="fw-light">${productInCart.name}</h3>
            <img src="${productInCart.imageUrl}" alt="voir-produit-${productInCart.name}" height="100" width="120">
          </td>
          <td class="fw-light text-center">${productInCart.lenses}</td>
          <td class="fw-light text-center">${productInCart.price}</td>
          <td class="fw-light text-center">
              <div id="quantity_${productInCart._id}" class="btn-group me-2" role="group" aria-label="quantité de ${productInCart.name}">
                  <button type="button" class="btn btn-sm btn-light quantity" aria-label="enlever">-</button>
                  <span class="btn btn-lg fw-light">${productInCart.quantity}</span>
                  <button type="button" class="btn btn-sm btn-light quantity" aria-label="ajouter">+</button>
              </div>
          </td>
          <td id="total-produit_${productInCart._id}" class="fw-light text-center total-product">${calcTotalproduct(productInCart)}</td>
      </tr>
      `;
      
    };
    document.getElementById('listProduct').innerHTML = blockCartProduct;
  }
  
}


if (objectStorage) {
  //s'il y a dans produits dans le localStorage
  showCartContent(); //afficher les cartes
  totalPrice.textContent = calcTotal(); // calcule le prix total
  formVisibility.classList.remove('hidden'); // affiche le formulaire
} 

if (!objectStorage || objectStorage.length === 0){
  //Si pas d'objet dans le localStorage 
  formVisibility.classList.add('hidden');
  //cache le formulaire 

  document.getElementById('emptyCart').innerHTML = 
  //modifie la page panier
    `
    <div class="py-5">
    <h3 class="mb-4"> Votre panier est bien vide..</h3>
    <a href="index.html" class="text-decoration-none text-primaire">Voir les produits</a>
    </div>
    `
}



document.querySelectorAll("button.quantity").forEach((buttonAdd) =>
	buttonAdd.addEventListener('click', function () {
    // Trouve le produit dans le local storage
    const item = this.parentElement.getAttribute("id").split("_")[1];
    let productChanged = objectStorage.find(e => e._id == item);

    // Change la quantité du produit 
    let newQuantity =
    this.getAttribute("aria-label") === "ajouter"
    ? parseInt(productChanged.quantity) + 1
    : parseInt(productChanged.quantity) - 1;

  /* Change les données dans le local storage en 
  /* renvoyant le plus grand nombre de la série */
  productChanged.quantity = Math.max(newQuantity, 1);
  localStorage.setItem('object', JSON.stringify(objectStorage));

  // Montre la nouvelle quantité sur le dom
    const spanQty = document.querySelector(`#quantity_${item} span`);
  spanQty.textContent = productChanged.quantity;

  // Calcule le nouveau total de ce même produit
  let totalProduct = calcTotalproduct(productChanged);

  // Montre le nouveau total du produit
  const totalProd = document.getElementById(`total-produit_${item}`);
  totalProd.textContent = totalProduct;

    /* Avant de montrer le somme totale des
    /* différents produits s'il y en a */
    totalPrice.textContent = calcTotal();

	})
);


/* Button : Supprime le produit avant 
/* de le retirer entièrement du localStorage */
document.querySelectorAll('.btn-close').forEach((btnClose) => {
    btnClose.addEventListener('click', deleteProduct)
});


