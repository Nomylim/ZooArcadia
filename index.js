import { fileURLToPath } from 'url'; // Pour recréer __dirname
import { dirname } from 'path'; // Pour recréer __dirname

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import('express').then(expressModule => {
    const express = expressModule.default;
    import('path').then(pathModule => {
        const path = pathModule;

        // Importer le fichier allRoutes.js
        import('./Router/allRoutes.js').then(routerModule => {
            const { allRoutes } = routerModule;

            if (!allRoutes || !Array.isArray(allRoutes)) {
                throw new Error("allRoutes n'est pas défini ou n'est pas un tableau.");
            }

            const app = express();
            const port = process.env.PORT || 3000;

            // Ajouter les dossiers scss et pages en tant que fichiers statiques
            app.use('/images', express.static(path.join(__dirname, 'images')));
            app.use('/js', express.static(path.join(__dirname, 'js')));
            app.use('/SCSS', express.static(path.join(__dirname, 'scss')));
            app.use('/pages', express.static(path.join(__dirname, 'pages')));

            // Fonction pour gérer les routes
            allRoutes.forEach(route => {
                app.get(route.url, (req, res) => {
                    // Assurez-vous que la route correspond à un fichier HTML existant dans 'pages'
                    res.sendFile(path.join(__dirname, route.pathHtml));
                });
            });

            // Route pour 404
            app.use((req, res) => {
                res.status(404).sendFile(path.join(__dirname, 'pages', '404.html'));
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
