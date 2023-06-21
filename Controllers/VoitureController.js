const db = require("../Models/Entity");

exports.index = (req,res)=>{
    res.render("/pages/index")
}

exports.create = (req,res)=>{
  res.render("pages/createVoiture")
}

exports.createVoitureSave = (req,res)=>{
    const {marque, couleur, annee, modele, kilometrage, id_user} = req.body
    // insert one row into the voiture table
    db.run(`INSERT INTO voitures(marque, couleur, annee, modele, kilometrage, id_user) VALUES(?,?,?,?,?,?)`, [marque, couleur, annee, modele, kilometrage, id_user], (err)=> {
      if (err) {
        //en cas d'erreur redirection
         console.log(err.message);
        //  res.redirect("/")
      }
      // get the last insert id
      try {
            db.all("SELECT * FROM voitures",(err,rows)=>{
                if (err) {
                    console.log(err.message);
                    //TODO:redirection ver une page d'erreur
                    

                }
                //TODO:redirection ves la page des liste des articles avec la liste des articles
            })
      } catch (error) {
        
      }
    });
}

//parametre id
exports.infoVoiture = (req,res)=>{
try {
    const {id} = req.body   
    // select all rows from the voiture table
    db.all(`SELECT * FROM voitures WHERE id_voiture = ?`, [id], (err, row) => {
      if (err) {
         console.log(err.message);
         //TODO:redirection vers une page d'erreur
      }
      //TODO: redirection ver une page avec les infos sur la voiture
    });
} catch (error) {
    console.log(error.message);
    //TODO:redirection ver la page  precedente
}
}


exports.listVoiture = (req,res)=>{
try {
    
    // select all rows from the voiture table
    db.all(`SELECT * FROM voitures`, [], (err, rows) => {
      if (err) {
         console.log(err.message);
         //TODO:redirection ver une page
      }
      //TODO: redirection ver une page avec la liste de voiture
    });
} catch (error) {
    console.log(error.message);
    //TODO:reirection ver la page de creation precedente
}
}


exports.update = (req,res)=>{
  res.render("/pages/updateVoiture")
}
exports.updateVoiture = (req,res)=>{
    try {

        // update one row in the voiture table
        const {id_voiture} = req.body;
        //TODO recuperation des autres informations

        db.run(`UPDATE voitures SET marque = ? WHERE id_voiture = ?`, [newMarque, id_voiture], (err)=> {
          if (err) {
             console.error(err.message);
             //TODO: redirection pour la cas d'erreur
          }
          //TODO: redirection ver la liste des voiture

        });
    } catch (error) {
        console.log(error.message);
        //TODO: redirection ve la route precedente
    }
}
//params id
exports.deleteVoiture = (req,res)=>{
    try {
        // delete one row from the voiture table
db.run(`DELETE FROM voitures WHERE id_voiture = ?`, [id], (err) => {
  if (err) {
     console.error(err.message);
     //TODO: redirection vers une page d'erreur
  }
 //TODO:redirection ver la nouverlle page avec la liste des voiture
});
    } catch (error) {
        console.error(error.message);
        //TODO: redirection ver la page avec erreur
    }
}


// Route pour chercher une voiture
exports.search = (req, res) => {
  const { search } = req.query;
  db.all(
    `SELECT * FROM voiture WHERE description LIKE  '%${search}%' OR nom LIKE  '%${search}%'`,
  
    (err, rows) => {
      if (err) {
        console.error(err.message);
        //TODO: 
        res.status(500).render('Erreur interne du serveur');
      } else {
        //TODO
        res.render('/pages/voiture.ejs', { annonces: rows });
      }
    }
  );
}