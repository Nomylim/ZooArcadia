//Formulaire de consommation de nourriture

const InputAnimal = document.getElementById('AnimalInput');
const InputNourriture = document.getElementById('NourritureInput');
const InputGrammage = document.getElementById('GrammageInput');
const InputDate = document.getElementById('DateInput');
const InputHeure = document.getElementById('HeureInput'); 
const btnNourriture = document.getElementById('btnNourriture');
const formNourriture = document.getElementById('formulaireNourriture');

const errorMessage = document.getElementById("errorMessage");

btnNourriture.addEventListener("click", EnregistrerNourriture);

InputGrammage.addEventListener("input", validateFormNourriture);
InputNourriture.addEventListener("imput", validateFormNourriture);
InputDate.addEventListener("input", validateFormNourriture);
InputHeure.addEventListener("input", validateFormNourriture);
InputAnimal.addEventListener("change", validateFormNourriture);

function validateFormNourriture(){

    const animalOk = validateRequired(InputAnimal);
    const grammageOk = validateGrammage(InputGrammage);
    const nourritureOk = validateRequired(InputNourriture);
    const dateOk = validateRequired(InputDate);
    const heureOk = validateRequired(InputHeure);


    if(grammageOk && nourritureOk && dateOk && heureOk && animalOk){
        btnNourriture.disabled = false;
        errorMessage.style.display = 'none';
    }
    else{
        btnNourriture.disabled = true;
        errorMessage.style.display = 'block';
    }
}

function validateGrammage(input){
    const grammageRegex = /^[1-9]\d*$/;
    const grammageUser = input.value.trim();
    if(grammageUser.match(grammageRegex)){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true 
    }
    else{
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

function validateRequired(input){
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

function EnregistrerNourriture(){
    let dataForm = new FormData(formNourriture);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "nom": dataForm.get("nom"),
        "grammage": dataForm.get("grammage"),
        "date": dataForm.get("date"),
        "heure": dataForm.get("heure"),
        "animal_id": dataForm.get("animal"),
    })

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch(apiUrl+"nourriture", requestOptions)
    .then((response) => {
        if(response.ok){
            return response.json();
        }
        else {
            throw new Error("Erreur lors de la création de la consommation");
        }
    })
    .then((result) => {
        alert("Bravo, consommation ajouté !");
        location.reload();
    })
    .catch((error) => {
        alert(error.message);
    })
}


