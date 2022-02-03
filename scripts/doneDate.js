const moment = require('moment')
module.exports = function findDoneDayTime(dueDate, done) {

let date = moment(dueDate, false).calendar().split(" at")[0];
let time =  moment(dueDate, false).format("hh:mm A");
let doneDate = moment(done, false).calendar().split(" at")[0];
let doneTime =  moment(done, false).format("hh:mm A");
let dueTime =  moment(dueDate, false).format("hh:mm A");
let doneStatus = "done Late"

if(moment(dueDate).isAfter(moment(new Date()),'second')){
    doneStatus ="Done On Time";
}
if(moment(dueDate).isSame(moment(new Date()),'day')){
    time = moment(dueDate).fromNow()
}
if(moment(dueDate).isBefore(moment(new Date()),'second')){
    doneStatus ="Done Late"
}

if(moment(dueDate).isSame(moment(done, false),'day')){
    Donetime = moment(dueDate).fromNow()
}

let result = {
    "date": date,
    "time": dueTime,
    "doneStatus": doneStatus,
    "doneDay": doneDate,
    "doneTime": doneTime,
}

return result;
}