// Селект выбора страны

const element = document.getElementById("telselect")
const choices = new Choices(element, {
  searchEnabled: false,
  itemSelectText: 'ВЫБЕРИ СТРАНУ',
  position: 'bottom',
  silent: false,
});


// ---------------- Input mask -----------------


let telmask = document.querySelectorAll('input[type = "tel"]'); // Выбираем все инпуты с type - = tel
let selectTel = document.getElementById("telselect");

const inputmaskRU = new Inputmask("+7 (999) 999 99 99", { placeholder: " ", }).mask(telmask); // Создаем RU маску

selectTel.addEventListener("change", () => {

  if (selectTel.value == "RU") {
    new Inputmask("+7 (999) 999 99 99", { placeholder: " ", clearMaskOnLostFocus: false }).mask(telmask);

  } else if (selectTel.value == "UA") {
    new Inputmask("+380 (99) 999 99 99", { placeholder: " ", clearMaskOnLostFocus: false }).mask(telmask); // Создаем UA маску


  } else if (selectTel.value == "BY") {
    new Inputmask("+375 (99) 999 99 99", { placeholder: " ", clearMaskOnLostFocus: false }).mask(telmask); // Создаем BY маску
  }

});


// ---------------- Input mask end --------------




// ---------------- Обработка инпута файла --------------
const fileInput = document.querySelector('input[type="file"]');
const formPreview = document.getElementById('formPreview');
const formImage = document.getElementById('formImage');
let formLoading = document.querySelector("div.form-loading");


formImage.addEventListener('change', () => {

  uploadFile(formImage);
  addFileName("span.name-img");
});





function uploadFile(file) {

  clearImageInfo();


  for (let i = 0; i < file.files.length; i++) {

    if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.files[i].type)) {
      alert('Разрешены только изображения.');
      formImage.value = '';
      return;
    }
    if (file.files[i].size > 2 * 1024 * 1024 * 1024) {
      alert('Файл должен быть менее 2 МБ.');
      return;
    }


    var reader = new FileReader();
    reader.onload = function (e) {

      var img1 = document.createElement('img');
      img1.src = `${e.target.result}`;
      img1.alt = "Фото"

      formPreview.append(img1)


    };
    reader.onerror = function (e) {
      alert('Ошибка');
    };
    reader.readAsDataURL(file.files[i]);


  };




}

function addFileName(nameImg) {
  let files = fileInput.files;

  clearImageInfo();

  if (files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      let addP = document.createElement('p');
      addP.innerHTML = formImage.files[i].name;
      fileInput.closest('div').querySelector(nameImg).append(addP);
    };
  }
}

// Функция очисти имен и картинок

function clearImageInfo() {
  let imgPrev = document.querySelector("span.name-img");


  formPreview.innerHTML = null;
  imgPrev.innerHTML = null;

}

// Функция добавление инпута с доп емейлом

function addEmailSend() {
  let addEmailInputValue = document.querySelector('.form-email-add__input').value;
  let form = document.querySelector('.form');

  if (addEmailInputValue != "") {

    form.insertAdjacentHTML("afterBegin", `<input type="hidden" name="admin_email[]" value="${addEmailInputValue}" />`);

    console.log("Инпут создан")


  } else {
    return;
  }

}

// Функция удаления доп емейла

function removeEmailSend() {
  let addEmailInputValue = document.querySelector('.form-email-add__input').value;

  let inputEmail = document.querySelector(`input[value="${addEmailInputValue}"]`);

  if (inputEmail != null) inputEmail.remove();

}



// ---------------- Обработчик формы --------------

let validateForms = function (selector, rules, successModal, yaGoal) {
  new window.JustValidate(selector, {
    rules: rules,
    submitHandler: function (form) {
      debugger
      addEmailSend();
      let formData = new FormData(form);

      formLoading.classList.add("active");



      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Отправлено');

            formLoading.classList.remove("active");
            document.getElementById('modal1').click();

          }
        }
      }

      xhr.open('POST', 'mail.php', true);
      xhr.send(formData);
      removeEmailSend();

      form.reset();
      clearImageInfo();

      // fileInput.closest('label').querySelector('span').textContent = 'Прикрепить файл';






    },
    colorWrong: "rgb(0 1 255)",

    invalidFormCallback: function (errors) {

    },


  });
}


// ---------------- Вызов функции валидации --------------

validateForms('.form', {
  email: {
    required: true,
    email: true
  },
  tel: {
    required: true
  },
  name: {
    required: true,

  },

}, '#modal-1', 'send goal'); // Вызвать всплывающее окно и Цель яндекс метрики



