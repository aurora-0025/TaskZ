const moment = require('moment')
module.exports = function findDoneDayTime(dueDate, done) {

let date = moment(dueDate, false).local().format("DD:MM:YYYY");
let doneDate = moment(done, false).local().format("DD:MM:YYYY");
let doneTime =  moment(done, false).local().format("hh:mm A");
let dueTime =  moment(dueDate, false).local().format("hh:mm A");
let doneStatus = "done Late"

if(moment(dueDate).isAfter(moment(new Date()).local(),'second')){
    doneStatus ="Done On Time";
}
if(moment(dueDate).isBefore(moment(new Date()).local(),'second')){
    doneStatus ="Done Late"
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