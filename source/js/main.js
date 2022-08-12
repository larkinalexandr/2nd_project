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
        button.textContent = 'Скрыть';
      } else {
        aboutTextWrapper.classList.remove('is-opened');
        aboutTextWrapper.classList.add('is-closed');
        button.textContent = 'Подробнее';
      }
    });
  }


  // ---------------------------------
  //
  // //  Phone mask
  //
  // const input = document.querySelector('.tel');
  // const button = document.querySelector('.send-button');
  //
  // input.addEventListener('focus', () => {
  //   if (input.value.length === 0) {
  //     input.value = '+7 (';
  //   }
  // });
  //
  // input.addEventListener('blur', () => {
  //   if (input.value.length === 4) {
  //     input.value = '';
  //   }
  // });
  //
  // button.addEventListener('click', (evt) => {
  //   if (input.value.length < 18) {
  //     evt.preventDefault();
  //   }
  // });
  //
  // input.addEventListener('input', (e) => {
  //   const value = input.value.replace(/\D+/g, '');
  //   e.preventDefault();
  //
  //   let result = '+';
  //
  //   const insertPrefix = function () {
  //     result += '7 (';
  //   };
  //
  //   const insertSkobka = function () {
  //     result += ') ';
  //   };
  //
  //   for (let i = 0; i < value.length && i < 11; i++) {
  //     switch (i) {
  //       case 0:
  //         insertPrefix();
  //         continue;
  //       case 4:
  //         insertSkobka();
  //         break;
  //       case 7:
  //         result += ' ';
  //         break;
  //       case 9:
  //         result += ' ';
  //         break;
  //       default:
  //         break;
  //     }
  //     result += value[i];
  //   }
  //
  //   input.value = result;
  // });
  //
  // //  --------------------------------

    [].forEach.call( document.querySelectorAll('.tel'), function(input) {
      var keyCode;
      function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+7 (___) ___ __ __",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          new_value = matrix.replace(/[_\d]/g, function(a) {
            return i < val.length ? val.charAt(i++) || def.charAt(i) : a
          });
        i = new_value.indexOf("_");
        if (i != -1) {
          i < 4 && (i = 3);
          new_value = new_value.slice(0, i)
        }
        var reg = matrix.substr(0, this.value.length).replace(/_+/g,
          function(a) {
            return "\\d{1," + a.length + "}"
          }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = ""
      }

      input.addEventListener("input", mask, false);
      input.addEventListener("focus", mask, false);
      input.addEventListener("blur", mask, false);
      input.addEventListener("keydown", mask, false)

    });


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
