const express = require("express")
const router = require("./Routes/Router")
const swagger = require("./swager")
const session = require('express-session');
const flash = require('connect-flash');
const app = express()

const cors = require("cors")

app.use(flash());
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

app.get("/dashboard/users", (req, res, next) => {
    res.render('pages/dashboard/users', {url: req.url.split("/")})
})

module.exports = app