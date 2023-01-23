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

const smoothAnch = () => {
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
}

smoothAnch();

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
    event.stopPropagation();
    event.preventDefault();
    document.querySelector('#contacts')!.scrollIntoView({
      behavior:'smooth',
      block:'start',
    })
  })
})

prices.forEach((priceDropDown, index) => {
  priceDropDown.onclick = () => {
    prices.forEach(elem => {
      if (elem != priceDropDown) {
        elem.classList.remove('pricePicker__elem_active')
      }
    });
    dropDownContent.forEach(elem => {
      if (elem != dropDownContent[index]) {
        elem.classList.remove('pricePicker__content_active')
      }
    });

    priceDropDown.classList.toggle('pricePicker__elem_active');
    setTimeout(() => {
      dropDownContent[index].classList.toggle('pricePicker__content_active');
    }, 70);
  }
})

// contacts dropD

const cityPicker = document.querySelector('.contactsDropDown') as HTMLElement;
const contactsInfo = document.querySelector('.contacts__contactsContent') as HTMLElement;
const cityDropD = document.querySelector('.contactsDropDown__list') as HTMLElement;
const cityDropDownBtn = document.querySelector('.contactsDropDown__btn') as HTMLElement;
const dropDownElements: Array<HTMLElement> = Array.from(document.querySelectorAll('.contactsDropDown__elem'));

const dropDownTitle = document.querySelector('.contactsDropDown__title') as HTMLElement;
const contacts = [
  {
    city: 'Canandaigua, NY',
    phone: '+1	585	393 0001',
    office: '151 Charlotte Street',
  },
  {
    city: 'New York City',
    phone: '+1	212	456 0002',
    office: '9 East 91st Street',
  },
  {
    city: 'Yonkers, NY',
    phone: '+1	914	678 0003',
    office: '511 Warburton Ave',
  },
  {
    city: 'Sherrill, NY',
    phone: '+1	315	908 0004',
    office: '14 WEST Noyes BLVD',
  },
]

cityPicker.onclick = () => {
  cityPicker.classList.toggle('contactsDropDown_active');
  cityDropD.classList.toggle('contactsDropDown__list_active');
  cityDropDownBtn.classList.toggle('contactsDropDown__btn_active');

  for (let i = 0; i < dropDownElements.length; i++) {
    setTimeout(() => {
      dropDownElements[i].classList.toggle('contactsDropDown__elem_active');
    }, +(i + '99'))
  }
}

dropDownElements.forEach( (elem, index) => {
  elem.onclick = () => {
    dropDownTitle.innerHTML = elem.innerHTML;
    contactsInfo.classList.add('contacts__contactsContent_active');

    const city = document.querySelector('#contacts__city') as HTMLElement;
    const phone = document.querySelector('#contacts__phone') as HTMLLinkElement;
    const callBtn = document.querySelector('#contacts__callBtn') as HTMLLinkElement;
    const office = document.querySelector('#contacts__office') as HTMLElement;

    city.innerHTML = `${contacts[index].city}`;
    phone.innerHTML = `${contacts[index].phone}`;
    phone.href = `tel:${contacts[index].phone}`;
    callBtn.href = `tel:${contacts[index].phone}`;
    office.innerHTML = `${contacts[index].office}`;
  }
})