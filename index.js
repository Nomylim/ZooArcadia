import { fileURLToPath } from 'url'; // Pour recréer __dirname
import { dirname } from 'path'; // Pour recréer __dirname

// Recréer __dirname pour les modules ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Importer dynamiquement express et d'autres modules
import('express').then(expressModule => {
    const express = expressModule.default; // Récupère la fonction express du module importé
    import('path').then(pathModule => {
        const path = pathModule; // Récupère 'path' depuis l'import dynamique

        // Importer le fichier router.js
        import('./Router/router.js').then(routerModule => {
            const { allRoutes } = routerModule; // Récupérer les routes du fichier router.js

            // Initialiser l'application Express
            const app = express();

            // Définir un port pour l'application (port dynamique pour Railway ou Heroku)
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
        console.error('Erreur de chargement du module path:', err);
    });

}).catch(err => {
    console.error('Erreur de chargement d\'express:', err);
});
