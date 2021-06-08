// *************************** VARIABLE LOCALSTORAGE ****************************
let objectStorage = JSON.parse(localStorage.getItem("object"));


// ********************************* VARIABLES **********************************
let blockCartProduct = '';

let totalPrice = document.getElementById('totalPrice');

let formVisibility = document.getElementById('form');


// ********************************* FONCTIONS **********************************


function  showCartContent (){
  for (let productInCart of objectStorage) {
    blockCartProduct +=
    `
    <tr class="align-middle d-flex flex-column  align-items-center d-md-table-row mb-4 gap-2 container-sm">
        <td class="align-self-end">
            <button type="button" id="delete_${productInCart._id}" class="btn-close" aria-label="Supprimer"></button>
        </td>
        <td class="">
            <a href="produit.html?id=${productInCart._id}" class="btn">
                <h3 class="fw-light">${productInCart.name}</h3>
                <img src="${productInCart.imageUrl}" alt="voir-produit-${productInCart.name}" height="80" width="84">
            </a>
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


if (objectStorage) {
  showCartContent();
  totalPrice.textContent = calcTotal();
  formVisibility.classList.remove('hidden');
}