// ********************************* VARIABLES RÉCUPÉRATION COMMANDE **********************************
const myOrder = JSON.parse(localStorage.getItem('successOrder'))


// ********************************* FONCTION CHARGEMENT CONTENU **********************

if(myOrder){ //Si l'objet myOrder existe dans le local storage
    //Fonction qui affiche le message destiné au user
    const createdOrder = () => {
        let htmlOfMyOrder = 
        `
        <h3 class="mb-5">Votre commande est passée !</h3>
        <h4>Merci <strong>${myOrder[0].contact.firstName} ${myOrder[0].contact.lastName}</strong>!</h4>
        <br>
        <p>Nous espérons vous revoir bientôt ! =)</p>
        <p>N° de commande : <strong>${myOrder[0].orderId}</strong></p>
        <p>Le montant total de vos achats est de : <strong>${myOrder[1]} €</strong></p>
        `
        
    document.getElementById('commandId').innerHTML = htmlOfMyOrder;
     
    }
    createdOrder();
    localStorage.removeItem('object', 'successOrder') //Retire du localStorage les différents objets
} 


if(!myOrder){
    document.location.href = "index.html"
    //Renvoie l'utilisateur sur la page d'accueil
}
