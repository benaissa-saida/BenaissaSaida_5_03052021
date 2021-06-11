//************************************************** VARIABLES ***********************************************/
let objectStorage = JSON.parse(localStorage.getItem('object'))


//************************************* Fonctions pour le calcul du prix *************************************/

// Fonction qui multiplie le prix avec la quantité de ce même produit
const calcTotalproduct = (product) => {
	
  return product.price * product.quantity;
};

//Fonction qui calcule la somme totale des différents produits
const calcTotal = () => {
  let objectStorage = localStorage.getItem('object')
  ? JSON.parse(localStorage.getItem('object'))
  : [];
let summTotal = 0;

for (let product of objectStorage) {

    productPrice = calcTotalproduct(product);
    summTotal = summTotal + productPrice;
}
return summTotal;
}



//************************************* Fonction supprime le produit du panier *************************************/

function deleteProduct () {
  // Supprime le produit du LocalStorage
  let item = this.getAttribute("id").split("_")[1];
  let itemToDelete = objectStorage.find(e => e._id == item);
  let indexItem = objectStorage.indexOf(itemToDelete);

  objectStorage.splice(indexItem, 1);

  localStorage.setItem('object', JSON.stringify(objectStorage));

  // Supprime l'html qui montre le produit (<tr>)
  let trToDelete = this.parentElement.parentElement;
  trToDelete.remove();

  // Montre le nouveau prix des différents produits
  totalPrice.textContent = calcTotal();

  location.reload();

}

//************************************* Fonctions pour le formulaire *************************************/
// Fonction qui permet de créer un objet à chaque infos contact
const getUserData = () => {
    const contact = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      address: document.getElementById('address').value,
      email: document.getElementById('email').value,
      city: document.getElementById('city').value,
      zip: document.getElementById('zip').value,
    };
    return contact
  }
  
  
/*Fonction asynchrone qui attendra d'avoir toutes
/* les informations avant d'envoyer les données 
au serveur. Ce dernier nous renverra un orderId*/
  const createOrder = async () => {
    const contact = getUserData();
    const products = [];
    let orderSuccess = [];
    const total = calcTotal();
    for (const productInCart of objectStorage){
      products.push(productInCart._id);
      //pousse l'id des produits dans un nouvel objet "products"
    }

    const result = await sendData(contact, products);
    orderSuccess.push(result, total)
    localStorage.setItem("successOrder", JSON.stringify(orderSuccess));
    document.location.href = "commande.html";
    return result;

  };