const express = require("express")
const controller = require("./../Controllers/VoitureController")
const { route } = require("./Router")
const route = express.Router()
route.get("/voiture",controller.index)           

