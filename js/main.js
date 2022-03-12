// const allPages = document.querySelectorAll('div.page');
// allPages[0].style.display = 'block';

// function navigateToPage(event) {
//   const pageId = location.hash ? location.hash : '#login';
//   for (let page of allPages) {
//     if (pageId === '#' + page.id) {
//       page.style.display = 'block';
//     } else {
//       page.style.display = 'none';
//     }
//   }
//   return;
// }
// navigateToPage();

// //init handler for hash navigation
// window.addEventListener('hashchange', navigateToPage);

//hamburger menu //

const menuBtn = document.querySelector(".hamburger");
const sidebar = document.querySelector("#sidebar");
const closeBtn = document.querySelector(".side_close");

menuBtn.addEventListener('click',()=>{
    if (sidebar.classList.contains('on')){
        sidebar.classList.remove('on');
    } else {
        sidebar.classList.add('on');
    }
});

closeBtn.addEventListener('click',()=>{
    sidebar.classList.remove('on');
});

//Geolocation//
if ( navigator.geolocation ) {
          	navigator.geolocation.getCurrentPosition( 
             ( position ) => {  // success callback
            		console.log("latitude = " + position.coords.latitude);
            		console.log("longitude = " + position.coords.longitude);
          	}, 
            ( error ) => {    // failure callback
                console.log( error );
                if (	error.code == error.PERMISSION_DENIED ) {
                    window.alert("geolocation permission denied");
                }
             });
        } else {  // no geolocation in navigator. in the case of old browsers
          console.log("Geolocation is not supported by this browser.");
        };
    
//Slider //
 
const carouselSlide = document.querySelector(".stores_slide");
const carouselStore = document.querySelectorAll(".stores_slide>li");

//Buttons
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");

//Counter 

let counter = 1;
const size = carouselStore[0].clientWidth;

carouselSlide.style.transform = 'translateX(' + (-size * counter )+ 'px)';


//Button Listener

nextBtn.addEventListener('click',()=>{
    if (counter >= carouselStore.length -1 ) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter++;
    carouselSlide.style.transform = 'translateX(' + (-size * counter )+ 'px)';
})

prevBtn.addEventListener('click',()=>{
    if (counter <= 0 ) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter--;
    carouselSlide.style.transform = 'translateX(' + (-size * counter )+ 'px)';
})


carouselSlide.addEventListener('transitionend',()=>{
    if(carouselStore[counter].id === 'last_clone'){
        carouselSlide.style.transition = "none";
        counter = carouselStore.length -2;
        carouselSlide.style.transform = 'translateX(' + (-size * counter )+ 'px)';
    }
    if(carouselStore[counter].id === 'first_clone'){
        carouselSlide.style.transition = "none";
        counter = carouselStore.length - counter;
        carouselSlide.style.transform = 'translateX(' + (-size * counter )+ 'px)';
    }
})