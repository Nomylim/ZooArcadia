//affichage de tous les habitats
fetch(apiUrl + 'habitats_all')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur réseau');
        }
        return response.json();
    })
    .then(data => {
        const containerhabitats = document.getElementById('allhabitats');
        const containermodals = document.getElementById('modals');
        containermodals.innerHTML = '';
        containerhabitats.innerHTML = '';

        data.forEach(habitats => {
            const habitatItem = document.createElement('article');
            habitatItem.classList.add('articlehabitats');
            habitatItem.innerHTML = `
                <div class="align-items-center ">
                <i class="bi bi-trash3 m-2 supprimerhabitats" data-id="${habitats.id}" id="supprimerhabitats" type="button" data-bs-toggle="modal" data-bs-target="#SupprimerModal" data-show="admin"></i>
			    <h2 class="text-center">${habitats.name}</h2>
			    <p class="px-3 text-center">${habitats.description}</p>
		        </div>
		        <div class="align-items-center p-3">
			        <div class="col text-center">
				        <img class="w-50 rounded" src="../images/sapiens.png" alt="en travaux" type="button" data-bs-toggle="modal" data-bs-target="#${habitats.id}Modal">
			        </div>
		        </div>
            `;
            containerhabitats.appendChild(habitatItem);

            const habitatModal = document.createElement('div');
            habitatModal.classList.add('modal', 'fade');
            habitatModal.id = `${habitats.id}Modal`;
            habitatModal.setAttribute('tabindex', '-1');
            habitatModal.setAttribute('aria-labelledby', `${habitats.id}ModalLabel`);
            habitatModal.setAttribute('aria-hidden', 'true');
            habitatModal.innerHTML = `
                <div class="modal-dialog">
		            <div class="modal-content">
			            <div class="modal-header bg-dark">
				            <h5 id="${habitats.id}ModalLabel  class="modal-title">${habitats.name}</h5>
				            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			            </div>
                        <div class="modal-body bg-light">
                                <p>Loading...</p>
                        </div>
                    </div>
                </div>
            `;
            containermodals.appendChild(habitatModal);

            //Event listener pour charger les animaux quand la modal est ouverte
            habitatModal.addEventListener('show.bs.modal', () => {
                fetch(apiUrl + `habitats/habitats_animaux/${habitats.id}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Erreur réseau');
                        }
                        return response.json();
                    })
                    .then(animaux => {
                        const modalBody = habitatModal.querySelector('.modal-body');
                        if (animaux.length > 0) {
                            modalBody.innerHTML = animaux.map(animal =>
                                `<h2 >${animal.prenom}</h2>
                                <p>${animal.race}</p>
                                <img class="w-50 rounded mb-3" src="../images/animaux.jpg" alt="en travaux"
                                <br>`
                            ).join('');
                        } else {
                            modalBody.innerHTML = '<p>Aucun animal trouver pour cet habitat</p>';
                        }
                    })
                    .catch(error => {
                        console.error('Il y a eu un problème avec la requête fetch:', error);
                    });
            });
            //Supprimer un habitat : 
            const deleteIcons = document.querySelectorAll('.supprimerhabitat');
            deleteIcons.forEach(icon => {
                icon.addEventListener('click', (event) => {
                    const habitatId = event.currentTarget.getAttribute('data-id');
                    const btnSupp = document.getElementById('confirmSupprimerModal');
                    btnSupp.addEventListener("click", () => supprimerHabitat(habitatId));

                    function supprimerHabitat(habitatId) {
                        fetch(apiUrl + `habitats/${habitats.id}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Erreur réseau');
                                }
                            })
                            .then(() => {
                                console.log('Habitat supprimé:', habitatId);
                                const hab = document.getElementById(`${habitats.id}Modal`);
                                if (hab) {
                                    hab.closest('.modal').remove();
                                }
                                alert("Habitat supprimé !")
                                location.reload();
                            })
                            .catch(error => {
                                console.error(`Erreur lors de la suppression de l'avis ${id}:`, error);
                            });
                    }
                })
            })
        })
    })
    .catch(error => {
        console.error('Il y a eu un problème avec la requête fetch:', error);
    });

const InputName = document.getElementById('NameInput');
const InputDescript = document.getElementById('descriptionInput');
const btnHabitats = document.getElementById('btnHabitats');

InputName.addEventListener("input", validateFormHabitats);
InputDescript.addEventListener("input", validateFormHabitats);

function validateFormHabitats() {
    const nameOk = validateRequired(InputName);
    const descripOk = validateRequired(InputDescript);

    if (nameOk && descripOk) {
        btnHabitats.disabled = false;
        errorMessage.style.display = 'none';
    }
    else {
        btnHabitats.disabled = true;
        errorMessage.style.display = 'block';
    }
}
function EnregistrerHabitats(event) {
    event.preventDefault();
    let dataForm = new FormData(habitaitsForm);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "name": dataForm.get("name"),
        "description": dataForm.get("description"),
    })

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch(apiUrl + "habitats", requestOptions)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            else {
                throw new Error("Erreur lors de la création de l'habitat");
            }
        })
        .then((result) => {
            alert("Bravo, habitat bien ajouté !");
            location.reload();
        })
        .catch((error) => {
            alert(error.message);
        })
}

habitaitsForm.addEventListener("submit", EnregistrerHabitats);