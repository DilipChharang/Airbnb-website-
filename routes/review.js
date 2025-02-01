const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync= require("../utils/wrapAsync.js");
const ExpressError= require("../utils/ExpressError.js");
const {reviewSchema}= require("../schema.js");
const {isLoggedIn, isReviewAuthor}= require("../middleware.js");

const reviewsControllers= require("../controllers/reviews.js");

//reviews ka liya joi validation
const validateReview= (req, res, next)=>{
    let {error}= reviewSchema.validate(req.body);
    // console.log(result);
    if(error){
      let errMsg= error.details.map((el)=> el.message).join(",")
     throw new ExpressError(400, errMsg);
    }else{
      next();
    }
  }

// Reviews
  //post reviews route
router.post("/",isLoggedIn, validateReview, wrapAsync(reviewsControllers.createReview))

 // delete reviews route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor,
   wrapAsync(reviewsControllers.destroyReview))
 
 module.exports= router;