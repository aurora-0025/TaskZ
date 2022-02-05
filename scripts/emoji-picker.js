const button = document.querySelector('#emoji-input');
const emojiPicker = document.querySelector('emoji-picker');

function fadeIn(body) {
    body.style.display="block"
    var fade = body;
    var opacity = 0;
    var intervalID = setInterval(function() {
        if (opacity < 1) {
            opacity = opacity + 0.2;
            fade.style.opacity = opacity;
        } else {
            clearInterval(intervalID);
        }
    }, 25);
}
function fadeOut(body) {
    var fade= body;
    var intervalID = setInterval(function () {   
        if (!fade.style.opacity) {
            fade.style.opacity = 1;
        } 
        if (fade.style.opacity > 0) {
            fade.style.opacity -= 0.1;
        } 
          
        else {
            clearInterval(intervalID);
            body.style.display="none"
        }
    }, 25);
}

function hide(body, opacity, intervalId) {
    opacity = Number(window.getComputedStyle(body).getPropertyValue("opacity"));
    if (opacity > 0) {
        opacity = opacity - 0.1;
        body.style.opacity = opacity
    } else {
        clearInterval(intervalId);
    }
}



//To Hide the text cursor in the emoji text input
button.readOnly = true;
    button.onfocus = function(){
        button.blur();
    };



button.addEventListener('click', ()=>{
    fadeIn(emojiPicker)
    emojiPicker.addEventListener('emoji-click', event => {
        fadeOut(emojiPicker)
        button.value=event.detail.unicode
    });
    //I'm using "click" but it works with any event
    document.addEventListener('click', function(event) {
        var isClickInside = emojiPicker.contains(event.target);
        if(button.contains(event.target)) return;
    
        if (!isClickInside) {
        //the click was outside the specifiedElement, do something
        fadeOut(emojiPicker)
        }
    });

})
