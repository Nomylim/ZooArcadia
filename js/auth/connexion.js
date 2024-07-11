
const InputMail = document.getElementById("MailInput");
const InputPassword = document.getElementById("PasswordInput");
const btnConnex = document.getElementById("btnconnexion");
const ConnexForm = document.getElementById("connexionForm");

btnConnex.addEventListener("click", checkCredentials);

function checkCredentials() {

    let dataForm = new FormData(ConnexForm);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "username": dataForm.get("username"),
        "password": dataForm.get("password")
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch(apiUrl+"login", requestOptions)
        .then((response) => {
            console.log("Response status: ", response.status);
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