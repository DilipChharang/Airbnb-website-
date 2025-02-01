const User= require("../models/user.js");

//get signup form
module.exports.renderSignupForm= (req, res)=>{
    res.render("users/signup.ejs");
}
//post rout for signup
module.exports.signup= async(req,res)=>{
    try{
        let {username, email, password}= req.body;
        const newUser= new User({email, username});
        const registeruser= await User.register(newUser, password);
        //console.log(registeruser);

        // signup hona ka baad automatically login ho jaya req.login()
        req.login(registeruser, (err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect("/listings");
        })

    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup")
    }
  
}
// login form
module.exports.renderLoginForm= (req,res)=>{
    res.render("users/login.ejs");
}
//post 
module.exports.login=  async(req,res)=>{
    req.flash("success", "Welcome back to Wanderlust!");
    let redirectUrl= res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
}
//logout
module.exports.logout=  (req, res, next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
    req.flash("success", "you are logged out!");
    res.redirect("/listings");
})
}