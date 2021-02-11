const mongoose = require('mongoose')
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

async function createErrand(model, ) {
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
        deliveryName : model.DeliveryName,
        BookerName : model.BookerName,
        BookerNumber : model.BookerNumber,
        PaymentMethod : model.PaymentMethod,
        Payer : model.Payer
    })
    
    const result = await errand
    .save()
    .then(x=>{

    });
    console.log(result._id);
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

module.exports.deleteErrand = deleteErrand;
module.exports.updateErrand = updateErrand;
module.exports.getErrand = getErrand;
module.exports.getErrands = getErrands;
module.exports.createErrand = createErrand;