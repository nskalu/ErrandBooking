const express = require("express"); //returns a function
const app = express();
require("../controller")(app);
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../../swagger.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//setting an environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
