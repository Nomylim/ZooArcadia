const InputMail = document.getElementById("MailInput");
const InputPassword = document.getElementById("PasswordInput");
const InputConfirmPassword = document.getElementById("ConfirmPasswordInput");
const btnValidation = document.getElementById("btn-validation-inscription");
const InputSelect = document.getElementById("select");
const formInscription = document.getElementById("formulaireInscription");

const errorMessage = document.getElementById("errorMessage");

InputMail.addEventListener("keyup", validateForm);
InputPassword.addEventListener("keyup", validateForm);
InputConfirmPassword.addEventListener("keyup", validateForm);
InputSelect.addEventListener("change", validateForm);

btnValidation.addEventListener("click",InscrireUtilisteur);

//Fonction permettant de valider tout le formulaire
function validateForm(){
    const mailOk = validateMail(InputMail);
    const passwordOk = validatePassword(InputPassword);
    const confirmationOk = validateConfirmationPassword(InputPassword, InputConfirmPassword);
    const selectOk = validateRequired(InputSelect);

    if(mailOk && passwordOk && confirmationOk && selectOk){
        btnValidation.disabled = false;
        errorMessage.style.display = 'none';
    }
    else{
        btnValidation.disabled = true;
    }
}

//Vérifier l'adresse mail 
function validateMail(input){
    //définir le regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailUser = input.value;
    if(mailUser.match(emailRegex)){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    }
    else{
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

//Vérifier le mot de passe
function validatePassword(input){
    //Définir mon regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    const passwordUser = input.value;
    if(passwordUser.match(passwordRegex)){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid"); 
        return true;
    }
    else{
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

//Valider la confirmation de mot de passe
function validateConfirmationPassword(inputPwd, inputConfirmPwd){
    if(inputPwd.value == inputConfirmPwd.value){
        inputConfirmPwd.classList.add("is-valid");
        inputConfirmPwd.classList.remove("is-invalid");
        return true;
    }
    else{
        inputConfirmPwd.classList.add("is-invalid");
        inputConfirmPwd.classList.remove("is-valid");
        return false;
    }
}

function InscrireUtilisteur() {

    let dataForm = new FormData(formInscription);

    let email = dataForm.get("name");

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "email": dataForm.get("email"),
        "password": dataForm.get("password"),
        "roles": [
            dataForm.get("roles")
        ]
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch(apiUrl+"registration", requestOptions)
        .then((response) => {
            if(response.ok){
                return response.json();
            }
            else{
                throw new Error("Erreur lors de l'inscription");
            }
        })
        .then((result) => {
            alert("Bravo, utilisateur créé !");
            document.location.href="/connexion";
        })
            
        .catch((error) => {
            alert(error.message);
        });
}