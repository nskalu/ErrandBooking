const mongoose = require('mongoose')
const env = require('./environment/environment')
//mongoose.connect(`mongodb://localhost/${env.dbName}`)//mongoose will create this db when you first write sth to this db
mongoose.connect(`mongodb://${env.dbName}:${env.key}@${env.dbName}.mongo.cosmos.azure.com:${env.port}/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@${env.dbName}@`)
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
    .save();
    //.then(x=>{

    //});
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

async function updateErrand(req, id) {
    const booking = await Errand.findById(id);
    if (!booking) return;

    booking.BookerName = req.BookerName;
    booking.BookerPhone = req.BookerPhone;
    booking.SenderName = req.SenderName;
    booking.SenderPhone = req.SenderPhone;
    booking.RecipientName = req.RecipientName;
    booking.RecipientPhone = req.RecipientPhone;
    booking.PickupAddress = req.PickupAddress;
    booking.DeliveryAddress = req.DeliveryAddress;
    booking.DeliveryDate = req.DeliveryDate;
    booking.PickupDate = req.PickupDate;
    booking.PaymentMethod = req.PaymentMethod;
    booking.Payer = req.Payer;
    booking.Prioritylevel = req.Prioritylevel;
    
    await booking.save();
}

async function deleteErrand(id) {
    const errand = await Errand.deleteOne({_id: id});
}

module.exports.deleteErrand = deleteErrand;
module.exports.updateErrand = updateErrand;
module.exports.getErrand = getErrand;
module.exports.getErrands = getErrands;
module.exports.createErrand = createErrand;