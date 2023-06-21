const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views', 'pages'));


app.get('/details', (req, res) => {
    res.render('details');
  });
  