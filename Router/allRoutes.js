import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html", [], "/js/home.js"),
    new Route("/services", "Services", "/pages/services.html",[], "/js/services.js"),
    new Route("/habitats", "Habitats", "/pages/habitats.html",[], "js/habitats.js"),
    new Route("/connexion", "Connexion", "/pages/connexion.html",[],"/js/auth/connexion.js"),
    new Route("/avis", "Avis", "/pages/avis.html",[], "/js/avis.js"),
    new Route("/contact", "Contact", "/pages/contact.html",[],"js/contact.js"),
    new Route("/inscription","Inscription","/pages/inscription.html",["admin"],"/js/auth/inscription.js"), //ajouter blocage pour admin
    new Route("/animaux", "Animaux", "/pages/animaux.html", ["admin","employ","veto"], "js/animaux.js"),
    new Route("/rapportVeto", "Rapports Vétérinaires", "/pages/rapportVeto.html",["admin","veto"],"/js/rapportVeto.js"), //ajouter blocage admin
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Zoo Arcadia";