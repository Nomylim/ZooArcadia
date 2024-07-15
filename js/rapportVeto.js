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
        /*
        // Supposons que data est un tableau d'objets avec des propriétés "id", "animal", "nourriture", "grammage", "date", "etatanimal" et "description"
        const container = document.getElementById('container');
        container.innerHTML = ''; // Réinitialise le contenu

        data.forEach(rapport => {
            const Element = document.createElement('tr');
            Element.classList.add('rapport');

            const containerID = document.createElement('td');
            containerID.textContent = rapport.id;
            Element.appendChild(containerID);

            const containerAnimal = document.createElement('td');
            containerAnimal.textContent = rapport.animal;
            Element.appendChild(containerAnimal);

            const containerNourriture = document.createElement('td');
            containerNourriture.textContent = rapport.nourriture;
            Element.appendChild(containerNourriture);

            const containerGrammage = document.createElement('td');
            containerGrammage.textContent = rapport.grammage;
            Element.appendChild(containerGrammage);

            const containerDate = document.createElement('td');
            containerDate.textContent = rapport.date;
            Element.appendChild(containerDate);

            const containerEtat = document.createElement('td');
            containerEtat.textContent = rapport.etatanimal;
            Element.appendChild(containerEtat);

            const containerDescription = document.createElement('td');
            containerDescription.textContent = rapport.description;
            Element.appendChild(containerDescription);

            container.appendChild(Element);
        });*/
    })
    .catch(error => {
        console.error('Il y a eu un problème avec la requête fetch:', error);
    });