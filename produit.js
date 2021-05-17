// ********************************* VARIABLES **********************************

let btnPopup = document.querySelector('.btnPopup');
let overlay = document.getElementById('overlay');
let btnClose = document.getElementById('btnClose');


// ******************************** POPUP ***************************************
// Fonction d'ouverture popup
btnPopup.addEventListener('click',openMoadl);
function openMoadl() {
overlay.style.display='block';
};

// Fonction de fermeture popup
btnClose.addEventListener('click',closeModal);
function closeModal() {
overlay.style.display='none';
};