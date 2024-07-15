const formServices = document.getElementById('servicesForm');
const btnServices = document.getElementById('btnservices');

btnServices.addEventListener("click", CreerServices);


//Affichage de tous les services depuis la BDD
fetch(apiUrl+'services_all') 
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

            const serviceTitle = document.createElement('h2');
            serviceTitle.textContent = service.nom;
            serviceElement.appendChild(serviceTitle);

            const serviceDescription = document.createElement('p');
            serviceDescription.textContent = service.description;
            serviceElement.appendChild(serviceDescription);

            servicesContainer.appendChild(serviceElement);
        });
    })
    .catch(error => {
        console.error('Il y a eu un problème avec la requête fetch:', error);
    });

//Récupération des données du formulaire de création de service

function CreerServices(){
    //Récupérer le formulaire
    const formData = new FormData(formServices);

    //Récupérer l'image uploadé
    const fileInput = formServices.querySelector('input[type="file"]'); 
    if(fileInput.files.lenght > 0){
        formData.append('file', fileInput.files[0]);
    }

    // Debug: Afficher les valeurs du FormData
    for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }

    const requestOptions = {
        method: "POST",
        body: formData,
        redirect: "follow"
    };

    fetch(apiUrl+'services', requestOptions)
        .then((response) => {
            if(response.ok){
                alert('Service ajouté avec succès !');
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