const form = document.getElementById('contact-form');
const btnEnvoyer = document.getElementById('btnEnvoyer');
const titreInput = document.getElementById('TitreInput');
const mailInput = document.getElementById('MailInput');
const textArea = document.getElementById('TextInput');

// Écouteurs d'événements pour les champs de formulaire
titreInput.addEventListener('input', checkFormValidity);
mailInput.addEventListener('input', checkFormValidity);
textArea.addEventListener('input', checkFormValidity);

// Fonction de validation de l'e-mail
function isValidEmail(input) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailUser = input.value;
    if (mailUser.match(regex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true
    }
    else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

// Fonction pour vérifier et mettre à jour l'état du bouton
function checkFormValidity() {
    const titreOk = validateRequiredFields(titreInput);
    const mailOk = isValidEmail(mailInput);
    const textOk = validateRequiredFields(textArea);

    console.log(`Titre: ${titreOk}, Mail: ${mailOk}, texte: ${textOk}`);

    if (titreOk && mailOk && textOk) {
        btnEnvoyer.disabled = false;
    } else {
        btnEnvoyer.disabled = true;
    }
}

// Écouteur d'événement pour le formulaire
form.addEventListener('submit', function (event) {
    event.preventDefault();
    // Extraction des valeurs des champs du formulaire
    const titre = titreInput.value;
    const mail = mailInput.value;
    const message = textArea.value;

    // Envoi du formulaire par EmailJS
    emailjs.send('service_amegxdc', 'template_34f1l1f', {
        titre: titre,
        mail: mail,
        message: message
    }).then(function (response) {
        alert('Votre message a bien été envoyé !');
        // Réinitialisation du formulaire après envoi
        form.reset();
        document.getElementById('btnEnvoyer').setAttribute('disabled', 'disabled');
    }, function (error) {
        alert('Une erreur est survenue.')
        console.log('Erreur lors de l\'envoi du formulaire : ', error);
    });
});
emailjs.init("KS_LT-IAagg_yKFXV");


