// // ************************* VARIABLES APPEL AJAX **************************
const sendData = (url) => {
  sendHttpRequest('POST', url)
}

// // *********************** FONCTION EXÉCUTE APPEL *************************

function sendAll(method, url, data){
  const result = fetch(url, {
    method : method, 
    body: JSON.stringify(data),
    headers : data ? {'Content-Type': 'application/json'} : {}
  }).then(response => {
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
}



function sendId(method, url, data){
  const result = fetch(url, {
    method : method, 
    body: JSON.stringify(data),
    headers : data ? {'Content-Type': 'application/json'} : {}
  }).then(response => {
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
}