const express = require('express') //returns a function
const app = express();

//setting an environment variable
const port = process.env.PORT || 3000;
app.listen(port, ()=>{ console.log(`listening on port ${port}`)});