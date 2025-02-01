const Joi = require('joi');

module.exports.listingSchema= Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().allow("",null),
        category: Joi.string().valid('Trending', 'Rooms', 'Iconic_Cities', 'Mountains', 'Castles', 'Amazing_Pool', 'Camping', 'Farms', 'Arctic', 'Domes', 'House_Boats'),
    }).required()
})
//module.exports= listingSchema;

//server side validation apply not missing any value

// for reviews validation in server side[hoppscotch sa send karan per]
module.exports.reviewSchema= Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required(),
});