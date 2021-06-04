// *************** FONCTION REMPLISSAGE CARTES ET REDIRECTION *******************



const fillUpCard = async (urlApi) => {

  const productCart = await getAll(urlApi);
  let cardProduct = ""


  for (const product of productCart) {
    
    console.log("product", product)
    cardProduct += 
    `<a href="./produit.html?/id=${product._id}" class="text-center text-decoration-none text-reset">
        <img src="${product.imageUrl}" id="img" class=" card-img-top" alt="img-appareil-photo">
        <figcaption class="px-3">
          <h3 class="mt-3">${product.name}</h3>
          <p class="card-text">${product.price} €</p>
        </figcaption>
      </a> 
    `

    document.getElementById("cardProduct").innerHTML = cardProduct;
    
  }
}


fillUpCard(urlApiCameras)
  .catch(error => { document.getElementById("cardProduct").innerHTML = error.message });
