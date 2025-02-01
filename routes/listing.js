const express = require("express");
const router = express.Router();
const wrapAsync= require("../utils/wrapAsync.js");
const ExpressError= require("../utils/ExpressError.js");
const {listingSchema}= require("../schema.js");
const {isLoggedIn, isOwner} = require("../middleware.js");// middleware 
const listingController= require("../controllers/listings.js")

const multer  = require('multer')
const {storage}= require("../cloudConfig.js");
const upload = multer({storage})

// joi(use for server side manage )validation use for middleware
const validateListing= (req, res, next)=>{
    let {error}= listingSchema.validate(req.body);
    // console.log(result);
    if(error){
      let errMsg= error.details.map((el)=> el.message).join(",")
     throw new ExpressError(400, errMsg);
    }else{
      next();
    }
  }

router.route("/")    // .route("same path") same path ko bar bar na likhana pada 
.get(wrapAsync(listingController.index)) // index route
.post(
  isLoggedIn,  
  upload.single('listing[image]'),
  validateListing,
  wrapAsync(listingController.createListing)
)// create route

//New Route
 router.get("/new",  isLoggedIn, listingController.renderNewForm);
   
router.route("/:id")
.get(wrapAsync(listingController.showListing))//Show Route
.put(
  isLoggedIn,
  isOwner,
  upload.single('listing[image]'),
  validateListing,
  wrapAsync(listingController.updateListing)
)// update route
.delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing)); // delete route

//edit route
router.get("/:id/edit", isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));

module.exports= router;

//router.get("/", wrapAsync(listingController.index))
// router.post("/", validateListing, isLoggedIn,  wrapAsync(listingController.createListing));