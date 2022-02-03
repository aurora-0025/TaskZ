const { Schema, model } = require('mongoose');

const toDoSchema = new Schema({
    taskEmoji:{
        type:String
    },
    taskColor:{
        type:String
    },
    taskName:{
        type:String
    },
    taskDue:{
        type:Date
    },
    taskTime:{
        type:String
    },
    taskDay:{
        type:String
    },
    taskDesc:{
        type:String
    },
    taskStatus:{
        type:String
    },
    taskDone:{
        type:Boolean
    },
    taskDoneDate:{
        type:Date,
    },
    taskDoneDay:{
        type:String,
    },
    taskDoneTime:{
        type:String,
    },
    taskDoneStatus:{
        type:String
    }

})

model('Task', toDoSchema)