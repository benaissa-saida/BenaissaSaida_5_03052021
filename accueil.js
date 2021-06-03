// ********************************* VARIABLES **********************************
const card = document.getElementById('card');
const product = document.getElementById('product');
const clonedCard = document.getElementById("card");

// ********************************* GET ************************************
const getDataMain = (url) => {
  sendAll('GET', url ).then(response =>{
    showCard(response);
    fillUpCard(response);
  })
  .catch(function (err) {
    console.log(err);
    alert("serveur Hors service");
  });
};

getDataMain('http://localhost:3000/api/cameras/');


// ********************** FONCTION AFFICHAGE CARTES *****************************
function showCard(response) {
  let j = 0;
  while (j++ < response.length - 1) {
    let clone = card.cloneNode(true);
    product.appendChild(clone);
  }
}
  

// *************** FONCTION REMPLISSAGE CARTES ET REDIRECTION *******************
function fillUpCard(response) {
  const description = document.querySelectorAll(".description");
  const img = document.querySelectorAll(".img");
  const title = document.querySelectorAll(".title");
  const price = document.querySelectorAll(".price");

  
  for (let i = 0; i < response.length; i++) {
    
    img[i].src = response[i].imageUrl;
    img[i].setAttribute("height", "320px");
    img[i].setAttribute( "object-fit", "cover");
    title[i].textContent = "Appareil photo " + response[i].name;
    description[i].textContent = response[i].description;
    price[i].textContent = response[i].price+ " €";

    const productPage = document.querySelectorAll(".pageProduct");
    productPage[i].href = "produit.html?/id=" + response[i]._id;
  }
}
