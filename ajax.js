 // ******************************** VARIABLES APPEL AJAX **********************************
const urlApiCameras = "http://localhost:3000/api/cameras";


// ************************************** REQUETE GET ***************************************
const getAll = async apiUrl => {

  const result = await fetch(apiUrl)
  .then(response => {
    if (response.status >= 400) {
      //!reponse.ok
      return response.json().then(errResData => {
        const error = new Error('Quelque chose cloche!');
        error.data = errResData;
        throw error;
      });
    }
    return response.json();
  })
  .then(result => {
    //Nous permet de convertir les données d'une chaine avant de les transmettre 
    const data = JSON.parse(JSON.stringify(result))
    data.map(e => e.price = e.price / 100);
    // Divise le prix par 100 pour convertir les centimes en euros
    return data
  })
  return result
    
};

const getId = async apiUrl => {

  const result = await fetch(apiUrl)
  .then(response => {
    if (response.status >= 400) {
      //!reponse.ok
      return response.json().then(errResData => {
        const error = new Error('Quelque chose cloche!');
        error.data = errResData;
        throw error;
      });
    }
    return response.json();
  })
  .then(result => {
    //Nous permet de convertir les données d'une chaine avant de les transmettre 
    const data = JSON.parse(JSON.stringify(result))
    data.price = data.price / 100;
    // Divise le prix par 100 pour convertir les centimes en euros
    return data
  })
  return result
    
};


//**************************************** REQUETE POST **********************************************


const  sendData = async (contact, products) => {
  const dataOrder = {
    "contact": contact,
    "products": products,
  }
  console.log(dataOrder)
  const result = await fetch('http://localhost:3000/api/cameras/order', {  
    //fetch méthode qui fait un appel au serveur 
    method: 'POST',
    body: JSON.stringify(dataOrder),
    headers: {
        'Content-Type': 'application/json'
    }
  })
  .then(response => response.text())
  .then(result => JSON.parse(result)) //JSON.parse() = transforme du text en JSON
  .catch(error => console.log('error', error));
        
  return result
}
