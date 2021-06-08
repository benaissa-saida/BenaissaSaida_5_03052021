//************************************************** VARIABLES ***********************************************/
// let objectStorage = JSON.parse(localStorage.getItem('object'))

//************************************* Fonctions pour le calcul du prix *************************************/

const calcTotalproduct = (product) => {
	
    return product.price * product.quantity;
};


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


//************************************* Fonction supprime le produit *************************************/


function deleteProduct () {
    // Supprime le produit du LocalStorage
    let item = this.getAttribute("id").split("_")[1];
    let itemToDelete = objectStorage.find(e => e._id == item);
    let indexItem = objectStorage.indexOf(itemToDelete);
  
    objectStorage.splice(indexItem, 1);
  
    localStorage.setItem('object', JSON.stringify(objectStorage));
  
    // Delete html showing the product
    let divToDelete = this.parentElement.parentElement;
    divToDelete.remove();
  
    // Montre le nouveau prix des différents produits
    totalPrice.textContent = calcTotal();
    console.log("item", item);
    console.log("itemToDelete", itemToDelete);
    console.log("indexItem", indexItem)
  }

//************************************* Fonctions pour le formulaire *************************************/

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
  
  

  const createOrder = async () => {
    const contact = getUserData();
    const products = [];
    for (const productInCart of objectStorage){
        products.push(productInCart._id);
    }

    const result = await sendData(contact, products);
    localStorage.setItem("successOrder", JSON.stringify(result));
    document.location.href = "commande.html";
    return result;
  };