// Importer Express
const express = require('express');

// Créer une instance de l'application
const app = express();

// Définir le port d'écoute
const PORT = process.env.PORT || 3000;

// Configurer une route simple pour tester le serveur
app.get('/', (req, res) => {
    res.send('Bienvenue sur ZooArcadia!');
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Le serveur est démarré sur le port ${PORT}`);
});
