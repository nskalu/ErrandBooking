const express = require('express') //returns a function
const Joi = require('joi');
const app = express();
app.use(express.json());

//POST: make a delivery booking
app.post('/api/make-booking', (req, res)=>{
    const {error} = validateDelivery(req.body); //this line is equivalent to returning result.error, it's called object destructuring
    if (error) return res.status(400).send(error.details[0].message);
 

    const delivery= {
        Id:errands.length + 1, 
        Name:req.body.Name,
        Phone:req.body.Phone,
        Email:req.body.Email,
        PickupAddress:req.body.PickupAddress,
        DeliveryAddress:req.body.DeliveryAddress
    };
    errands.push(delivery);
    res.send(delivery);
});

//get all bookings
app.get('/api/bookings', (req, res)=>{
    res.send(errands);
});
//get a single booking
app.get('/api/booking/:Id/', (req, res)=>{
    const booking= errands.find(c=> c.Id === parseInt(req.params.Id));
    if (!booking) res.status(404).send(`The course with the Id ${req.params.Id} could not be found`); 
    res.send(booking);
});

//schema and validations
function validateDelivery(bookingModel){
    const schema = {
        Name : Joi.string().min(3).required(),
        Phone : Joi.string().min(11).required(),
        PickupAddress : Joi.string().required(),
        DeliveryAddress : Joi.string().required(),
        Email: Joi.string().required()
    };

    return Joi.validate(bookingModel, schema);
     
}

//Use array to store data for now
const errands = 
    [
        {Id : 1, Name:'Chi Esther', Phone:"08099977876", PickupAddress:"Ikeja", DeliveryAddress:"Lagos Island", Email:"ng@yahoo.com"}, 
        {Id : 2, Name:'John Omega', Phone:"08098977876", PickupAddress:"Gbagada", DeliveryAddress:"Lagos Island", Email:"babyng@yahoo.com"}
    ]
