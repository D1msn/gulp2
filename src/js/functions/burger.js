document.addEventListener('DOMContentLoaded', () => {

  // --------Burger menu---------
  let burgerCtr = document.querySelector("#burger-menu");
  let menuCtr = document.querySelector("#mobile-menu");
  let body = document.querySelector("body");
  burgerCtr.addEventListener("click", function () {
    this.classList.toggle("active");
    menuCtr.classList.toggle("show_mobile_menu");
    body.classList.toggle("lock");
  });
  // --------Burger menu END---------

})
