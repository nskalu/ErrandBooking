const mongoose = require('mongoose')
const express = require('express') //returns a function
const Joi = require('joi');
const { date } = require('joi');
const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost/SuzerrandDb")//mongoose will create this db when you first write sth to this db
.then(()=> console.log("Connected to MongoDb..."))
.catch(err=> console.error("Could not connect to db..", err)); 

//create schema to define the shape of the document
const errandSchema = new mongoose.Schema({
    name : String,
    phone : String,
    pickupAddress : String,
    deliveryAddress : String,
    email: String,
    deliveryPhone:String,
    pickupPhone:String,
    deliveryDate:Date,
    pickupDate:Date,
    deliveryName:String,
    dateStamp: {type: Date, default: Date.now}
});

//transform schema, into a model
const Errand = mongoose.model('Errand', errandSchema);
async function createErrand(model) {
    const errand = new Errand({
        name : model.Name,
        phone : model.Phone,
        pickupAddress : model.PickupAddress,
        deliveryAddress : model.DeliveryAddress,
        email: model.Email,
        deliveryPhone : model.DeliveryPhone,
        pickupPhone : model.PickupPhone,
        deliveryDate : model.DeliveryDate,
        pickupDate : model.PickupDate,
        deliveryName : model.DeliveryName
    })
    
    const result = await errand.save();
    return result._id;
} 

async function getErrands() {
    const errands = await Errand
    .find()
    .sort({dateStamp: -1});
    return errands;
}

async function getErrand(id) {
    const errand = await Errand.findById(id);
    return errand;
}

async function updateErrand(model) {

    const booking = await Errand.findById(id);
    if (!booking) return

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
    
    await errand.save();
}

async function deleteErrand(id) {
    const errand = await Errand.deleteOne({_id: id});
}

//POST: make a delivery booking
app.post('/api/make-booking', (req, res)=>{ 
    console.log("the date is "+req.body.DeliveryDate);
    const {error} = validateDelivery(req.body); //this line is equivalent to returning result.error, it's called object destructuring
    if (error) return res.status(400).send(error.details[0].message);
    const result = createErrand(req.body);
    res.send(result);
});

//get all bookings
app.get('/api/bookings', (req, res)=>{
    const errands = getErrands();
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
    const booking= Errand.find(c=> c.Id === parseInt(req.params.Id));
    if (!booking) return res.status(404).send(`The booking with the Id ${req.params.Id} could not be found`);

   
   //const result = validateDelivery(req.body);
   const {error} = validateDelivery(req.body); //this line is equivalent to returning result.error, it's called object destructuring
    if (error) return res.status(400).send(error.details[0].message);

    updateErrand(req.body);
});
//delete a course
app.delete('/api/booking/:Id', (req, res)=>{
    const booking= errands.find(c=> c.Id === parseInt(req.params.Id));
    if (!booking) return res.status(404).send(`The booking with the Id ${req.params.Id} could not be found`);

    deleteErrand();
});

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

//Use array to store data for now
const errands = 
    [
        {Id : 1, Name:'Chi Esther', Phone:"08099977876", PickupAddress:"Ikeja", DeliveryAddress:"Lagos Island", Email:"ng@yahoo.com",PickupPhone:"08090977876",DeliveryPhone:"08099923876",DeliveryDate:"11-02-2020",PickupDate:"11-02-2020", DeliveryName:"testin name"}, 
        {Id : 2, Name:'John Omega', Phone:"08098977876", PickupAddress:"Gbagada", DeliveryAddress:"Lagos Island", Email:"babyng@yahoo.com",PickupPhone:"09090977126",DeliveryPhone:"08092312876",DeliveryDate:"11-02-2020",PickupDate:"11-02-2020",DeliveryName:"tester name"}
    ]

    //setting an environment variable
    const port = process.env.PORT || 3000;
    app.listen(port, ()=>{ console.log(`listening on port ${port}`)});
