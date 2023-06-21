const db = require("../Models/Entity");

// Route pour afficher toutes les annonces
exports.all =  (req, res) => {
  db.all('SELECT * FROM annonces', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).render("",{err:'Erreur interne du serveur'});
    } else {
        //TODO: configuration de la route de retour
      res.render('annonces.ejs', { annonces: rows });
    }
  });
}

    // Route pour afficher le formulaire de création d'une annonce
    exports.createAnnonce =  (req, res) => {
    res.render('new_annonce.ejs');
    };

// Route pour créer une annonce
exports.createAnnonceSave = (req, res) => {
  const { titre, description, photos, prix, id_voiture, id_user } = req.body;
  db.run(
    'INSERT INTO annonces (titre, description, photos, prix, id_voiture, id_user) VALUES (?, ?, ?, ?, ?, ?)',
    [titre, description, photos, prix, id_voiture, id_user],
    (err) => {
      if (err) {
        console.error(err.message);
        //TODO: configuration du rendu
        res.status(500).render('Erreur interne du serveur');
      } else {
        res.redirect('/annonces');
      }
    }
  );
}

// Route pour afficher le formulaire de modification d'une annonce
// /annonces/:id/edit
exports.update = (req, res) => {
  const id_annonce = req.params.id;
  db.get('SELECT * FROM annonces WHERE id_annonce = ?', [id_annonce], (err, row) => {
    if (err) {
      console.error(err.message);
      //TODO: configurtion du rendu
      res.status(500).render('Erreur interne du serveur');
    } else if (!row) {
        //au cas ou on ne retrouve pas l'annonce
        //TODO: configuration du retour
      res.status(404).render('Annonce non trouvée');
    } else {
      res.render('edit_annonce.ejs', { annonce: row });
    }
  });
}


// Route pour mettre à jour une annonce
// /annonces/:id
exports.updateSave = (req, res) => {
  const id_annonce = req.params.id;
  const { titre, description, photos, prix, id_voiture, id_user } = req.body;
  db.run(
    'UPDATE annonces SET titre = ?, description = ?, photos = ?, prix = ?, id_voiture = ?, id_user = ? WHERE id_annonce = ?',
    [titre, description, photos, prix, id_voiture, id_user, id_annonce],
    (err) => {
      if (err) {
        console.error(err.message);
        //TODO: configurer la page a retourener
        res.status(500).render('Erreur interne du serveur');
      } else {
        // TODO: retourener la page corespondante
        res.redirect('/annonces');
      }
    }
  );
}

// Route pour supprimer une annonce
// /annonces/:id
exports.delete = (req, res) => {
  const id_annonce = req.params.id;
  db.run('DELETE FROM annonces WHERE id_annonce = ?', [id_annonce], (err) => {
    if (err) {
      console.error(err.message);
      //TODO:
      res.status(500).render('Erreur interne du serveur');
    } else {
        //TODO
      res.redirect('/annonces');
    }
  });
}

exports.info = (req, res) => {
  const id_annonce = req.params.id;
  db.all(`SELECT * FROM annonces WHERE id_annonce = ?`, [id_annonce], (err,row) => {
    if (err) {
      console.error(err.message);
      //TODO:
      res.status(500).render('Erreur interne du serveur');
    } else {
        console.log(row);
        //TODO
      res.redirect('/annonces');
    }
  });
}


// Route pour chercher une annonce 
exports.search = (req, res) => {
  const { description } = req.query;
  db.all(
    'SELECT * FROM annonces WHERE description LIKE ?',
    [`%${description}%`],
    (err, rows) => {
      if (err) {
        console.error(err.message);
        //TODO: 
        res.status(500).render('Erreur interne du serveur');
      } else {
        //TODO: 
        res.render('annonces.ejs', { annonces: rows });
      }
    }
  );
}