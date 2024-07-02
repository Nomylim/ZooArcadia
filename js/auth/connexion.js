//Implémenter le JS de ma page

const InputMail = document.getElementById("MailInput");
const InputPassword = document.getElementById("PasswordInput");
const btnConnex = document.getElementById("btnconnexion");

btnConnex.addEventListener("click", checkCredentials);

function checkCredentials(){
    // Ici il faudra appeler l'API pour vérifier les credentials en BDD
    if(InputMail.value == "mail@mail.com" && InputPassword.value == "123"){
        const token = "fismgri";
        setToken(token);

        setCookie(RoleCookieName, "veto", 7);
        window.location.replace("/");
    }
    else{
        InputMail.classList.add("is-invalid");
        InputPassword.classList.add("is-invalid");
    }
}