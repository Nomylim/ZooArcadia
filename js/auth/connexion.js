
const InputMail = document.getElementById("MailInput");
const InputPassword = document.getElementById("PasswordInput");
const btnConnex = document.getElementById("btnconnexion");
const ConnexForm = document.getElementById("connexionForm");

btnConnex.addEventListener("click", checkCredentials);


InputMail.addEventListener("input", validateFormConnexion);
InputPassword.addEventListener("input", validateFormConnexion);

function validateFormConnexion(){
    const mailOk = validateMail(InputMail);
    const passOk = validateRequiredSimple(InputPassword);

    if (mailOk && passOk) {
        btnConnex.disabled = false;
        errorMessage.style.display = 'none';
    }
    else {
        btnConnex.disabled = true;
        errorMessage.style.display = 'block';
    }
}

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

function checkCredentials() {

    let dataForm = new FormData(ConnexForm);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    const raw = JSON.stringify({
        "username": sanitizeHtml(dataForm.get("username")),
        "password": sanitizeHtml(dataForm.get("password")),
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch(apiUrl+"login", requestOptions)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            else {
                InputMail.classList.add("is-invalid");
                InputPassword.classList.add("is-invalid");
            }
        })
        .then((result) => {
            console.log("Result: ", result);
            const token = result.apiToken;
            setToken(token);
            setCookie(RoleCookieName, result.roles[0],7);

            alert("Bravo, vous êtes connecté !");
            document.location.href = "/";
        })

        .catch((error) => {
            console.log("Error: ", error);
            alert(error.message);
        });
}