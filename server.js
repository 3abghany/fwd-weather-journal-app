// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
//Dependencies
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
//const { request } = require('express');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;

const runServer= ()=>{
  console.log('server connected on port number', port);
  };
  
const server = app.listen(port, runServer);


//GET & POST routes callback functions

const getRoute = (req, res) => {
  res.send(projectData)
}
 
const postRoute = (req, res) => {
  bodyPieces = req.body
  dataPieces = {
    temp: bodyPieces.temp,
    date: bodyPieces.date,
    userRes:bodyPieces.userRes
 }

 projectData = dataPieces;
 console.log(projectData)
}

//Add a GET POST routes
app.get('/get', getRoute)
app.post('/post', postRoute)





 