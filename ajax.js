// // ************************* VARIABLES APPEL AJAX **************************
const sendData = (url) => {
  sendHttpRequest('POST', url)
}

// // *********************** FONCTION EXÉCUTE APPEL *************************

function sendHttpRequest(method, url, data){
  return fetch(url, {
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
}