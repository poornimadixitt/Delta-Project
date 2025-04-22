const express = require("express");
const router = express.Router();    //Creating Router object
const wrapAsync = require("../utils/wrapAsync.js"); 
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

//Requiring controllers
const listingController = require("../controllers/listings.js");


router.route("/")
    //Index Route (All Listings)
    .get(wrapAsync(listingController.index))
    //Create Route (CREATE)
    .post(isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingController.createListing));


//New Route (CREATE)
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
    //Show Route (READ)
    .get(wrapAsync(listingController.showListing))
    //Update Route (UPDATE)
    .put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))
    //Delete Route (DELETE)
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//Edit Route (UPDATE)
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;