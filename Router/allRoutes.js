import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html", []),
    new Route("/services", "Services", "/pages/services.html",[], "/js/services.js"),
    new Route("/habitats", "Habitats", "/pages/habitats.html",[]),
    new Route("/connexion", "Connexion", "/pages/connexion.html",[],"/js/auth/connexion.js"),
    new Route("/avis", "Avis", "/pages/avis.html",[]),
    new Route("/contact", "Contact", "/pages/contact.html",[]),
    new Route("/inscription","Inscription","/pages/inscription.html",[],"/js/auth/inscription.js"), //ajouter blocage pour admin
    new Route("/animaux", "Animaux", "/pages/animaux.html", [], "js/animaux.js"),
    new Route("/rapportVeto", "Rapports Vétérinaires", "/pages/rapportVeto.html",[],"/js/rapportVeto.js"), //ajouter blocage admin
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Zoo Arcadia";