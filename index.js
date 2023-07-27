// import express
var express = require('express');  
// import cors
const cors = require('cors')
// import body-parser used to parse json body into javascript object
const bodyParser = require("body-parser"); 
var app = express(); 
// definition of Rest API's port
var port = process.env.port || 1333;  
// definition of Person controller
const personController = require('./Controller/personController');
 
app.use(cors());
app.use(bodyParser.json());
 
// definition of routers
const router  = express.Router();   
router.get("/people", personController.getPeople);
router.get("/people/:surname", personController.getPerson);
router.delete("/people/:surname", personController.deletePerson);
router.post("/people/", personController.createPerson);
router.put("/people/", personController.updatePerson);
 
app.use("/api", router);
 
app.listen(port, (err) => {
    if (err) console.log(err);
    else console.log(`Server started on port: ${port}`);
  });