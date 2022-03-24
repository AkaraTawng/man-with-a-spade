//navbar toggle dropdown
const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]
toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
});

//image carousel
const track = document.querySelector('.carousel__track') /*quersySelector looks in file and looks for passed argument.*/

const slides = Array.from(track.children);   /*stores all slides in a single variable within an array*/

const nextButton = document.querySelector('.carousel__button--right'); /* stores left and right carousel buttons */
const prevButton = document.querySelector('.carousel__button--left');

const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children); 

const slideWidth = slides[0].getBoundingClientRect().width; /* accesses first element of array and stores size of element (image) in variable. getBoundingClientRect() method returns a DOMRect object. This accesses a the width property of that object and stores it in a variable */



console.log(slideWidth);


const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
}; 
slides.forEach(setSlidePosition); /* Arranges carousel slides next to one another using forEach to iterate through the slides */


/* A reusable function for slide scrolling. Takes 3 parameters to avoid hardcoding*/
const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
     /* moves slides across the x-axis to the specified amount */
    
     currentSlide.classList.remove('current-slide');
     targetSlide.classList.add('current-slide');
        /* updates class 'current-slide' on slides so can scroll multiple times */
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
       /* updated current-slide class to clicked dot, giving it the css style - so dots will dynamically change color when clicked. turns functionality into a reusable function */
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {if (targetIndex === 0){ /* self-explanatory */
    prevButton.classList.add('is-hidden');
    nextButton.classList.remove('is-hidden');
} else if (targetIndex === slides.length - 1){
    prevButton.classList.remove('is-hidden');
    nextButton.classList.add('is-hidden');
} else {
    prevButton.classList.remove('is-hidden');  
    nextButton.classList.remove('is-hidden');  
}

}



//when click left, move slides left
   prevButton.addEventListener('click', e => {
       const currentSlide = track.querySelector('.current-slide');
       const prevSlide = currentSlide.previousElementSibling;
       const currentDot  = dotsNav.querySelector('.current-slide')
       const prevDot = currentDot.previousElementSibling;
       const prevIndex = slides.findIndex(slide => slide === prevSlide); /* finds index number of prevSlide */



       
       moveToSlide(track, currentSlide, prevSlide);
       updateDots(currentDot, prevDot);
       hideShowArrows(slides, prevButton, nextButton, prevIndex);

   });


//when click right, move slides right 
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    /* identifies current slide and stores it in variable */
    
    const nextSlide = currentSlide.nextElementSibling;
    /* identifies next slide and stores it in variable */

    const currentDot  = dotsNav.querySelector('.current-slide') /* defines current dot */

    const nextDot = currentDot.nextElementSibling;
    /* defines next dot as element (dot) next to current dot */
    const nextIndex = slides.findIndex(slide => slide === nextSlide); /* finds index number of nextSlide */

    moveToSlide(track, currentSlide, nextSlide);
    /* calls function and passes 3 arguments. nextSlide replaces targetSlide */

    updateDots(currentDot, nextDot); /* adds dot color changing functionality to button */

    hideShowArrows(slides, prevButton, nextButton, nextIndex);

});

//when I click the indicators, move to that slide
dotsNav.addEventListener('click', e => {
    //what indicator was clicked on 
    const targetDot = e.target.closest('button'); /*  sets targetDot equal to indicator button only - not surrounding area. surrounding area will return null */
    
    if(!targetDot) return; /* if targetDot returns null/falsy if will exit the function. used to avoid running heavy function when not a dot is clicked */

    const currentSlide = track.querySelector('.current-slide'); /* identifies current slide */

    const currentDot = dotsNav.querySelector('.current-slide');
    /* identifies current dot */

    const targetIndex = dots.findIndex(dot => dot === targetDot);
    /* identifies and returns array index of current dot */

    const targetSlide = slides[targetIndex];
    /* connects targetIndex to targetSlide i.e.; if click in x dot go to x slide*/

    moveToSlide(track, currentSlide, targetSlide);
    /* calls moveToSlide function and passes in targetSlide. function will move slide depending on what dot is clicked */

    updateDots(currentDot, targetDot);
    hideShowArrows(slides, prevButton, nextButton, targetIndex);

   
})


/* ACCORDION */

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}

/* MAP */
    // Initialize and add the map
    function initMap() {
        // The location of Uluru
        const bridport = { lat: 50.733578, lng: -2.758301};
        // The map, centered at Uluru
        const map = new google.maps.Map(document.querySelector("#map"), {
          zoom: 14,
          center: bridport,
        });
        // The marker, positioned at Uluru
        const marker = new google.maps.Marker({
          position: bridport,
          map: map,
          icon: "./MWSLOGO5_80.png",
          
        });
      }

