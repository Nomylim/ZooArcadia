var element = document.querySelector('#AvisCarousel')
var carousel = new bootstrap.Carousel(element);

//affichage de tous les avis
fetch(apiUrl+'avis/getAllValide') 
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur réseau');
        }
        return response.json();
    })
    .then(data => {
        console.log('Réponse de l\'API:', data); // Loguer la réponse pour déboguer
        const carouselInner = document.getElementById('carousel-inner');
        data.avis.forEach((avis, index) => {
            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            if(index == 0){
                carouselItem.classList.add('active');
            }
            carouselItem.innerHTML = `
            <div class="d-flex justify-content-center">
                <div class="cardAvis" style="width:18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${avis.pseudo}</h5>
                        <p class="card-text">${avis.avis}</p>
                    </div>
                </div>
            </div>
            `;
            carouselInner.appendChild(carouselItem);
        });
    })
    .catch(error => {
        console.error('Il y a eu un problème avec la requête fetch:', error);
    });