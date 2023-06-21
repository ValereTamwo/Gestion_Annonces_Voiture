const e = require("express")
const db = require("./../Models/Entity")

//get the login page
exports.login = (req,res)=>{
    res.render("pages/login")
}
//set the logget user
exports.loginPost = (req,res)=>{
     const { email, mdp } = req.body;
     console.log(req.body);
    console.log(email,"\n",mdp);

    db.get(`SELECT * FROM users WHERE email = ? AND mdp = ?`, [email, mdp], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.redirect('/');
        }

        if (!row) {
            return res.redirect('/');
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
    res.render("pages/register")
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
            }else if(row!=null){
                //redirection ver la page d'enregistrement
                console.log("utilisateur prexistant");
                res.render("/pages/register",{error:e.message})
            }else{
                        //creation de l'utilisateur
        db.run("INSERT INTO users(email,pseudo,mdp) values(?,?,?)",[email,pseudo,mdp],(err,row)=>{
            if (err) {
                console.log(err.message);
            }else{
                //redirection ver la parge de connection
                res.render("/pages/login",{error:e.message})
            }
        })
            }
        })



    } catch (error) {
        console.log(error.message);
        res.render("/register",{error:e.message})
    }
        
}


//route pour se deconnecter
exports.logout =  (req, res) => {
    req.session.destroy()
    res.redirect('/login')
};

