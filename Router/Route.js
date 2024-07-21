export default class Route {
    constructor(url, title, pathHtml, autorize, pathJS ="") {
        this.url = url;
        this.title = title; 
        this.pathHtml = pathHtml; 
        this.pathJS = pathJS;
        this.autorize = autorize;
    }
}

/* Possibilités de la variable authorize
[] -> tout le monde peut y accéder
["admin"] -> Réserver à l'admin
["veto"] -> Réserver aux véto
["employ"] -> Réserver aux employé
["connecte"] -> Réservé aux utilisateurs connecté
*/