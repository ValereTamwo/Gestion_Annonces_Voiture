const e = require("express")
const db = require("./../Models/Entity")

//get the login page
exports.login = (req,res)=>{
        res.render("pages/signin", {url: req.url.split("/")})

}
//set the logget user
exports.loginPost = (req,res)=>{
     const { email, mdp } = req.body;
     console.log(req.body);
    console.log(email,"\n",mdp);

    db.get(`SELECT * FROM users WHERE email = ? AND mdp = ?`, [email, mdp], (err, row) => {
        if (err) {
            console.error(err.message);
            console.log(err.message);
               req.flash('error', err.message);
       return res.redirect('back'); 
        }

        if (!row) {
            return res.redirect('/login');
        }
        console.log("user found");
        console.log(row);
        req.session.user = row;
        res.redirect('/dashboard');
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
            }else if(row!=null){
                //redirection ver la page d'enregistrement 
               req.flash('error',"cette adresse mail est deja utiliser");
                return res.redirect('back');
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
                res.render("/pages/login",{error:e.message})
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

