const express = require('express');
const res = require('express/lib/response');
const router= express.Router()
const {model, set} = require('mongoose');
const findDayTime = require("../scripts/dueDate")
const findDoneDayTime = require("../scripts/doneDate")
const moment = require('moment')
const taskModel = model('Task')

// Functions

function markDone(req, res) {
    doneDate = moment()
    let doneData = findDoneDayTime(req.body.taskDue, doneDate)

    let data = {}
    data.taskDay = doneData.date
    data.taskTime = doneData.time
    data.taskDoneStatus = doneData.doneStatus
    data.taskDone = true
    data.taskDoneDate = moment()
    data.taskDoneDay = doneData.doneDay
    data.taskDoneTime = doneData.doneTime

    taskModel.findByIdAndUpdate(req.params.id, data, function (err, doc) {
        if(!err){
            console.log(doc);
            res.redirect('/')
        }
        else{
            console.log(err);
            res.redirect('/505')
        }
    })
    
}

function updateDueDate(doc) {
    let data = findDayTime(doc.taskDue)
    let task = {}
    task.taskDay = data.date
    task.taskTime = data.time
    task.taskStatus = data.status

taskModel.findByIdAndUpdate(doc.id,task ,function (err, docs) {
        if (!err){
            return;
        }
        else{
            console.log(err);
        }
    })
}

function editTask(req, res) {
    let data=findDayTime(req.body.taskDatetime)
    let update = {};
    update.taskEmoji = req.body.taskEmoji 
    update.taskColor = req.body.taskTheme
    update.taskName = req.body.taskName
    update.taskDue = new Date(req.body.taskDatetime) 
    update.taskDesc = req.body.textArea
    update.taskDay = data.date
    update.taskTime = data.time
    update.taskStatus = data.status

    taskModel.findByIdAndUpdate(req.params.id, update, function (err, doc) {
            if (!err){
                res.redirect('/home')
            }
            else{
                console.log(err);
                res.redirect('/500')
            }
        
    })
    
}


function addTask(req, res) {
    let data=findDayTime(req.body.taskDatetime)
    let task = new taskModel();
    task.taskEmoji = req.body.taskEmoji 
    task.taskColor = req.body.taskTheme
    task.taskName = req.body.taskName
    task.taskDue = new Date(req.body.taskDatetime) 
    task.taskDesc = req.body.textArea
    task.taskDay = data.date
    task.taskTime = data.time
    task.taskStatus = data.status
    task.taskDone = false

    task.save((err, docs)=>{
        if(!err){
            res.redirect("/home")
        }
        else{
            console.log(`An error occured while saving ${err}`);
        }
    })
}


// ROUTES

router
    .get('/', (req, res) => {
        res.redirect('/home')
    })
    .post((req, res)=>{
        addTask(req, res)
    })
router.route('/home')
    .get((req, res) => {
     taskModel.find({}).sort({taskDue: 1}).exec(function (err, docs) {
         let pendingTasks = []
         let completedTasks = []
         docs.map((doc)=>{
            updateDueDate(doc)
            if(doc.taskDone){
                completedTasks.push(doc.toJSON())
            }
            else{
                pendingTasks.push(doc.toJSON())
            }
         })
            if(!err){
                res.render('home', {
                    title:'TaskZ', 
                    tasks:pendingTasks,
                    doneTasks:completedTasks
                })
            }
            else{
                console.log(err);
                res.redirect('/500')
            }

        })
        })

router.route('/create')
    .get((req, res) => {
        res.render('create', {title:'Create A Task'})
    })
    .post((req, res)=>{
        addTask(req, res)  
    })

router.route('/preview/:id')
    .post((req,res)=>{
        res.redirect('/preview/:id')
    })
    .get((req,res)=>{
        taskModel.findById(req.params.id, (err, doc)=>{
            if(!err){
                res.render('preview', {title:'Preview Task', task:doc.toJSON()}) 
            }
            else{
                console.log(err);
                res.redirect('/500')
            }
        })
     })

router.route('/home/delete/:id')
     .post((req,res)=>{
         taskModel.findByIdAndDelete(req.params.id, (err, doc)=>{
             if(!err){
                console.log(`Deleted task of id ${doc._id}`);
                res.redirect('/')
             }
             else{
             console.log(err);
             res.redirect('/500')
             }
         })
     })

router.route('/edit/:id')
    .post((req, res)=>{
        taskModel.findById(req.params.id, function (err,doc) {
            if(!err){
                res.render('edit',{title:'Edit Task', task:doc.toJSON()})
            }
            else{
                console.log(err);
                res.redirect('/500')
            }
        })
    })
router.route('/edit/:id/save')
    .post((req,res)=>{
        editTask(req,res)
    })

router.route('/done/:id')
    .post((req, res)=>{
        markDone(req, res)
    })

//HANDLE 500
router.get('/500', (req,res)=>{
    res.render('500', {title:'500'})
})

//HANDLE 404
router.get('/404', (req,res)=>{
    res.render('404', {title:'404'})
})
router.get('*', (req, res)=>{
    res.redirect('/404')
})

module.exports = router
