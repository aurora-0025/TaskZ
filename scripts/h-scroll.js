const scrollContainer = document.querySelector(".home-task-container");
console.log('loaded');
function isOverflown(element) {
    return element.scrollWidth > element.clientWidth;
  }

if(isOverflown(scrollContainer)){
    scrollContainer.addEventListener("wheel", (evt) => {
        evt.preventDefault();
        scrollContainer.scrollLeft += evt.deltaY;
    });
}