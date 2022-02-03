//Import all relevant modules
const express = require("express");
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
//To connect to the database
require("./models/db")

//To call the routers
const router = require('./routes/router.js')

// Set The View Engine to express-handlebars
app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine({
layoutsDir: __dirname + '/views/layouts',
partialsDir: __dirname + '/views/partials/',
extname: 'hbs' //set extension name to hbs
})
);

//MIDDLEWARE
// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use('/public',express.static(__dirname + '/public'));
app.use('/scripts',express.static(__dirname + '/scripts'));
app.use('/assets',express.static(__dirname + '/assets'));


app.use('/',router) //middleware to call all routes

//Initialize the server to the port 3000 or .env port
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));