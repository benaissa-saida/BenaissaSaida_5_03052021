// *************** FONCTION REMPLISSAGE CARTES ET REDIRECTION *******************


const fillUpCard = async (urlApi) => { 
  //Fonction asynchrone qui attend toutes les informations avant de s'enclencher

  const productCart = await getAll(urlApi); 
  //attend les données qui seront envoyé avec la requête get
  
  let cardProduct = ""


  for (const product of productCart) {
    //Boucle qui produira nos différentes card avec les différentes informations de l'api
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


fillUpCard(urlApiCameras) //Fonction contenant la variable de l'api
  .catch(error => { document.getElementById("cardProduct").innerHTML = error.message });
