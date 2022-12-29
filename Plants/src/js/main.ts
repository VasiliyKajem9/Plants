import '../scss/main.scss';
import '../index.html';

const anchors = document.querySelectorAll('a[href*="#"]');

for (const anchor of anchors) {
  anchor.addEventListener('click', function (event) {
    event.preventDefault();
    const allAnchors: string = anchor.getAttribute('href')!;
    document.querySelector('' + allAnchors)!.scrollIntoView({
      behavior:'smooth',
      block:'start',
    });
  });
}

function mobileMenu() {
  const mobileBtn = document.querySelector('#mobileBtn') as HTMLButtonElement;
  const headerNav = document.querySelector('#headerNav') as HTMLElement;

  const input = () => {
    setTimeout(() => headerNav.classList.toggle('nav_active'), 10);
    headerNav.style.display = 'flex';
    mobileBtn.classList.toggle('mobileBtn_active')
  }

  const output = () => {
    setTimeout(() => headerNav.style.display = 'none', 300);
    mobileBtn.classList.toggle('mobileBtn_active');
    headerNav.classList.toggle('nav_active');
  }

  mobileBtn.onclick = () => {
    if (headerNav.className.includes('nav_active')) {
      output()
    } else input()
  }
}
mobileMenu()