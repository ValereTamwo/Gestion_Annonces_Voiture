const express = require("express");
const app = express();

// app.set('view engine', 'ejs');

// app.get("/dashboard", (req, res, next) => {
//     res.render('dashboard')
// })
app.use( express.static('public'));
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');

app.get('/dashboard', (req, res) => {
    const data = [
        { colonne1: 'Donnée 1', colonne2: 'Donnée 2', colonne3: 'Donnée 3' },
        { colonne1: 'Donnée 4', colonne2: 'Donnée 5', colonne3: 'Donnée 6' }
    ];

    const widgetData = {
        users: 500
    };

    res.render('dashboard', { data: data, widgetData: widgetData });
});




module.exports = app;