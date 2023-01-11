import '../scss/main.scss';
import '../index.html';

const mobileBtn = document.querySelector('#mobileBtn') as HTMLButtonElement;
const headerNav = document.querySelector('#headerNav') as HTMLElement;
const overlay = document.createElement('div');

document.body.prepend(overlay);
overlay.className = 'app__overlay';
overlay.style.cssText = `
  width: 100%;
  height: 100vh;
  background-color: #EDF2EC;
  opacity: .5;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  display: none;
`

const input = () => {
  setTimeout(() => headerNav.classList.toggle('nav_active'), 10);
  headerNav.style.display = 'flex';
  mobileBtn.classList.toggle('mobileBtn_active');
  overlay.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

const output = () => {
  setTimeout(() => headerNav.style.display = 'none', 300);
  mobileBtn.classList.toggle('mobileBtn_active');
  headerNav.classList.toggle('nav_active');
  overlay.style.display = 'none';
  document.body.style.overflow = 'scroll';
}

function mobileAction() {
  if (headerNav.className.includes('nav_active')) {
    output()
  } else input()
}

mobileBtn.onclick = mobileAction;
overlay.onclick = mobileAction;

// smoth anchors

const anchors = document.querySelectorAll('a[href*="#"]');

for (const anchor of anchors) {
  anchor.addEventListener('click', function (event) {
    event.preventDefault();
    const allAnchors: string = anchor.getAttribute('href')!;
    document.querySelector('' + allAnchors)!.scrollIntoView({
      behavior:'smooth',
      block:'start',
    });

    if (headerNav.className.includes('nav_active') && window.outerWidth < 768) {
      output()
    } else return
  });
}

// services picker

let pickedServices: Array<string> = [];

const servicesControlBtn: Array<HTMLButtonElement> = 
  Array.from(document.querySelectorAll('.serviceNav__elem'));

const services: Array<HTMLElement> = 
  Array.from(document.querySelectorAll('.ourWorks__item'));

const activeCleaner = (arr: Array<HTMLElement>, classToRemove: string) => {
  arr.forEach(elem => {
    elem.classList.remove(`${classToRemove}`)
  })
}

servicesControlBtn.forEach(navBtn => {
  navBtn.onclick = () => {
    let count = 0;

    if (navBtn.className.includes('serviceNav__elem_active')) {
      navBtn.classList.remove('serviceNav__elem_active');
    } else {
      navBtn.classList.add('serviceNav__elem_active');
    } 

    if (!pickedServices.includes(`${navBtn.dataset.category}`)) {
      pickedServices.push(navBtn.dataset.category!);
    } else pickedServices = pickedServices.filter(elem => elem != navBtn.dataset.category)
    
    console.log(pickedServices)

    servicesControlBtn.forEach(item => {
      if (item.className.includes('serviceNav__elem_active')) {
        count += 1;
      }
    })

    services.forEach(service => {
      if (!pickedServices.includes(`${service.dataset.category}`)) {
        service.classList.add('ourWorks__item_active')
      } else service.classList.remove('ourWorks__item_active')
    })

    if (count >= 3) {
      activeCleaner(servicesControlBtn, 'serviceNav__elem_active');
      activeCleaner(services, 'ourWorks__item_active');
      pickedServices = [];
    } else if (pickedServices.length == 0) {
      activeCleaner(services, 'ourWorks__item_active');
    }
  }
})

// dropDown

const prices: Array<HTMLElement> = Array.from(document.querySelectorAll('.pricePicker__elem'));
const dropDownContent: Array<HTMLElement> = Array.from(document.querySelectorAll('.pricePicker__content'));
const pricesOrderBtn: Array<HTMLButtonElement> = Array.from(document.querySelectorAll('.pricePicker__orderBtn')); 

pricesOrderBtn.forEach(btn => {
  btn.addEventListener('click', event => {
    event.stopPropagation()
  })
})

prices.forEach((priceDropDown, index) => {
  priceDropDown.onclick = () => {
    priceDropDown.classList.toggle('pricePicker__elem_active');
    setTimeout(() => dropDownContent[index].classList.toggle('pricePicker__content_active'), 70)
    
    console.dir(priceDropDown)
  }
})