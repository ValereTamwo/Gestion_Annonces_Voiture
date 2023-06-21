const express = require("express")
const router = require("./Routes/Router")
const swagger = require("./swager")
const app = express()


const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use("/assets", express.static("public"));

app.use( express.static(__dirname + '/public'));
  
app.use('/api-docs',swagger.serve,swagger.set);


app.use(bodyParser.json());
app.use(router)


// C'est les appeles necessaires au vues de Carick 
app.get("/dashboard", (req, res, next) => {
    res.render('pages/dashboard/home2', {url: req.url.split("/")})

})

app.get("/dashboard/cars", (req, res, next) => {
    res.render('pages/dashboard/cars', {url: req.url.split("/")})
})

app.get("/dashboard/announcements", (req, res, next) => {
    res.render('pages/dashboard/announcements', {url: req.url.split("/")})
})

app.get("/dashboard/users", (req, res, next) => {
    res.render('pages/dashboard/users', {url: req.url.split("/")})
})

app.get("/dashboard/reporting", (req, res, next) => {
    res.render('pages/dashboard/reporting', {url: req.url.split("/")})
})

app.get("/signin", (req, res, next) => {
    res.render("pages/signin", {url: req.url.split("/")})
})

app.get("/signup", (req, res, next) => {
    res.render("pages/signup")
})
//
module.exports = app