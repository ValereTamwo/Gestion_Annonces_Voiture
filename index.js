const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const path = require("path");
const app = express();
const port = 3001

// app.set('view engine', 'ejs');

// app.get("/dashboard", (req, res, next) => {
//     res.render('dashboard')
// })


app.use( express.static('public'));
app.set('view engine', 'ejs');
// app.use(expressLayouts);

app.get("/dashboard", (req, res, next) => {
    res.render('dashboard')
})

app.get("/signin", (req, res, next) => {
    res.render("pages/signin")
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