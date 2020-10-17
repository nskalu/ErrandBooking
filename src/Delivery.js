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
        Name:req.body.Name
    };
    errands.push(delivery);
    res.send(delivery);
});

function validateDelivery(bookingModel){
    const schema = {
        Name : Joi.string().min(3).required()
    };

    return Joi.validate(bookingModel, schema);
     
}

//Use array to store data for now
const errands = [{Id : 1, Name:'Chi Esther'}, {Id : 2, Name:'John Omega'}]
