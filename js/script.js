const tokenCookieName = "accesstoken";
const RoleCookieName = "role";
const btnDeconnex = document.getElementById("deconnexion-btn");
const apiUrl = "https://127.0.0.1:8000/api/";
const RedisUrl = "https://127.0.0.1:8000/";

btnDeconnex.addEventListener("click", signout);

function getRole() {
    return getCookie(RoleCookieName);
}

function signout() {
    eraseCookie(tokenCookieName);
    eraseCookie(RoleCookieName);

    if (typeof window !== "undefined") {
        window.location.reload(); // Recharger la page si l'environnement est un navigateur
    } else {
        console.warn("La fonction signout est exécutée dans un environnement où window n'est pas défini.");
    }
}


function setToken(token) {
    setCookie(tokenCookieName, token, 7);
}

function getToken() {
    return getCookie(tokenCookieName);
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function isConnected() {
    if (getToken() == null || getToken == undefined) {
        return false;
    }
    return true;
}

function showAndHideElementsForRoles() {
    const userConnected = isConnected();
    const role = getRole();

    let allElementsToEdit = document.querySelectorAll('[data-show]');

    allElementsToEdit.forEach(element => {
        switch (element.dataset.show) {
            case 'disconnected':
                if (userConnected) {
                    element.classList.add("d-none");
                }
                break;
            case 'connected':
                if (!userConnected) {
                    element.classList.add("d-none");
                }
                break;
            case 'admin':
                if (!userConnected || role != "admin") {
                    element.classList.add("d-none");
                }
                break;
            case 'veto':
                if (!userConnected || role != "veto") {
                    element.classList.add("d-none");
                }
                break;
            case 'employ':
                if (!userConnected || role != "employ") {
                    element.classList.add("d-none");
                }
                break;
        }
    })
}

function sanitizeHtml(text) {
    const tempHtml = document.createElement('div');
    tempHtml.textContent = text;
    return tempHtml.innerHTML;
}

function validateRequiredSimple(input){
    if(input.value.trim() !== ''){
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

function validateRequired(input) {
    const value = input.value.trim();
    //vérifie si le champ est vide
    if(value === ''){
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
    //vérifie si champ correspond au regex
    try {
        validatePattern(value)
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    }
    catch(error) {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

function validatePattern(value) {
    const regex = /^[A-Za-z0-9.,!?'\séèàçùêîôâœ:;]+$/;
    if (!regex.test(value)) {
        throw new Error(`La valeur "${value}" ne doit pas avoir de ponctuation`);
    }
    return true;
}