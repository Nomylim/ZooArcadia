// Importer les modules nécessaires
const express = require('express');
const path = require('path');

// Initialiser l'application Express
const app = express();

// Définir un port pour l'application (port dynamique pour Heroku)
const port = process.env.PORT || 3000;

// Configurer un dossier public pour les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));



// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
