//**************************************** FONCTION D'ENVOI FORMULAIRE *********************************** */
 

const sendForm = (e) => {
  
    console.log(e);
    e.preventDefault()

    document.getElementById('form-err').innerHTML = ""
    const contact = getUserData();
    const errors = [];

    const regexNoNum = /^[A-Za-zàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+$/;
    const regexZipFr = /\b\d{5}\b/;

    document.getElementById('firstName').classList.remove('is-valid', 'is-invalid') // Permet de changer la couleur des inputs 
    document.getElementById('lastName').classList.remove('is-valid', 'is-invalid')
    document.getElementById('address').classList.remove('is-valid', 'is-invalid')
    document.getElementById('city').classList.remove('is-valid', 'is-invalid')
    document.getElementById('email').classList.remove('is-valid', 'is-invalid')
    document.getElementById('zip').classList.remove('is-valid', 'is-invalid')
  
    // Test firstName
    let firstNameValid = true
    if(!regexNoNum.test(contact.firstName)) {
        errors.push('Le prénom doit uniquement contenir des lettres')
        firstNameValid = false
    }
    document.getElementById('firstName').classList.add(firstNameValid ? 'is-valid' : 'is-invalid')
  
    // Test lastname
    let lastNameValid = true
    if(!regexNoNum.test(contact.lastName)) {
        errors.push('Le nom doit uniquement contenir des lettres')
        lastNameValid = false
    }
    document.getElementById('lastName').classList.add(lastNameValid ? 'is-valid' : 'is-invalid')
    
    // Test city
    let cityValid = true
    if(!regexNoNum.test(contact.city)) {
        errors.push('La ville doit uniquement contenir des lettres')
        cityValid = false
    }
    document.getElementById('city').classList.add(cityValid ? 'is-valid' : 'is-invalid')
    
     // Test zip
    let zipValid = true
    if (!regexZipFr.test(contact.zip)) {
        errors.push("ce code postal n'est pas valide. exemple : 75001")
        zipValid = false;
    }
    document.getElementById('zip').classList.add(zipValid ? 'is-valid' : 'is-invalid')
  
    // Test address
    let addressValid = true
    document.getElementById('address').classList.add(addressValid ? 'is-valid' : 'is-invalid')
  
  
    // Test email
    let emailValid= true
    document.getElementById('email').classList.add(emailValid ? 'is-valid' : 'is-invalid')
  
    if(!errors.length) {
        //Si pas d'erreur créer la commande
        createOrder(); 
  
    } else {
        //Sinon afficher les différentes zones erronées
        let htmlError = ''
        for(const error of errors) {
            htmlError += `${error} <br/>`
        }
      document.getElementById('form-err').innerHTML = htmlError;
      document.getElementById('form-err').classList.add('text-danger'); // Donne une couleur rouge au texte
    };
  
}
  
