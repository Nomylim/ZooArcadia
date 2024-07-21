//Formualire de rapports vétérinaires
const InputAnimal = document.getElementById('AnimalInput');
const InputNourriture = document.getElementById('NourritureInput');
const InputGrammage = document.getElementById('GrammageInput');
const InputDate = document.getElementById('DateInput');
const InputEtat = document.getElementById('EtatInput'); 
const InputDescription = document.getElementById('DescriptionInput');
const btnRapport = document.getElementById('btnRapport');
const formRapport = document.getElementById('formulaireRapport');


InputGrammage.addEventListener("input", validateFormRapport);
InputNourriture.addEventListener("input", validateFormRapport);
InputDate.addEventListener("input", validateFormRapport);
InputEtat.addEventListener("input", validateFormRapport);
InputAnimal.addEventListener("change", validateFormRapport);
InputDescription.addEventListener("input", validateFormRapport);


function validateFormRapport(){

    const animalOk = validateRequired(InputAnimal);
    const grammageOk = validateGrammage(InputGrammage);
    const nourritureOk = validateRequired(InputNourriture);
    const dateOk = validateRequiredSimple(InputDate);
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

fetch(apiUrl+'animaux_all')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur réseau');
        }
        return response.json();
    })
    .then(data => {
        const containerAnimaux = document.getElementById('AnimalInput');
        containerAnimaux.innerHTML ='';
        data.forEach(animaux =>{
            const animauxItem = document.createElement('option');
            animauxItem.value = animaux.id;
            animauxItem.innerHTML = animaux.prenom;
            containerAnimaux.appendChild(animauxItem);
        })
    })
    .catch(error => {
        console.error('Il y a eu un problème avec la requête fetch:', error);
    });

function EnregistrerRapport(event){
    event.preventDefault();
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
        location.reload();
    })
    .catch((error) => {
        alert(error.message);
    })
}

formRapport.addEventListener("submit", EnregistrerRapport);

$(document).ready(function() {
    // Initialiser la table avec des options
    $('#table').bootstrapTable({
        search: true,
        filterControl: true,
        showExport: true,
        clickToSelect: true,
        sortable: true,
        toolbar: '#toolbar'
    });
});

fetch(apiUrl+'rapportveterinaires_all') 
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur réseau');
        }
        return response.json();
    })
    .then(data => {
        $('#table').bootstrapTable('load', data);
    })
    .catch(error => {
        console.error('Il y a eu un problème avec la requête fetch:', error);
    });