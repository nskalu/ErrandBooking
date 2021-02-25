const Joi = require('joi');
const { date } = require('joi');

//schema and validations
function validateDelivery(bookingModel){
    const schema = Joi.object({

        BookerName : Joi.string().min(3).required(),
        BookerPhone : Joi.string().min(11).required(),
        SenderName : Joi.string().min(3).required(),
        SenderPhone : Joi.string().min(11).max(11).required(),
        RecipientName: Joi.string().min(3).required(),
        RecipientPhone : Joi.string().min(11).max(11).required(),
        PickupAddress : Joi.string().min(11).required(),
        DeliveryAddress : Joi.string().min(11).required(),
        DeliveryDate : Joi.date().iso().required(), //date format should be "yyyy-mm-dd" or "yyyy-mm-dd 00:00"
        PickupDate : Joi.date().iso().required(), //date format should be "yyyy-mm-dd" or "yyyy-mm-dd 00:00"
        PaymentMethod : Joi.string().min(3).required(),
        Payer : Joi.string().min(3).required(),
        Prioritylevel : Joi.string().min(3)
    });

    return schema.validate(bookingModel);
     
}

module.exports.validateDelivery = validateDelivery;