const moment = require('moment')
module.exports = function findDoneDayTime(dueDate, done) {

let date = moment(dueDate, false).local().calendar().split(" at")[0];
let time =  moment(dueDate, false).local().format("hh:mm A");
let doneDate = moment(done, false).local().calendar().split(" at")[0];
let doneTime =  moment(done, false).local().format("hh:mm A");
let dueTime =  moment(dueDate, false).local().format("hh:mm A");
let doneStatus = "done Late"

if(moment(dueDate).isAfter(moment(new Date()).local(),'second')){
    doneStatus ="Done On Time";
}
if(moment(dueDate).isSame(moment(new Date()).local(),'day')){
    time = moment(dueDate).fromNow()
}
if(moment(dueDate).isBefore(moment(new Date()).local(),'second')){
    doneStatus ="Done Late"
}

if(moment(dueDate).isSame(moment(done, false).local(),'day')){
    Donetime = moment(dueDate).local().fromNow()
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