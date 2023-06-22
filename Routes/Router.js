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
Router.get("/",controller.index)
Router.get("/dashboard",controller.home)
Router.get("/dashboard/cars",controller.cars)
Router.get("/dashboard/announcements",controller.announcements)
Router.get("/dashboard/reporting",controller.reporting)


//route pour l'authentification
Router.get("/signin",authController.login)
Router.post("/signin",authController.loginPost)
Router.get("/signup",authController.register)
Router.post("/signup",authController.registerPost)
Router.get("/logout",authController.logout)
//Routes  Pour les voitures
Router.get("/voitures",controller.middleware,VoitureController.listVoiture)
Router.get("/voitures/create",controller.middleware,VoitureController.create)
Router.post("/voitures/create",VoitureController.createVoitureSave)
// Router.get("/voitures/:id",controller.middleware,VoitureController.info)
// Router.get("/voitures/update",controller.middleware,VoitureController.update)
// Router.post("/voitures",controller.middleware,VoitureController.updateVoiture)
// Router.get("/voitures/delete/:id",controller.middleware,VoitureController.deleteVoiture)
// Router.get("/voitures/search",controller.middleware,VoitureController.search)


// //Route pour les annonces 
// Router.get("/annonces",controller.middleware,AnnonceController.all)
// Router.get("/annonces/create",controller.middleware,AnnonceController.create)
// Router.post("/annonces/create",controller.middleware,AnnonceController.createAnnonceSave)
// Router.get("/annonces/:id/edit",controller.middleware,AnnonceController.update)
// Router.post("/annonces/edit",controller.middleware,AnnonceController.updateSave)
// Router.get("/annonces/delete/:id",controller.middleware,AnnonceController.delete)
// Router.get("/annonces/search",controller.middleware,AnnonceController.search)
// Router.get("/annonces/:id",controller.middleware,AnnonceController.info)

 
Router.get("/",controller.home)
Router.get("/details",controller.detail) 
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


Router.get("/home",controller.home)
Router.get("/about",controller.about)

 
module.exports = Router