const allPages = document.querySelectorAll('div.page');
allPages[0].style.display = 'block';

function navigateToPage(event) {
  const pageId = location.hash ? location.hash : '#login';
  for (let page of allPages) {
    if (pageId === '#' + page.id) {
      page.style.display = 'block';
    } else {
      page.style.display = 'none';
    }
  }
  return;
}
navigateToPage();

//init handler for hash navigation
window.addEventListener('hashchange', navigateToPage);