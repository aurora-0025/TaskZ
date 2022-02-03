const { connect } = require('mongoose');
//call the Schema file
require('./task.model')

// Connect to Database
connect('mongodb://127.0.0.1:27017/todo',{useNewUrlParser: true})
.then(()=>{    
    console.log("The db is connected")

})
.catch((err)=>console.log(err));