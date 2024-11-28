import Route from "./Route.js";
import { allRoutes, websiteName } from "./allRoutes.js";

// Création d'une route pour la page 404 (page introuvable)
const route404 = new Route("404", "Page introuvable", "/pages/404.html", []);

// Fonction pour récupérer la route correspondant à une URL donnée
const getRouteByUrl = (url) => {
  let currentRoute = null;
  // Parcours de toutes les routes pour trouver la correspondance
  allRoutes.forEach((element) => {
    if (element.url == url) {
      currentRoute = element;
    }
  });
  // Si aucune correspondance n'est trouvée, on retourne la route 404
  return currentRoute || route404;
};

// Fonction pour charger le contenu de la page
const LoadContentPage = async () => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    console.warn("LoadContentPage ne peut pas être exécutée dans cet environnement.");
    return;
  }

  const path = window.location.pathname; // Récupération de l'URL actuelle
  const actualRoute = getRouteByUrl(path);

  // Vérifier les droits d'accès à la page
  const allRolesArray = actualRoute.autorize;
  if (allRolesArray.length > 0) {
    if (allRolesArray.includes("disconnected")) {
      if (isConnected()) {
        window.location.replace("/");
      }
    } else {
      const roleUser = getRole();
      if (!allRolesArray.includes(roleUser)) {
        window.location.replace("/");
      }
    }
  }

  // Récupération du contenu HTML de la route
  const html = await fetch(actualRoute.pathHtml).then((data) => data.text());
  document.getElementById("main-page").innerHTML = html;

  // Ajout du contenu JavaScript
  if (actualRoute.pathJS != "") {
    let scriptTag = document.createElement("script");
    scriptTag.setAttribute("type", "text/javascript");
    scriptTag.setAttribute("src", actualRoute.pathJS);
    document.querySelector("body").appendChild(scriptTag);
  }

  // Changement du titre de la page
  document.title = `${actualRoute.title} - ${websiteName}`;

  // Afficher ou masquer les éléments en fonction du rôle
  showAndHideElementsForRoles();
};

// Fonction pour gérer les événements de routage (clic sur les liens)
const routeEvent = (event) => {
  if (typeof window === "undefined") {
    console.warn("routeEvent ne peut pas être exécuté dans cet environnement.");
    return;
  }

  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  LoadContentPage();
};

// Gestion de l'événement de retour en arrière dans l'historique du navigateur
if (typeof window !== "undefined") {
  window.onpopstate = LoadContentPage;
  window.route = routeEvent;
  LoadContentPage(); // Chargement du contenu de la page au chargement initial
}
