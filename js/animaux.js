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

function validateFormNourriture() {

    const animalOk = validateRequired(InputAnimal);
    const grammageOk = validateGrammage(InputGrammage);
    const nourritureOk = validateRequired(InputNourriture);
    const dateOk = validateRequiredSimple(InputDate);
    const heureOk = validateRequired(InputHeure);


    if (grammageOk && nourritureOk && dateOk && heureOk && animalOk) {
        btnNourriture.disabled = false;
        errorMessage.style.display = 'none';
    }
    else {
        btnNourriture.disabled = true;
        errorMessage.style.display = 'block';
    }
}

function validateGrammage(input) {
    const grammageRegex = /^[1-9]\d*$/;
    const grammageUser = input.value.trim();
    if (grammageUser.match(grammageRegex)) {
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


function EnregistrerNourriture() {
    let dataForm = new FormData(formNourriture);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "nom": dataForm.get("nom"),
        "grammage": dataForm.get("grammage"),
        "date": dataForm.get("date"),
        "heure": dataForm.get("heure"),
        "animal": dataForm.get("animal"),
    })

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch(apiUrl + "nourriture", requestOptions)
        .then((response) => {
            if (response.ok) {
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

//enregister un nouvel animal
const InputPrenom = document.getElementById('PrenomInput');
const InputRace = document.getElementById('RaceInput');
const btnAnimal = document.getElementById('btnAnimal');
const formAnimal = document.getElementById('FormAnimal');

InputPrenom.addEventListener("input", validateFormAnimal);
InputRace.addEventListener("input", validateFormAnimal);

function validateFormAnimal(){
    const prenomOk = validateRequired(InputPrenom);
    const raceOk = validateRequired(InputRace);

    if(prenomOk && raceOk){
        btnAnimal.disabled = false;
        errorMessage.style.display = 'none';
    }
    else {
        btnAnimal.disabled = true;
        errorMessage.style.display = 'block';
    }
}

fetch(apiUrl+'habitats_all')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur réseau');
        }
        return response.json();
    })
    .then(data => {
        const containerHabitat = document.getElementById('HabitatInput');
        containerHabitat.innerHTML ='';
        data.forEach(habitats =>{
            const habitatsItem = document.createElement('option');
            habitatsItem.value = habitats.id;
            habitatsItem.innerHTML = habitats.name;
            containerHabitat.appendChild(habitatsItem);
        })
    })
    .catch(error => {
        console.error('Il y a eu un problème avec la requête fetch:', error);
    });


function EnregistrerAnimal() {
    let dataForm = new FormData(formAnimal);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "prenom": dataForm.get("prenom"),
        "race": dataForm.get("race"),
        "habitat_id": dataForm.get("habitat"),
    })

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch(apiUrl + "animaux", requestOptions)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            else {
                throw new Error("Erreur lors de la création de la consommation");
            }
        })
        .then((result) => {
            alert("Bravo, animal ajouté !");
            location.reload();
        })
        .catch((error) => {
            alert(error.message);
        })
}
btnAnimal.addEventListener("click", EnregistrerAnimal);


//tableau des vues des animaux
$(document).ready(function(){
    //Initialiser la table avec des options
    $('#tableVues').bootstrapTable({
        search: true,
        filterControl: true,
        showExport: true,
        clickToSelect: true,
        sortable: true,
        toolbar: '#toolbarVues'
    });

    fetch(RedisUrl + 'animal/vues')
        .then(response => {
            if(!response.ok){
                throw new Error('Erreur réseau');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data received: ', data);
            data.forEach(item => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                <td>${item.animalId}</td>
                <td>${item.prenom}</td>
                <td>${item.count}</td>
                `;
                document.getElementById('containerVues').appendChild(row);
            });
            $('#tableVues').bootstrapTable('load', data);
        })
        .catch(error => {
            console.error('Il y a eu un problème avec la requête fetch:', error);
        });
});


//tabbleau des consommations de nourritures
$(document).ready(function () {
    // Initialiser la table avec des options
    $('#tableNourriture').bootstrapTable({
        search: true,
        filterControl: true,
        showExport: true,
        clickToSelect: true,
        sortable: true,
        toolbar: '#toolbarNourriture'
    });

    fetch(apiUrl + 'nourriture_all')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur réseau');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data received:', data);
            data.forEach(item => {

                const row = document.createElement('tr');
                const animalId = (item.animal && item.animal.id!==undefined)  ? item.animal.id : 'N/A';
            
                row.innerHTML = `
                <td>${item.id}</td>
                <td>${animalId}</td>
                <td>${item.nom}</td>
                <td>${item.grammage}</td>
                <td>${item.date}</td>
                <td>${item.heure}</td>
            `;
                document.getElementById('containerNourriture').appendChild(row);
            });
            $('#tableNourriture').bootstrapTable('load', data);
        })
        .catch(error => {
            console.error('Il y a eu un problème avec la requête fetch:', error);
        });
});
