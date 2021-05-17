// ************************* FONCTION APPEL AJAX **************************
function ajaxPost(url, data) {
    const promise = new Promise(function(resolve, reject){
        let request = new XMLHttpRequest();
        request.open('POST', url);
        request.setRequestHeader('content-Type', 'application/json');
        request.onreadystatechange = function(){
            if (request.status >= 200 && request.status < 400){
                resolve(JSON.parse(request.responseText));
            } else {
                reject (request.status);
            } 
        };
        request.send(data);
    });
    return promise;
}

// *********************** FONCTION EXÉCUTE APPEL *************************

function ajaxGet(url) {
    const promise = new Promise(function (resolve, reject) {
      const request = new XMLHttpRequest();
      request.open("GET", url, true);
      request.onreadystatechange = function () {
        if (request.readyState === 4) {
          if (request.status === 200) {
            resolve(JSON.parse(request.responseText));
          } else {
            reject(request.status);
          }
        }
      };
      request.send();
    });
    return promise;
}