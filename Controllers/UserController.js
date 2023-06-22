
exports.index = (req,res)=>{
       res.render('pages/dashboard/home2', {url: req.url.split("/")})

}

exports.home = (req,res)=>{
   return res.render('pages/dashboard/home2', {url: req.url.split("/")})

}

exports.cars = (req,res)=>{
    return  res.render('pages/dashboard/cars', {url: req.url.split("/")})
 
}
exports.announcements = (req,res)=>{
    return     res.render('pages/dashboard/announcements', {url: req.url.split("/")})

}

exports.reporting = (req,res)=>{
      return   res.render('pages/dashboard/reporting', {url: req.url.split("/")})
  
}




exports.middleware =  (req, res,next) => {
    if (!req.session.user) {
        return res.redirect('/');
    }
    req.next()
};

exports.about = (req, res) => { 
    res.render("pages/about")
}


exports.detail = (req, res) => { 
    res.render("pages/details")
} 