// const allPages = document.querySelectorAll('div.page');
// allPages[0].style.display = 'block';

// function navigateToPage(event) {
//   const pageId = location.hash ? location.hash : '#main_page';
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

//click 
// const button = document.querySelector(".filter");
// const filterPage = document.querySelector("#filter");
// button.addEventListener('click',()=>{
//     filterPage.style.display="block";
// });

// const closeBtn = document.querySelector(".close");
// closeBtn.addEventListener('click',()=>{
//     filterPage.style.display="none";
// });

//SIDEMENU BUTTON
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