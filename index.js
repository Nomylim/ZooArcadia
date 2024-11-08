// Importer les modules nécessaires
const express = require('express');
const path = require('path');

// Initialiser l'application Express
const app = express();

// Définir un port pour l'application (port dynamique pour Heroku)
const port = process.env.PORT || 3000;

// Configurer un dossier public pour les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Définir une route simple pour la page d'accueil
app.get('/', (req, res) => {
    res.send('Bienvenue sur mon application déployée avec Heroku !');
});

// Définir une route de test
app.get('/services', (req, res) => {
    res.json({
        message: 'Bienvenue dans les services de l\'application',
        version: '1.0.0'
    });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
