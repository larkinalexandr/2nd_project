import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Accordion footer mobile
  const footerAccordion = document.querySelectorAll('.footer__accordion');
  const footer = document.querySelector('footer');
  const closeAll = () => {
    for (let i = 0; i < footerAccordion.length; i++) {
      footerAccordion[i].classList.remove('is-opened');
      footerAccordion[i].classList.add('is-closed');
    }
  };

  const openAccordion = (evt) => {
    if (evt.target.parentNode.classList.contains('is-closed')) {
      closeAll();
      evt.target.parentNode.classList.remove('is-closed');
      evt.target.parentNode.classList.add('is-opened');
      footer.scrollIntoView(top);

    } else {
      closeAll();
    }
  };

  if (footerAccordion.length > 0) {
    for (let i = 0; i < footerAccordion.length; i++) {
      footerAccordion[i].classList.remove('no-js');
      footerAccordion[i].classList.add('is-closed');
      footerAccordion[i].addEventListener('click', (evt) => {
        if (evt.target.tagName === 'H3') {
          openAccordion(evt);
        }
      });

      footerAccordion[i].addEventListener('keydown', (evt) => {
        if (evt.key === 'Enter') {
          openAccordion(evt);
        }
      });
    }
  }

  // ---------------------------------
  //  Phone input mask & form validate

  const form = document.querySelectorAll('form');

  if (form.length > 0) {
    for (let i = 0; i < form.length; i++) {
      const input = form[i].querySelector('.tel');
      const nameField = form[i].querySelector('input[name="name"]');
      const sendButton = form[i].querySelector('button');
      const MAX_NUMBER_LENGTH = 11;
      const MIN_INPUT_LENGTH = 18;
      const prefixNumber = () => '+7 (';

      input.addEventListener('focus', () => {
        if (input.value.length < 4) {
          input.value = prefixNumber();
        }
      });

      input.addEventListener('blur', () => {
        if (input.value.length < 5) {
          input.value = '';
          window.localStorage.phone = '';
        }
      });

      nameField.addEventListener('input', () => {
        if (nameField.value.length) {
          nameField.classList.remove('is-invalid');
        }
      });

      input.addEventListener('input', () => {
        const value = input.value.replace(/\D+/g, '');


        let number = '';

        for (let k = 0; k < value.length && k < MAX_NUMBER_LENGTH; k++) {
          switch (k) {
            case 0:
              number += prefixNumber();
              continue;
            case 4:
              number += ') ';
              break;
            case 7:
              number += ' ';
              break;
            case 9:
              number += ' ';
              break;
            default:
              break;
          }
          number += value[i];
        }
        input.value = number;
        if (input.value.length === MIN_INPUT_LENGTH) {
          input.classList.remove('is-invalid');
        }
      });
      sendButton.addEventListener('click', (evt) => {
        if (input.value.length < MIN_INPUT_LENGTH) {
          evt.preventDefault();
          input.classList.add('is-invalid');
        }

        if (!nameField.value.length) {
          nameField.classList.add('is-invalid');
        }
      });
    }
  }
  // ---------------------------------
  // about - readmore button

  const aboutTextWrapper = document.querySelector('.about__text-wrapper');
  const aboutParagraph = aboutTextWrapper.querySelectorAll('p');

  if (aboutParagraph.length > 2) {
    const button = document.createElement('button');
    button.textContent = 'Подробнее';
    button.type = 'button';
    aboutTextWrapper.appendChild(button);
    aboutTextWrapper.classList.add('is-closed');

    button.addEventListener('click', () => {
      if (aboutTextWrapper.classList.contains('is-closed')) {
        aboutTextWrapper.classList.remove('is-closed');
        aboutTextWrapper.classList.add('is-opened');
        button.textContent = 'Свернуть';
      } else {
        aboutTextWrapper.classList.remove('is-opened');
        aboutTextWrapper.classList.add('is-closed');
        button.textContent = 'Подробнее';
      }
    });
  }
  // ---------------------------------


  // Utils
  if (window.localStorage) {
    const elements = document.querySelectorAll('[name]');

    for (let i = 0; i < elements.length; i++) {
      (function (element) {
        const name = element.getAttribute('name');

        element.value = localStorage.getItem(name) || element.value;

        element.addEventListener('keyup', () => {
          localStorage.setItem(name, element.value);
        });
      })(elements[i]);
    }
  }
  // ---------------------------------

  iosVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
