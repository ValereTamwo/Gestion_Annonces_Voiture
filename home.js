const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  db.all('SELECT * FROM table_name', (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { rows });
    }
  });
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/add', (req, res) => {
  const { name } = req.body;
  db.run(`INSERT INTO table_name(name) VALUES(?)`, [name], err => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

app.get('/edit/:id', (req, res) => {
  const { id } = req.params;
  db.get(`SELECT * FROM table_name WHERE id = ?`, [id], (err, row) => {
    if (err) {
      console.log(err);
    } else {
      res.render('edit', { row });
    }
  });
});

app.post('/edit/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  db.run(`UPDATE table_name SET name = ? WHERE id = ?`, [name, id], err => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

app.get('/delete/:id', (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM table_name WHERE id = ?`, [id], err => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

app.listen(3000, () => console.log('Server started on port 3000'));