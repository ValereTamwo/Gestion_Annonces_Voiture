const express = require("express")
const router = require("./Routes/Router")
const swagger = require("./swager")
const session = require('express-session');
const app = express()

const cors = require("cors")

const corsOptions = {
  origin: "*",
};
// app.use(express.static('public'));
app.use(express.static( __dirname + "/public" ))
const corsMiddleware = cors(corsOptions);

app.use(corsMiddleware)

app.use(express.json())
//configuration du body-parser qui n'est pas encore installer
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//configuration des parametres de gestion de session
app.use(session({
    secret: 'folong201',
    resave: false,
    saveUninitialized: false
}));

//configuration du themplate de vue
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use("/assets", express.static("public"));
 

//configuration du swagger pour les api 
app.use( express.static(__dirname + '/public'));
   
app.use('/api-docs',swagger.serve,swagger.set);


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