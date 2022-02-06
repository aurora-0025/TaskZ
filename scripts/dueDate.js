const moment = require('moment')
module.exports = function findDayTime(dueDate) {

    let date = moment(dueDate).local().calendar().split(" at")[0];
    let time =  moment.utc(dueDate).local().format("hh:mm A");
    let status;

    if(moment(dueDate).isAfter(moment(new Date()).local(),'second')){
        status ="Due";
    }
    if(moment(dueDate).isBefore(moment(new Date()).local(),'second')){
        status ="Late"
    }
  
    let result = {
        "date": date,
        "time": time,
        "status": status
    }
    return result
}