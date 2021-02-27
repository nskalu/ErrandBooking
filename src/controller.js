const express = require("express"); //returns a function
const app = express();
const db = require("../src/shared/db.js");
const validate = require("../src/shared/validate");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
var bodyParser = require('body-parser')
 
// create application/json parser
var jsonParser = bodyParser.json()

module.exports = (app) => {
  //POST: make a delivery booking
  app.post("/api/make-booking", jsonParser, async function (req, res) {
    const { error } = validate.validateDelivery(req.body); //this line is equivalent to returning result.error, it's called object destructuring
    if (error) return res.status(400).send(error.details[0].message);
    console.log("validated successfully");
    const result = await db.createErrand(req.body);
    res.send(result);
  });

  //get all bookings
  app.get("/api/bookings", async function (req, res) {
    const errands = await db.getErrands();
    res.send(errands);
  });

  //get a single booking
  app.get("/api/booking/:Id", async function (req, res) {
    const booking = await db.getErrand(req.params.Id);
    if (!booking)
      res
        .status(404)
        .send(`The booking with the Id ${req.params.Id} could not be found`);
    res.send(booking);
  });

  //update booking with payment by admin
  app.put("/api/booking/:id", jsonParser, async function (req, res) {
    const booking = await db.getErrand(req.params.id);
    if (!booking)
      return res
        .status(404)
        .send(`The booking with the Id ${req.params.id} could not be found`);

    const { error } = validate.validateDelivery(req.body); //this line is equivalent to returning result.error, it's called object destructuring
    if (error) return res.status(400).send(error.details[0].message);
    console.log(req.body);
    console.log(req.params.id);
    await db.updateErrand(req.body, req.params.id);
    res.status(204).send();
  });
  //delete a course
  app.delete("/api/booking/:id", async function (req, res) {
    const booking = await db.getErrand(req.params.id);
    if (!booking)
      return res
        .status(404)
        .send(`The booking with the Id ${req.params.id} could not be found`);

    await db.deleteErrand(req.params.id);
    res.status(204).send();
  });
};
