// Importer dynamiquement express et d'autres modules
import('express').then(expressModule => {
    const express = expressModule.default;  // Récupérer la fonction express
    const path = require('path');           // Importation standard de path

    // Importer le fichier router.js
    import('./Router/router.js').then(routerModule => {
        const { allRoutes } = routerModule; // Récupérer les routes du fichier router.js

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
    }).catch(err => {
        console.error('Erreur de chargement des routes:', err);
    });

}).catch(err => {
    console.error('Erreur de chargement d\'express:', err);
});
