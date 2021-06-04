// ********************************* VARIABLES **********************************
let commandeStorage = JSON.parse(localStorage.getItem("orderId")); 
// let orderCommandShow = document.getElementById('orderCommand')
// let orderCommandhidden = document.getElementById('orderCommandhidden')
let commandDescription = 
`
<h3>Votre commande est passée !</h3>
<p>Nous vous remercions ${commandeStorage.contact.firstName} ${commandeStorage.contact.lastName}, et espérons vous revoir bientôt ! =)</p>
<p>Votre identifiant de commande est le : ${commandeStorage.orderId}</p>
<p>Le montant de vos achats est de : </p>
`

// ********************************* RÉCUPÉRATION COMMANDE **********************
if (commandeStorage !== null){
    let commande = document.getElementById('commandId');
// ********************************* FONCTION CHARGEMENT CONTENU ****************


}