var date = document.getElementById('task-datetime');
date.addEventListener('change', function(){
  var d = new Date();
  var nd = new Date(this.value);
  
  if(new Date(this.value).getTime() <= d.getTime()){
    alert("Error, The date and time must be greater than now");
    date.value=''
  }
  else{
    console.log("success")
  }
})