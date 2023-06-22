// const e = require("express")
const db = require("./../Models/Entity")

//get the login page
exports.login = (req,res)=>{
        res.render("pages/signin", {url: req.url.split("/")})

}
//set the logget user
exports.loginPost = (req,res)=>{
    console.log("debut du login");
     const { email, mdp } = req.body;
     console.log(req.body);
    console.log(email,"\n",mdp);

    db.get(`SELECT * FROM users WHERE email = ? AND mdp = ?`, [email, mdp], (err, row) => {
        if (err) {
            console.error(err.message);
            console.log(err.message);
               req.flash('error', err.message);
        res.redirect('back'); 
        }else if (!row) {
            console.log("logage de la ligne");
            console.log(row);
            console.log("utilisateur non trouver");
            const previousUrl = req.headers.referer || '/';
            res.redirect(previousUrl);

        }else{

            console.log("user found");
            console.log(row);
            req.session.user = row;
            res.redirect('/dashboard');
        }
    });
}

//get the register page
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * route pour avoir la page de conexion
 */
exports.register = (req,res)=>{
     req.flash('success', 'Votre compte a été créé avec succès!');
     req.flash('error', 'Votre compte a été créé avec succès erroe!');
     res.render("pages/signup")
}

//set registration
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * route pour enregistrer les informations d'un nouvelle utilisateur
 */
exports.registerPost = (req,res)=>{
        const {email,pseudo,mdp} = req.body
        console.log(req.body);
    try {
        db.all("SELECT * FROM users WHERE email=?",[email],(err,row)=>{
            if (err) {
               console.log(err.message);
               req.flash('error', err.message);
       res.redirect('back');
            }else if(row.length != 0 ){
                console.log("utilisateur prexistant");
                console.log(row);
                //redirection ver la page d'enregistrement 
               req.flash('error',"cette adresse mail est deja utiliser");
                return res.redirect('signin');
            }else{
                        //creation de l'utilisateur
        db.run("INSERT INTO users(email,pseudo,mdp) values(?,?,?)",[email,pseudo,mdp],(err,row)=>{
            if (err) {
                console.log(err.message);
                console.log(err.message);
               req.flash('error', err.message);
       res.redirect('back');
            }else{
                //redirection ver la parge de connection
                res.render("/pages/signin",{error:e.message})
            }
        })
            }
        })



    } catch (error) {
        console.log(error.message);
        console.log(err.message);
               req.flash('error', err.message);
       res.redirect('back');
        res.render("/register",{error:e.message})
    }
        
}


//route pour se deconnecter
exports.logout =  (req, res) => {
    console.log("deconection");
    setTimeout(() => {
        console.log("compte a rebour de 3s avant la deconexion");
        req.session.destroy()
        res.redirect('/login')
    }, 3000);
};

