const Listing= require("../models/listing.js");
const Review= require("../models/review.js");

 //post reviews route
module.exports.createReview= async(req,res)=>{
    let listing= await Listing.findById(req.params.id);
    let newReview= new Review(req.body.review);

   newReview.author= req.user._id;
  // console.log(newReview);
    listing.reviews.push(newReview);
 
    await newReview.save();
    await listing.save();
    req.flash("success",  "New Review Created!")
   //  console.log("new review saved");
    res.redirect(`/listings/${listing._id}`);
 }
// delete review
 module.exports.destroyReview= async(req,res)=>{
    let {id, reviewId}= req.params;
   // $pull => delete for review in listings collcetions
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success",  "Review Deleted!")
    res.redirect(`/listings/${id}`)
  }