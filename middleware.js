const Listing= require("./models/listing.js");
const Review = require("./models/review.js");


module.exports.isLoggedIn= (req, res, next)=>{
   if(!req.isAuthenticated()){
    // console.log(req.path , "..", req.originalUrl);
    //console.log(req.user);
    req.session.redirectUrl= req.originalUrl;
    req.flash("error", "you must be looged in")
    return res.redirect("/login");
 }
 next()
}

module.exports.saveRedirectUrl= (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl= req.session.redirectUrl;
    }
    next();
}

// server side (hoppscotch) manage only for owner edit and delete
module.exports.isOwner= async(req, res, next)=> { 
let { id } = req.params;
let listing = await Listing.findById(id);
if(!listing.owner._id.equals(res.locals.currUser._id)){
  req.flash("error", "you are not the owner of this listing");
  return res.redirect(`/listings/${id}`);
}
next();
}

//  manage only for author  delete for review
module.exports.isReviewAuthor= async(req, res, next)=> { 
  let { id, reviewId} = req.params;
  let review = await Review.findById(reviewId);
  if(!review.author.equals(res.locals.currUser._id)){
    req.flash("error", "you are not the author of this review");
    return res.redirect(`/listings/${id}`);
  }
  next();
  }