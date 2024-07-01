//Implémenter le JS de ma page

const InputMail = document.getElementById("MailInput");
const InputPassword = document.getElementById("PasswordInput");

InputMail.addEventListener("keyup", validateForm);
InputPassword.addEventListener("keyup", validateForm);


function validateForm(){
    validateRequired(InputMail);
    validateRequired(InputPassword);
}

function validateRequired(input){
    if(input.value != ''){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
    }
    else{
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
    }
}