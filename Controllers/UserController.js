
exports.index = (req,res)=>{
    res.render("pages/index")
}

exports.home = (req,res)=>{
    res.render("pages/dashboard")
}

exports.middleware =  (req, res,next) => {
    if (!req.session.user) {
        return res.redirect('/');
    }
    req.next()
};