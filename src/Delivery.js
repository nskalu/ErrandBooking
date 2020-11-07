const express = require('express') //returns a function
const Joi = require('joi');
const app = express();
app.use(express.json());

//POST: make a delivery booking
app.post('/api/make-booking', (req, res)=>{ 
    console.log("the date is "+req.body.DeliveryDate);
    const {error} = validateDelivery(req.body); //this line is equivalent to returning result.error, it's called object destructuring
    if (error) return res.status(400).send(error.details[0].message);

//set the delivery object from the request
    const delivery= {
        Id:errands.length + 1, 
        Name:req.body.Name,
        Phone:req.body.Phone,
        Email:req.body.Email,
        PickupAddress:req.body.PickupAddress,
        DeliveryAddress:req.body.DeliveryAddress,
        PickupPhone:req.body.PickupPhone,
        DeliveryPhone:req.body.DeliveryPhone,
        PickupDate:req.body.PickupDate,
        DeliveryDate:req.body.DeliveryDate,
        DeliveryName:req.body.DeliveryName
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
    if (!booking) res.status(404).send(`The booking with the Id ${req.params.Id} could not be found`); 
    res.send(booking);
});

//update booking with payment by admin
app.put('/api/booking/:Id', (req, res)=>{
    const booking= errands.find(c=> c.Id === parseInt(req.params.Id));
    if (!booking) return res.status(404).send(`The booking with the Id ${req.params.Id} could not be found`);

   
   //const result = validateDelivery(req.body);
   const {error} = validateDelivery(req.body); //this line is equivalent to returning result.error, it's called object destructuring
    if (error) return res.status(400).send(error.details[0].message);
    
    booking.Name=req.body.Name;
    booking.Phone=req.body.Phone;
    booking.PickupAddress=req.body.PickupAddress;
    booking.DeliveryAddress=req.body.DeliveryAddress;
    booking.Email=req.body.Email;
    booking.PickupPhone=req.body.PickupPhone;
    booking.DeliveryPhone=req.body.DeliveryPhone;
    booking.DeliveryDate = req.body.DeliveryDate;
    booking.PickupDate = req.body.PickupDate;
    booking.DeliveryName=req.body.DeliveryName
   
    res.send(booking);
});
//delete a course
app.delete('/api/booking/:Id', (req, res)=>{
    const booking= errands.find(c=> c.Id === parseInt(req.params.Id));
    if (!booking) return res.status(404).send(`The booking with the Id ${req.params.Id} could not be found`);

    
     const index = errands.indexOf(booking);
     errands.splice(index,1);
    res.send(booking);
});

//schema and validations
function validateDelivery(bookingModel){
    const schema = Joi.object({
        Name : Joi.string().min(3).required(),
        Phone : Joi.string().min(11).required(),
        PickupAddress : Joi.string().required(),
        DeliveryAddress : Joi.string().required(),
        Email: Joi.string().email(),
        DeliveryPhone:Joi.string().min(11).max(11).required(),
        PickupPhone:Joi.string().min(11).max(11).required(),
        DeliveryDate:Joi.date().iso().required(), //date format should be yyyy/mm/dd
        PickupDate:Joi.date().iso().required(),
        DeliveryName:Joi.string().min(3)
    });

    return schema.validate(bookingModel);
     
}

//Use array to store data for now
const errands = 
    [
        {Id : 1, Name:'Chi Esther', Phone:"08099977876", PickupAddress:"Ikeja", DeliveryAddress:"Lagos Island", Email:"ng@yahoo.com",PickupPhone:"08090977876",DeliveryPhone:"08099923876",DeliveryDate:"11-02-2020",PickupDate:"11-02-2020", DeliveryName:"testin name"}, 
        {Id : 2, Name:'John Omega', Phone:"08098977876", PickupAddress:"Gbagada", DeliveryAddress:"Lagos Island", Email:"babyng@yahoo.com",PickupPhone:"09090977126",DeliveryPhone:"08092312876",DeliveryDate:"11-02-2020",PickupDate:"11-02-2020",DeliveryName:"tester name"}
    ]

    //setting an environment variable
    const port = process.env.PORT || 3000;
    app.listen(port, ()=>{ console.log(`listening on port ${port}`)});
