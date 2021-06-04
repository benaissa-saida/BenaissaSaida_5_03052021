// // ************************* VARIABLES APPEL AJAX **************************
const urlApiCameras = "http://localhost:3000/api/cameras";



const getAll = async apiUrl => {

  const result = fetch(apiUrl)
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
    //Nous permet de convertire les données d'une chaine avant de les transmettre 
    const data = JSON.parse(JSON.stringify(result))
    data.map(e => e.price = e.price / 100);
    // Divise le prix par 100 pour convertir les centimes en euros
    return data
  })
  return result
    
};

const getId = async apiUrl => {

  const result = fetch(apiUrl)
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
    //Nous permet de convertire les données d'une chaine avant de les transmettre 
    const data = JSON.parse(JSON.stringify(result))
    data.price = data.price / 100;
    // Divise le prix par 100 pour convertir les centimes en euros
    return data
  })
  return result
    
};


//***********************************************************************************************


// function sendData(contact, products) {
//   const data = {
//     "contact": contact,
//     "products": products
//   }
//   console.log(data)
//   const result = fetch('http://localhost:3000/api/cameras/order', {  //fetch méthode qui fait un appel au serveur 
//     method: 'POST',
//     body: JSON.stringify(data),
//     headers: {
//         'Content-Type': 'application/json'
//     }
//   })
//     .then(response => response.text())
//     .then(result => JSON.parse(result)) //JSON.parse() = transforme du text en JSON
//     .catch(error => console.log('error', error));

//   return result



// // *********************** FONCTION EXÉCUTE APPEL *************************

