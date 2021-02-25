const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/SuzerrandDb")//mongoose will create this db when you first write sth to this db
.then(()=> console.log("Connected to MongoDb..."))
.catch(err=> console.error("Could not connect to db..", err));

//create schema to define the shape of the document
const errandSchema = new mongoose.Schema({
    BookerName : String,
    BookerPhone : String,
    SenderName : String,
    SenderPhone : String,
    RecipientName: String,
    RecipientPhone:String,
    PickupAddress:String,
    DeliveryAddress: String,
    DeliveryDate: Date,
    PickupDate: Date,
    PaymentMethod: String,
    Payer : String,
    Prioritylevel : String,
    dateStamp: {type: Date, default: Date.now}
});

//transform schema, into a model
const Errand = mongoose.model('Errand', errandSchema);

async function createErrand(model) {
    const errand = new Errand({
        BookerName : model.BookerName,
        BookerPhone : model.BookerPhone,
        SenderName : model.SenderName,
        SenderPhone : model.SenderPhone,
        RecipientName: model.RecipientName,
        RecipientPhone : model.RecipientPhone,
        PickupAddress : model.PickupAddress,
        DeliveryAddress : model.DeliveryAddress,
        DeliveryDate : model.DeliveryDate,
        PickupDate : model.PickupDate,
        PaymentMethod : model.PaymentMethod,
        Payer : model.Payer,
        Prioritylevel : model.Prioritylevel
    })
    
    const result = await errand
    .save()
    .then(x=>{

    });
    console.log(result);
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

    booking.BookerName=req.body.BookerName;
    booking.BookerPhone=req.body.BookerPhone;
    booking.SenderName=req.body.SenderName;
    booking.SenderPhone=req.body.SenderPhone;
    booking.RecipientName=req.body.RecipientName;
    booking.RecipientPhone=req.body.RecipientPhone;
    booking.PickupAddress=req.body.PickupAddress;
    booking.DeliveryAddress = req.body.DeliveryAddress;
    booking.DeliveryDate = req.body.DeliveryDate;
    booking.PickupDate=req.body.PickupDate;
    booking.PaymentMethod = model.PaymentMethod;
    booking.Payer = model.Payer;
    booking.Prioritylevel = model.Prioritylevel;
    
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