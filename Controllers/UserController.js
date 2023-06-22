const db = require("../Models/Entity")

exports.index = (req,res)=>{
    try {
        db.all("SELECT * FROM annonces INNER JOIN voitures ON voitures.id_voiture = annonces.id_voiture ",(err,rows)=>{
            if (err) {
                console.log(err.message);
                req.redirect("back")
            }else{
                console.log(rows);
                const dernieres =rows.length>10 ? rows.slice(-10) : rows;
                res.render('pages/home', {annonces:rows,dernieres:rows,url: req.url.split("/")})
            }
        })
    } catch (error) {
        console.log(error.message);
                req.redirect("back")
    }

}

exports.home = (req,res)=>{
   return res.render('pages/dashboard/home2', {url: req.url.split("/")})

}

exports.cars = (req,res)=>{
    const id_user = req.session.user.id_user
    console.log(id_user);
    try {
        db.all("SELECT * FROM voitures WHERE id_user = ?",[id_user],(err,rows)=>{
            if (err) {
                console.log(err.message);
                return res.redirect("back")
            }else{
                console.log(rows);
                return  res.render('pages/dashboard/cars', {voitures:rows,url: req.url.split("/")})
            }
        })
    } catch (error) {
        console.log(err.message);
        return res.redirect("back")
    }
 
}
exports.announcements = (req,res)=>{
    const id_user = req.session.user.id_user
    console.log(id_user);
    try {
        db.all("SELECT * FROM annonces WHERE id_user=?",[id_user],(err,rows)=>{
            if (err) {
                console.log(err.message);
                return res.redirect("back")
            }else{
                console.log("liste des annonces"); 
                console.log(rows); 
                return     res.render('pages/dashboard/announcements', {annonces:rows,url: req.url.split("/")})
            }
        })
    } catch (error) {
        
    }

}

exports.reporting = (req,res)=>{
      return   res.render('pages/dashboard/reporting', {url: req.url.split("/")})
  
}




exports.middleware =  (req, res,next) => {
    console.log("ici le middleware");
    if (!req.session.user) {
        return res.redirect('/login');
    }else{
        console.log("ici le middleware fin");   
        next()
    }
};

exports.about = (req, res) => { 
    res.render("pages/about")
}


exports.detail = (req, res) => { 
    res.render("pages/details")
} 