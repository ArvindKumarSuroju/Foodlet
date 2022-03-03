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