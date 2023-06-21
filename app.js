const express = require("express");
const app = express();

app.set('view engine', 'ejs');

app.get("/dashboard", (req, res, next) => {
    res.render('index')
})


module.exports = app;