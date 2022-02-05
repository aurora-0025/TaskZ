var date = document.getElementById('task-datetime');
var error = document.getElementById('create-error')
const save = document.getElementById('task-save');
var d = new Date();
var nd = new Date(this.value);
save.addEventListener('click', function(e){ 
  if(new Date(date.value).getTime() <= d.getTime()){
    e.preventDefault()
    let op=1;  
    error.textContent="The date and time must be greater than now"
    error.style.display="block"
    error.style.opacity="1"
    error.style.color="red"
    error.style.textAlign="center"
  setTimeout(() => {
    var timer = setInterval(() => {
      if (op <= 0.1){
          clearInterval(timer);
          error.style.display = 'none';
      }
      error.style.opacity = op;
      error.style.filter = 'alpha(opacity=' + op * 100 + ")";
      op -= op * 0.2;
    }, 50);
  }, 2000);
    date.value=ISOlocalDate
  }
  else{
    console.log("success")
  }
})
