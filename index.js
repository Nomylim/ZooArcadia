// Importer les modules nécessaires
const express = import('express');
const path = import('path');

// Importer le fichier router.js
const { allRoutes } = import('./Router/router.js'); 

// Initialiser l'application Express
const app = express();

// Définir un port pour l'application (port dynamique pour Heroku)
const port = process.env.PORT || 3000;

// Configurer un dossier public pour les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Fonction pour gérer les routes
allRoutes.forEach(route => {
    app.get(route.url, (req, res) => {
        res.sendFile(path.join(__dirname, route.pathHtml));
    });
});

// Route pour 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '/pages/404.html'));
});


// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
