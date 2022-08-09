import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Accordion footer mobile
  const footerAccordion = document.querySelectorAll('.footer__accordion');
  const closeAll = () => {
    for (let i = 0; i < footerAccordion.length; i++) {
      footerAccordion[i].classList.remove('is-opened');
      footerAccordion[i].classList.add('is-closed');
    }
  };

  const openAccordion = (element) => {
    element.classList.remove('is-closed');
    element.classList.add('is-opened');
  };

  if (footerAccordion.length > 0) {
    for (let i = 0; i < footerAccordion.length; i++) {
      footerAccordion[i].classList.remove('no-js');
      footerAccordion[i].classList.add('is-closed');
      footerAccordion[i].addEventListener('click', (evt) => {

        if (evt.target.tagName === 'H3') {
          if (evt.target.parentNode.classList.contains('is-closed')) {
            closeAll();
            openAccordion(evt.target.parentNode);

          } else {
            closeAll();
          }
        }
      });
    }
  }
  // ---------------------------------
  // Utils
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
