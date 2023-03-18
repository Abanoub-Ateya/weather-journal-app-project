// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

// choose a port to run the server locally
const port = 3000;

// set a variable for the server 
const server = app.listen(port, ()=> {
    console.log(`running on server ${port}`)
}
)



/*
 a get route that gets data and make it available on the server when
getting to the url specified on the port
*/ 
app.get("/route", (req, res)=>{

    res.send(projectData);
     console.log(projectData)
})



/*
a post request to add the data referred from the client side
to the project endpoint
data added to the project endpoint (projectData) & could then
be accessed with the get request
*/
app.post("/add",(req, res)=> {
console.log(req.body)
    newEntry = {
        date: req.body.date,
        temperature: req.body.temperature,
        content: req.body.content
    }
projectData = newEntry
    

}
)

