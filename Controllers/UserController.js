exports.index = (req,res)=>{
    res.render("pages/index")
}

exports.home = (req,res)=>{
    res.render("pages/home")
}

exports.about = (req, res) => { 
    res.render("pages/about")
}


exports.detail = (req, res) => { 
    res.render("pages/details")
}