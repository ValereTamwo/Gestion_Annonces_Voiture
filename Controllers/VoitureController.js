const { error } = require("console");
const db = require("../Models/Entity");
const multer = require('multer');

// Configuration de multer pour stocker les fichiers dans le dossier "uploads"
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });



exports.index = (req,res)=>{
    res.render("/pages/index")
}

exports.create = (req,res)=>{
  res.render("pages/createVoiture")
}

//function pour creer la voiture et stoker l'image de la voiture
exports.createVoitureSave = (req,res)=>{
    // middleware pour enregistrer les photos avant d'insérer la voiture
    const savePhotos = upload.array('photos');
    savePhotos(req, res, (err) => {
        if (err) {
            console.log(err.message);
            //TODO: redirection vers une page d'erreur
            req,flash("error",err.message)
            res.redirect("back")
        } else {
            const {marque, couleur, annee, modele, kilometrage, id_user} = req.body
            const photos = req.files.map(file => file.filename).join(';');
            console.log(photos);
            // insert one row into the voiture table
            db.run(`INSERT INTO voitures(marque, couleur, annee, modele, kilometrage, id_user,photos) VALUES(?,?,?,?,?,?,?)`, [marque, couleur, annee, modele, kilometrage, id_user,photos+"uploads/"], (err)=> {
              if (err) {
                //en cas d'erreur redirection 
                req.flash("error",err.message)
                console.log(err.message);
              res.render("back")
              } else {
                db.all("SELECT * FROM voitures",(err,rows)=>{
                  if (err) {
                    req.flash('error', err.message);
                    res.redirect('back');
                  }else{
                    req.flash('success', 'You have successfullycrete the car');
                    res.render("pages/index",{voitures:rows}); 
                  }
                  })
              }
            });
        }
    });
};

//parametre id
exports.infoVoiture = (req,res)=>{
try {
    const {id} = req.body   
    // select all rows from the voiture table
    db.all(`SELECT * FROM voitures WHERE id_voiture = ?`, [id], (err, row) => {
      if (err) {
         console.log(err.message);
         //TODO:redirection vers une page d'erreur
         req.flash('error', err.message);
                    res.redirect('back');
      }
      //TODO: redirection ver une page avec les infos sur la voiture
    });
} catch (error) {
    console.log(error.message);
    //TODO:redirection ver la page  precedente
    req.flash('error', err.message);
                    res.redirect('back');
}
}


exports.listVoiture = (req,res)=>{
try {
    
    // select all rows from the voiture table
    db.all(`SELECT * FROM voitures`, [], (err, rows) => {
      if (err) {
         console.log(err.message);
         //TODO:redirection ver une page
         req.flash('error', err.message);
                    res.redirect('back');
      }
      //TODO: redirection ver une page avec la liste de voiture
    });
} catch (error) {
    console.log(error.message);
    //TODO:reirection ver la page de creation precedente
    req.flash('error', err.message);
                    res.redirect('back');
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
             req.flash('error', err.message);
                    res.redirect('back');
          }
          //TODO: redirection ver la liste des voiture

        });
    } catch (error) {
        console.log(error.message);
        //TODO: redirection ve la route precedente
        req.flash('error', err.message);
                    res.redirect('back');
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
     req.flash('error', err.message);
                    res.redirect('back');
  }else{
    //TODO:redirection ver la nouverlle page avec la liste des voiture
  }
});
    } catch (error) {
        console.error(error.message);
        //TODO: redirection ver la page avec erreur
        req.flash('error', err.message);
                    res.redirect('back');
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
       req.flash('error', err.message);
       res.redirect('back');
      } else {
        //TODO
        res.render('/pages/voiture.ejs', { annonces: rows });
      }
    }
  );
}