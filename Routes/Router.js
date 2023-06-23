const express = require("express")
const controller = require("./../Controllers/UserController")
const VoitureController = require("./../Controllers/VoitureController")
const AnnonceController = require("./../Controllers/AnnoncesController")
const authController = require("./../Controllers/AuthController")
const Router = express.Router()


/**
 * @swagger
 * /:
 *  get:
 *      summary: Home Page
 *      description: go to the home page

 *      responses:
 *          200:
 *              description:Welcome to the home.
 */
Router.get("/",AnnonceController.all)
Router.get("/dashboard",controller.middleware,controller.home)
Router.get("/dashboard/cars",controller.middleware,controller.cars)
Router.get("/dashboard/announcements",controller.middleware,controller.announcements)
Router.get("/dashboard/reporting",controller.middleware,controller.reporting)


// Resultat de recherche
// Router.get("/search", AnnonceController.search)
Router.post("/search",AnnonceController.search)

//Routes pour les utilisateurs
//route pour l'authentification
Router.get("/login",authController.login)
Router.post("/login",authController.loginPost)
Router.get("/register",authController.register)
Router.post("/signup",authController.registerPost)
Router.get("/logout",authController.logout)
//Routes  Pour les voitures
Router.get("/voitures",controller.middleware,VoitureController.listVoiture)
Router.get("/voitures/create",controller.middleware,VoitureController.create) //cette route n'est pas utiliser
Router.post("/voitures/create",VoitureController.createVoitureSave)
Router.get("/voitures/search/:id",controller.middleware,VoitureController.infoVoiture)
// Router.get("/voitures/update",controller.middleware,VoitureController.update)
// Router.post("/voitures/:id",controller.middleware,VoitureController.updateVoiture)
Router.post("/voitures/:id",controller.middleware,VoitureController.updateNew)
Router.get("/voitures/delete/:id",controller.middleware,VoitureController.delete_voiture_transaction)
// Router.get("/voitures/search",controller.middleware,VoitureController.search)


// //Route pour les annonces 
// Router.get("/annonces",controller.middleware,AnnonceController.all)
// Router.get("/annonces/create",controller.middleware,AnnonceController.create)
Router.post("/annonces/create",controller.middleware,AnnonceController.createAnnonceSave)
// Router.get("/annonces/:id/edit",controller.middleware,AnnonceController.update)
// Router.post("/annonces/update/:id",controller.middleware,AnnonceController.updateSave)
Router.post("/annonces/update/:id",controller.middleware,AnnonceController.updateNew)
Router.get("/annonces/delete/:id",controller.middleware,AnnonceController.delete)
// Router.get("/annonces/search",controller.middleware,AnnonceController.search)
Router.get("/annonces/search/:id",controller.middleware,AnnonceController.info)
Router.get("/annonces/findDashboard/:id",controller.middleware,AnnonceController.findDashboard)

 
Router.get("/details/:id",AnnonceController.info) 
/**
 * @swagger
 * /users:
 *  get:
 *      summary: Get all users
 *      description: Retrieve a list of all users.
 *      responses:
 *          200:
 *              description: A list of users.
 */
Router.get("/users", controller.index);

 
/**
 * @swagger
 * /users/{id}:
 *  get:
 *      summary: Get a user by ID
 *      description: Retrieve a user by their ID.
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID of the user to retrieve.
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: A user object.
 */
Router.get("/users/:id",controller.index );
Router.get("/about",controller.about );

 
module.exports = Router