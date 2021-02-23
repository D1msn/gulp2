/**
 * modalEffects.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
var ModalEffects = (function () {

  function init() {

    const lockPadding = document.querySelectorAll('.lock-padding')
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    let modal = document.getElementById("modal-1");
    var overlay = document.querySelector('.md-overlay');
    var body = document.querySelector('body');

    // ----------------ADD function ------------
    function classReg(className) {
      return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }

    removeClass = function (elem, c) {
      elem.classList.remove(c);
    };

    addClass = function (elem, c) {
      elem.classList.add(c);
    };

    hasClass = function (elem, c) {
      return classReg(c).test(elem.className);
    };



    [].slice.call(document.querySelectorAll('.md-trigger')).forEach(function (el, i) {


      var modal = document.querySelector('#' + el.getAttribute('data-modal')),
        close = modal.querySelector('.md-close');

      function removeModal(hasPerspective) {
        removeClass(modal, 'md-show');
        removeClass(body, 'lock');
        removeClass(modal, 'visually-hidden');
        body.style.paddingRight = "0px";


        if (lockPadding.length > 0) {
          for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = "0px";
          }
        }


        if (hasPerspective) {
          removeClass(document.documentElement, 'md-perspective');
        }
      }

      function removeModalHandler() {
        removeModal(hasClass(el, 'md-setperspective'));
      }

      el.addEventListener('click', function (ev) {
        addClass(modal, 'md-show');
        addClass(body, 'lock');
        removeClass(modal, 'visually-hidden');
        body.style.paddingRight = lockPaddingValue;


        if (lockPadding.length > 0) {
          for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
          }
        }






        overlay.removeEventListener('click', removeModalHandler);
        overlay.addEventListener('click', removeModalHandler);

        if (hasClass(el, 'md-setperspective')) {
          setTimeout(function () {
            addClass(document.documentElement, 'md-perspective');
          }, 25);
        }
      });

      close.addEventListener('click', function (ev) {
        ev.stopPropagation();
        removeModalHandler();
      });

    });

  }

  init();

})();
