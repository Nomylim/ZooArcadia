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
    })
    .catch((error) => {
        alert(error.message);
    })
}

//Formualire de rapports vétérinaires
const InputAnimal2 = document.getElementById('AnimalInput2');
const InputNourriture2 = document.getElementById('NourritureInput2');
const InputGrammage2 = document.getElementById('GrammageInput2');
const InputDate2 = document.getElementById('DateInput2');
const InputEtat = document.getElementById('EtatInput'); 
const InputDescription = document.getElementById('DescriptionInput');
const btnRapport = document.getElementById('btnRapport');
const formRapport = document.getElementById('formulaireRapport');

btnRapport.addEventListener("click", EnregistrerRapport);

InputGrammage2.addEventListener("input", validateFormRapport);
InputNourriture2.addEventListener("imput", validateFormRapport);
InputDate2.addEventListener("input", validateFormRapport);
InputEtat.addEventListener("input", validateFormRapport);
InputAnimal2.addEventListener("change", validateFormRapport);
InputDescription.addEventListener("input", validateFormRapport);


function validateFormRapport(){

    const animalOk = validateRequired(InputAnimal2);
    const grammageOk = validateGrammage(InputGrammage2);
    const nourritureOk = validateRequired(InputNourriture2);
    const dateOk = validateRequired(InputDate2);
    const etatOk = validateRequired(InputEtat);

    console.log(`Animal: ${animalOk}, Grammage: ${grammageOk}, Nourriture: ${nourritureOk}, Date: ${dateOk}, Etat: ${etatOk}`);

    if(grammageOk && nourritureOk && dateOk && etatOk && animalOk){
        btnRapport.disabled = false;
        errorMessage.style.display = 'none';
    }
    else{
        btnRapport.disabled = true;
        errorMessage.style.display = 'block';
    }
}

function EnregistrerRapport(){
    let dataForm = new FormData(formRapport);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "nourriture": dataForm.get("nom"),
        "grammage": dataForm.get("grammage"),
        "date": dataForm.get("date"),
        "etatanimal": dataForm.get("etat"),
        "description": dataForm.get("description"),
        "animal_id": dataForm.get("animal"),
    })

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch(apiUrl+"rapportveterinaires", requestOptions)
    .then((response) => {
        if(response.ok){
            return response.json();
        }
        else {
            throw new Error("Erreur lors de la création du rapport vétérinaire");
        }
    })
    .then((result) => {
        alert("Bravo, rapport vétérinaire ajouté !");
    })
    .catch((error) => {
        alert(error.message);
    })
}
