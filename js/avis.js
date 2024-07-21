//Envoyer les données utilisateur dans la BDD
const InputPseudo = document.getElementById('PseudoInput');
const InputAvis = document.getElementById('TextInput');
const errorMessage = document.getElementById('errorMessage');
const btnAvis = document.getElementById('btnAvis');

InputPseudo.addEventListener("input", validateFormAvis);
InputAvis.addEventListener("input", validateFormAvis);

function validateFormAvis() {
    const pseudoOk = validateRequired(InputPseudo);
    const avisOk = validateRequired(InputAvis);

    if (pseudoOk && avisOk) {
        btnAvis.disabled = false;
        errorMessage.style.display = 'none';
    }
    else {
        btnAvis.disabled = true;
        errorMessage.style.display = 'block';
    }
}

function EnregistrerAvis(event) {
    event.preventDefault();
    let dataForm = new FormData(formAvis);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "pseudo": dataForm.get("pseudo"),
        "avis": dataForm.get("avis"),
    })

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch(apiUrl + "avis", requestOptions)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            else {
                throw new Error("Erreur lors de la création de l'avis");
            }
        })
        .then((result) => {
            alert("Bravo, avis bien ajouté !");
            location.reload();
        })
        .catch((error) => {
            alert(error.message);
        })
}

formAvis.addEventListener("submit", EnregistrerAvis);

//affichage de tous les avis en attente de validation
fetch(apiUrl + 'avis/getAttenteValide')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur réseau');
        }
        return response.json();
    })
    .then(data => {
        console.log('Réponse de l\'API:', data); // Loguer la réponse pour déboguer
        const attenteValidation = document.getElementById('attenteValidation');
        attenteValidation.innerHTML = ''; // Réinitialise le contenu

        data.forEach(avis => {
            const listItem = document.createElement('div');
            listItem.classList.add('form-check');
            listItem.innerHTML = `
			<input class="form-check-input" type="checkbox" value="${avis.id}" id="flexCheck${avis.id}">
			<label class="form-check-label" for="flexCheck${avis.id}">
			  ${avis.pseudo}:
			</label>
			<p> ${avis.avis}</p>
            `;
            attenteValidation.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Il y a eu un problème avec la requête fetch:', error);
    });

//valider les avis sélectionnés
const btnValider = document.getElementById('confirmValider');

btnValider.addEventListener('click', validerAvis);

function validerAvis() {
    const checkedBoxes = document.querySelectorAll('#attenteValidation input[type="checkbox"]:checked');
    const idsToValidate = Array.from(checkedBoxes).map(checkbox => checkbox.value);

    console.log(idsToValidate);

    if (idsToValidate.length > 0) {
        idsToValidate.forEach(id => {
            fetch(`${apiUrl}avis/valide/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Erreur réseau pour l'avis ${id}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(`Avis validé: ${id}`, data);
                    // Supprimer l'élément validé de l'interface
                    const checkbox = document.getElementById(`flexCheck${id}`);
                    if (checkbox) {
                        checkbox.closest('.form-check').remove();
                    }
                    document.location.href="/";
                })
                .catch(error => {
                    console.error(`Erreur lors de la validation de l'avis ${id}:`, error);
                });
        });
    }
}

//Supprimer les avis sélectionner
const btnSupprimer = document.getElementById('confirmSupprimer');

btnSupprimer.addEventListener('click', supprimerAvis);

function supprimerAvis() {
    const checkedBoxes = document.querySelectorAll('#attenteValidation .form-check-input:checked');
    const idsToDelete = Array.from(checkedBoxes).map(checkbox => checkbox.value);

    if (idsToDelete.length > 0) {
        idsToDelete.forEach(id => {
            fetch(`${apiUrl}avis/delete/${id}`, {
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
                .then(data => {
                    console.log('Avis supprimés:', data);
                    // Supprimer les éléments supprimés de l'interface
                    const checkbox = document.getElementById(`flexCheck${id}`);
                    if (checkbox) {
                        checkbox.closest('.form-check').remove();
                    }
                    document.location.href="/";
                })
                .catch(error => {
                    console.error('Erreur lors de la suppression des avis:', error);
                });
        })
    }
}