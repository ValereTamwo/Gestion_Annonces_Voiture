const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const path = require("path");
const app = express();
const port = 3001

// app.set('view engine', 'ejs');

// app.get("/dashboard", (req, res, next) => {
//     res.render('dashboard')
// })


app.use( express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
// app.use(expressLayouts);

app.get("/dashboard", (req, res, next) => {
    res.render('pages/dashboard/home', {url: req.url.split("/")})

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


app.listen(port, (err) => {
    if (err) {
        console.log("An error occured")
    } else {
        console.log("Server is running on port "+port)
    }
})