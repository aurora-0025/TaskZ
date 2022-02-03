const moment = require('moment')
module.exports = function findDayTime(dueDate) {

    let date = moment(dueDate).calendar().split(" at")[0];
    let time =  moment(dueDate).format("hh:mm A");
    let status;

    if(moment(dueDate).isAfter(moment(new Date()),'second')){
        status ="Due";
    }
    if(moment(dueDate).isSame(moment(new Date()),'day')){
        time = moment(dueDate).fromNow()
    }
    if(moment(dueDate).isBefore(moment(new Date()),'second')){
        status ="Late"
    }


  
    let result = {
        "date": date,
        "time": time,
        "status": status
    }
    return result
}