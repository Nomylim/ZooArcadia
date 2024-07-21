const formServices = document.getElementById('servicesForm');
const btnServices = document.getElementById('btnservices');
const InputNom = document.getElementById('TitreInput');
const InputDescription = document.getElementById('descriptionInput');

btnServices.addEventListener("click", CreerServices);


//Affichage de tous les services depuis la BDD
fetch(apiUrl + 'services_all')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur réseau');
        }
        return response.json();
    })
    .then(data => {
        // Supposons que data est un tableau d'objets avec des propriétés "id", "nom", et "description"
        const servicesContainer = document.getElementById('servicesContainer');
        servicesContainer.innerHTML = ''; // Réinitialise le contenu

        data.forEach(service => {
            const serviceElement = document.createElement('div');
            serviceElement.classList.add('service');
            serviceElement.innerHTML = `
            <h2>${service.nom}</h2>
            <div class="servicecontent">
            <p>${service.description}</p>
            <img class="w-50" rounded src="../images/logo-sans-nom.png" alt="en travaux">
            </div>
            `;
            servicesContainer.appendChild(serviceElement);
        });
    })
    .catch(error => {
        console.error('Il y a eu un problème avec la requête fetch:', error);
    });

//Récupération des données du formulaire de création de service

function CreerServices(event) {
    event.preventDefault();
    const dataForm = new FormData(formServices);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "nom": dataForm.get("nom"),
        "description": dataForm.get("description"),
    })

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch(apiUrl + 'services', requestOptions)
        .then((response) => {
            if (response.ok) {
                alert('Service ajouté avec succès !');
                location.reload();
                return response.json();
            }
            else {
                alert('Erreur lors de lajout du service');
                throw new Error("Erreur lors de l'inscription");
            }
        })
        .catch((error) => {
            alert(error.message);
        })
}

InputNom.addEventListener("input", validateFormHabitats);
InputDescription.addEventListener("input", validateFormHabitats);

function validateFormHabitats() {
    const nameOk = validateRequired(InputNom);
    const descripOk = validateRequired(InputDescription);

    if (nameOk && descripOk) {
        btnServices.disabled = false;
        errorMessage.style.display = 'none';
    }
    else {
        btnServices.disabled = true;
        errorMessage.style.display = 'block';
    }
}