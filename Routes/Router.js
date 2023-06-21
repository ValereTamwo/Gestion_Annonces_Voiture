const express = require("express")
const controller = require("./../Controllers/UserController")
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