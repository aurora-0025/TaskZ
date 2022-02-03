const { connect } = require('mongoose');
require('dotenv').config()
//call the Schema file
require('./task.model')

// Connect to Database
connect(process.env.DATABASE_URI,{useNewUrlParser: true})
.then(()=>{    
    console.log("The db is connected")

})
.catch((err)=>console.log(err));