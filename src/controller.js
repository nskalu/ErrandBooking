
const express = require('express') //returns a function
const app = express();
const db = require('db.js');
const validate = require ('./src/shared/validate');
app.use(express.json());

//POST: make a delivery booking
app.post('/api/make-booking', async function(req, res){ 
    console.log("just hitting");
    const {error} = validate.validateDelivery(req.body); //this line is equivalent to returning result.error, it's called object destructuring
    if (error) return res.status(400).send(error.details[0].message);
    console.log("validated successfully");
    const result = await db.createErrand(req.body);
    console.log(result);
    res.send(result);
});

//get all bookings
app.get('/api/bookings', async function(req, res){
    const errands = db.getErrands();
    res.send(errands);
});

//get a single booking
app.get('/api/booking/:Id/', async function(req, res){
    const booking= db.getErrand(req.params.Id);
    if (!booking) res.status(404).send(`The booking with the Id ${req.params.Id} could not be found`); 
    res.send(booking);
});

//update booking with payment by admin
app.put('/api/booking/:Id', async function(req, res){
    const booking= db.getErrand(req.params.Id);
    if (!booking) return res.status(404).send(`The booking with the Id ${req.params.Id} could not be found`);

   const {error} = validate.validateDelivery(req.body); //this line is equivalent to returning result.error, it's called object destructuring
    if (error) return res.status(400).send(error.details[0].message);

    db.updateErrand(req.body);
});
//delete a course
app.delete('/api/booking/:Id', async function(req, res){
    const booking= errands.find(c=> c.Id === parseInt(req.params.Id));
    if (!booking) return res.status(404).send(`The booking with the Id ${req.params.Id} could not be found`);

    db.deleteErrand();
});
