const Joi = require('joi');
const { date } = require('joi');

//schema and validations
function validateDelivery(bookingModel){
    const schema = Joi.object({
        Name : Joi.string().min(3).required(),
        Phone : Joi.string().min(11).required(),
        PickupAddress : Joi.string().min(11).required(),
        DeliveryAddress : Joi.string().min(11).required(),
        Email: Joi.string().email(),
        DeliveryPhone:Joi.string().min(11).max(11).required(),
        PickupPhone:Joi.string().min(11).max(11).required(),
        DeliveryDate:Joi.date().iso().required(), //date format should be "yyyy-mm-dd" or "yyyy-mm-dd 00:00"
        PickupDate:Joi.date().iso().required(),
        DeliveryName:Joi.string().min(3)
    });

    return schema.validate(bookingModel);
     
}