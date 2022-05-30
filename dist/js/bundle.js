/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator(){
    const result = document.querySelector(".calculating__result span");

	let sex, height, weight, age, ratio;


	if (localStorage.getItem("sex")) {
		sex = localStorage.getItem("sex");
	} else {
		sex = "female";
		localStorage.setItem("sex", "female");
	} // уст значние по умолчанию переменной sex в localStorage


	if (localStorage.getItem("ratio")) {
		ratio = localStorage.getItem("ratio");
	} else {
		ratio = 1.375;
		localStorage.setItem("ratio", 1.375);
	} // уст значние по умолчанию переменной ratio в localStorage


	//ф считатет каллории и выводит результат на страницу
	function calcTotal() {
		if (!sex || !height || !weight || !age || !ratio) {
			result.textContent = "____";
			// если одно из переменных не заполненно или выбрано то даем этот результат
			return;
			//return если срабртает это как break, ниже код читаться не будет
		}
		if (sex === "female") {
			result.textContent = Math.round(
				(447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
			);
			// для женщин тут пишем формулу по которой будет рассчитываться суточная калория
		} else {
			result.textContent = Math.round(
				(88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
			);
			// для мужчин
		}
	}

	calcTotal();



	function initLocalSettings(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach((elem) => {
			elem.classList.remove(activeClass);
			if (elem.getAttribute("id") === localStorage.getItem("sex")) {
				elem.classList.add(activeClass);
			}
			if (
				elem.getAttribute("data-ratio") ===
				localStorage.getItem("ratio")
			) {
				elem.classList.add(activeClass);
			}
		});
	}

	initLocalSettings("#gender div", "calculating__choose-item_active");
	initLocalSettings(".calculating__choose_big div","calculating__choose-item_active");


	function getStaticInformation(selector, activeClass) {
		const elements = document.querySelectorAll(selector); 
		//я буду получать все div с этого родитля

		//отслеживаем клики по каждому элементу
		elements.forEach((elem) => {
			elem.addEventListener("click", (e) => {
				if (e.target.getAttribute("data-ratio")) {

					//если такой атрибут присутсвует у события
					ratio = +e.target.getAttribute("data-ratio");
					//если пользов кликнул например на низкую активность, мы вытаскиваем его активность стоящяя в data-ratio
					//но если кликнем в sex то там это не будет работать, для него логика написана ниже

					localStorage.setItem("ratio",+e.target.getAttribute("data-ratio"));
					//уст в localStorage значение ratio

				} else {

					sex = e.target.getAttribute("id");
					// получаем id - жен или муж
					localStorage.setItem("sex", e.target.getAttribute("id"));
					//уст в localStorage значение sex
				}

				elements.forEach((elem) => {
					elem.classList.remove(activeClass);
					// удаляем у всех div класс
				});

				e.target.classList.add(activeClass);
				// доб класс по div которому кликнули

				calcTotal();
				//вызываем ф при изменениях пользователем найстроек калькулятора
			});
		});
	}

	getStaticInformation("#gender div", "calculating__choose-item_active");
	getStaticInformation(".calculating__choose_big div","calculating__choose-item_active");

	//ф обрабатывает каждый input
	function getDynamicInformation(selector) {
		const input = document.querySelector(selector);

		input.addEventListener("input", () => {
			//если input содержит не цифры, подсвечивает
			if (input.value.match(/\D/g)) {
				input.style.border = "1px solid red";
			} else {
				input.style.border = "none";
			}
			switch (input.getAttribute("id")) {
				case "height":
					height = +input.value;
					break;
				case "weight":
					weight = +input.value;
					break;
				case "age":
					age = +input.value;
					break;
			}

			calcTotal();
			//вызываем ф при изменениях
		});
	}

	getDynamicInformation("#height");
	getDynamicInformation("#weight");
	getDynamicInformation("#age");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


// Используем карточки

function cards() {
	class MenuCard {
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {
			//classes аргумент тут у нас в REST операторе
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.parent = document.querySelector(parentSelector); // тут у нас DOM елемент, родитель нашего блока
			this.classes = classes; //добавили сюда тоже оператор rest
			this.transfer = 27;
			this.changeToUAH();
			// метод будет вызыватся автоматически
		}

		changeToUAH() {
			this.price = this.price * this.transfer;
		}
		// метод конвертации валюты

		render() {
			const element = document.createElement("div");
			//создаем элемент внутри блока

			if (this.classes.length === 0) {
				this.element = "menu__item"; // добавляем класс по умолчанию(дефолный класс) если массив пустой
				element.classList.add(this.element);
			} else {
				this.classes.forEach((className) => {
					element.classList.add(className);
				});
				// так как сlasses у нас в массиве, делаем перебор через forEach и подсоединяем к созданному элементу 'element'
			}

			element.innerHTML = `							 
			 
			 	<img src=${this.src} ${this.alt}>
			 	<h3 class="menu__item-subtitle">${this.title}</h3>
			 	<div class="menu__item-descr">${this.descr}</div>
			 	<div class="menu__item-divider"></div>
			 	<div class="menu__item-price">
				  <div class="menu__item-cost">Цена:</div>
				  <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
			 	</div>
 
			 `;
			//внутреность созданного блока

			this.parent.append(element);
			//добавить созданный блок в родителя и на страницу
		}
	}

	

	(0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)("http://localhost:3000/menu")
		// вызываев getResource и записываем адрес откуда получаем данные
		.then((data) => {
			data.forEach(({ img, alt, title, descr, price }) => {
				//деструктуризация  тут у нас с аргументами

				new MenuCard(
					img,
					alt,
					title,
					descr,
					price,
					".menu .container"
				).render();
				//вызываем констркуктор и он будет вызыватся столько раз сколько у нас обьектов придет с сервера
			});
		});
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId){
       

	const forms = document.querySelectorAll(formSelector);
	const message = {
		loading: "img/spinner.svg", // if we want to add a picture
		success: "Спасибо! Скоро мы с вами свяжемся",
		failure: "Что-то пошло не так...",
	};

	forms.forEach((item) => {
		bindPostData(item);
	});

	

	//ф отвечает за привязку сервера
	function bindPostData(form) {
		// this f helps hang 'addEventListener'
		form.addEventListener("submit", (e) => {
			e.preventDefault();

			let statusMessage = document.createElement("img");
			statusMessage.src = message.loading; //when u submited the form we show the message
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
		`;
			form.insertAdjacentElement("afterend", statusMessage);

			const formData = new FormData(form);
			//FormData позволяют вам легко конструировать наборы пар ключ-значение
			// Позволяет получить данные что ввел пользователь

			// *преобразование FormData в JSON это старый вариант
			// const object = {};
			// formData.forEach((value, key) => {
			// 	структура formdate
			// 	object[key] = value;
			// });

			//* преобразование FormData в JSON это новый вариант
			const json = JSON.stringify(Object.fromEntries(formData.entries()));
			// берем formData, сначало превращяем в массив  массивов,
			// далее превращяем в классичексий обьект, далее в JDON

			//*fetch gives promisses

			(0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postDate)("http://localhost:3000/requests", json)
				.then((data) => {
					//atribut data in this case is promisse which came from fetch server
					console.log(data);
					showThanksModal(message.success); //run  showThanksModal
					statusMessage.remove(); //delete spinner
				})

				.catch(() => {
					//if in fetch got smt wrong catch starts working
					showThanksModal(message.failure); //showThanksModal shows message of mistake
				})

				.finally(() => {
					// finally we reset the form
					form.reset();
				});
		});
	}

	//	Красивое оповещение пользователя

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector(".modal__dialog");

		prevModalDialog.classList.add("hide"); //hide prev contant
		(0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

		const thanksModal = document.createElement("div"); //create new div
		thanksModal.classList.add("modal__dialog"); //add class for div
		//create a structure for div
		thanksModal.innerHTML = `							
			<div class="modal__content">
				<div class="modal__close" data-close> × </div>
				<div class="modal__title">${message}</div>
			</div>
		`;
		document.querySelector(".modal").append(thanksModal); // append elem

		setTimeout(() => {
			thanksModal.remove(); //remove
			prevModalDialog.classList.add("show"); //add class show
			prevModalDialog.classList.remove("hide"); //remove class hide
			(0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');

			setTimeout(() => {
				//add class show
				prevModalDialog.classList.remove("show");
			}, 300);
			//устан setTimeout тут чтоб удалить класс show
		}, 2000);
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector);

	modal.classList.add("hide");
	modal.classList.remove("show");
	document.body.style.overflow = "";
}

function openModal(modalSelector, modalTimerId) {
								  // если есть TimerId то лучше передавать через аргумент
	const modal = document.querySelector(modalSelector);

	modal.classList.add("show");
	modal.classList.remove("hide");
	document.body.style.overflow = "hidden"; // stop scroll we modal is open
	
	console.log(modalTimerId);
	if(modalTimerId){
		clearInterval(modalTimerId); //if u opened modal, we predict it again
	}
	
}

//Modal
function modal(triggerSlector, modalSelector, modalTimerId){
        const modalTrigger = document.querySelectorAll(triggerSlector),
		modal = document.querySelector(modalSelector);

	modalTrigger.forEach((btn) => {
		btn.addEventListener("click",() => openModal(modalSelector, modalTimerId));
	});

	

	//here we applied delegation events here e.target.getAttribute("data-close") == ""
	modal.addEventListener("click", (e) => {
		if (e.target === modal || e.target.getAttribute("data-close") == "") {
			//close modal when click on x
			closeModal(modalSelector);
		}
	});

	document.addEventListener("keydown", (e) => {
		// if u pressed escape we close modal
		if (e.code === "Escape" && modal.classList.contains("show")) {
			closeModal(modalSelector);
		}
	});

	
	// Изменил значение, чтобы не отвлекало

	function showModalByScroll() {
		// show modal when u got to end of page
		if (
			window.pageYOffset + document.documentElement.clientHeight >=
			document.documentElement.scrollHeight
		) {
			openModal(modalSelector, modalTimerId);
			window.removeEventListener("scroll", showModalByScroll);
		}
	}
	window.addEventListener("scroll", showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

	/* let slideIndex = 1;
	//номер слайда
	
	
	// логика для вставки нолика перед цифрой
	if(slides.length < 10 ){
		total.textContent = `0${slides.length}`;
	}else{
		total.textContent = `${slides.length}`;
	}
	
	function sliderShow(n){
		//показывает и скрывает изображение
		if(n > slides.length){
			slideIndex = 1;
		}
		//если пол перешел за последний слад, то возвращяет к первому обратно
		if(n < 1){
			slideIndex = slides.length;
		}
		//тут наоборот

		slides.forEach((item) => {
			item.style.display = 'none';
		});// убираем дипсплей со всех элементов

		slides[slideIndex - 1].style.display = 'block';
		
		// логика для вставки нолика перед цифрой
		if(slides.length < 10 ){
			current.textContent = `0${slideIndex}`;
		}else{ 
			current.textContent = `${slideIndex}`;
		}
	}
	sliderShow(slideIndex);



	function plusSlide(n){
		sliderShow(slideIndex += n);
		// функция которая складывает или вычитает
	}

	prev.addEventListener('click', () => {
		plusSlide(-1);
	});
	next.addEventListener('click', () => {
		plusSlide(+1);
	}); */

function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter,wrapper, field}) {
    let offset = 0;
    let slideIndex = 1;

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        width = window.getComputedStyle(slidesWrapper).width,
		//получаем параметр ширины
        slidesField = document.querySelector(field);

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent =  `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent =  slideIndex;
    }
    
    slidesField.style.width = 100 * slides.length + '%';
	//устанавливаем ширину
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `; 
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    next.addEventListener('click', () => {
        if (offset == (deleteNotDigits(width) * (slides.length - 1))) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width); 
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent =  `0${slideIndex}`;
        } else {
            current.textContent =  slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = ".5");
        dots[slideIndex-1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent =  `0${slideIndex}`;
        } else {
            current.textContent =  slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = ".5");
        dots[slideIndex-1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                current.textContent =  `0${slideIndex}`;
            } else {
                current.textContent =  slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = ".5");
            dots[slideIndex-1].style.opacity = 1;
        });
    });

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

// Tabs

function tabs(tabsSelector, tabsContentSelector, activeClass) {
	

	const tabs = document.querySelectorAll(tabsSelector), 
		  tabContant = document.querySelectorAll(tabsContentSelector);

	function hideTabContant() {
		
		tabContant.forEach((e) => {
			e.classList.add("hide"); //remove class show in tabContant
			e.classList.remove("show"); //add class show in tabContant
		});

		tabs.forEach((event) => {
			//remove class active in all tabs
			event.classList.remove(activeClass);
		});
	}

	function showTabsContant(i = 0) {
		tabContant[i].classList.add("show", "fade"); //add class show in tabContant and fade-animation class
		tabContant[i].classList.remove("hide"); //remove class show in tabContant
		tabs[i].classList.add(activeClass); //add class active in tabs
	}

	tabs.forEach((event, i) => {
		//when ckick on tabs
		event.addEventListener("click", () => {
			//exact tab-clicked
			hideTabContant();
			showTabsContant(i); //sending arg to the f
		});
	});

	hideTabContant();
	showTabsContant();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//Timer

function timer(id, deadline) {
	

	

	function getTimeRemaining(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date()), //how much is left,here we have the differece
			days = Math.floor(t / (1000 * 60 * 60 * 24)),
			hours = Math.floor((t / (1000 * 60 * 60)) % 24), //create variables
			minutes = Math.floor((t / (1000 * 60)) % 60),
			seconds = Math.floor((t / 1000) % 60); //math.floor is rounding the number

		return {
			//return date in the object
			total: t,
			days: days,
			hours: hours,
			minutes: minutes,
			seconds: seconds,
		};
	}

	function getZero(num) {
		// this f puts zero infront of alone numbers in the page
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	function setClock(selector, endtime) {
		const t = document.querySelector(selector),
			days = document.querySelector("#days"), //tale the id from the html
			hours = document.querySelector("#hours"),
			minutes = document.querySelector("#minutes"),
			seconds = document.querySelector("#seconds"),
			timeInterval = setInterval(updateClock, 1000);

		updateClock(); // when we update a HTML-page the time a bit late due to setInterval it's one sec,
		// so we manually calling this fun updateClock()

		function updateClock() {
			const t = getTimeRemaining(endtime); // when the fun starts it will count time we need

			days.innerHTML = getZero(t.days); //we put here the getZero f in order to make the f work
			hours.innerHTML = t.hours;
			minutes.innerHTML = t.minutes;
			seconds.innerHTML = getZero(t.seconds); //we put here the getZero f in order to make the f work

			if (t.total <= 0) {
				clearInterval(timeInterval); //stopping
			}
		}
	}
	setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postDate": () => (/* binding */ postDate)
/* harmony export */ });
//* файлы который работают с сервером обычно ложат их в отделную папку services

const postDate = async (url, data) => {
    // postDate посылает запрос на сервер
    // получает какой то ответ
    const res = await fetch(url, {
        // await ждет пока fetch придет ответ, тем самым не выдает преджевременную ошибку
        //fetch("adress") and obj 2 of them is obligatory{mehtod and body}
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: data,
    });

    return await res.json();
    // convert into normal file
};
// ф будет отвечать за постинг данных, то есть когда мы будем отправлять данные на сервер
// выводим функционал общение с сервером в отдельную функцию



const getResource = async (url) => {
    // postDate посылает запрос на сервер
    // получает какой то ответ
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Coudn't fetch${url}, status: ${res.status}`);
        // обьект ошибки, который передает текс ошибки
        //и чтоб выкинуть текст ошибки есть метод throw
    }
    return await res.json();
    // convert into normal file
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");









document.addEventListener("DOMContentLoaded", () => {
	const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), 300000);

	(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(".tabheader__item", ".tabcontent", "tabheader__item_active");
	(0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])("[data-modal]", ".modal", modalTimerId);
	(0,_modules_calc__WEBPACK_IMPORTED_MODULE_2__["default"])();
	(0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
	(0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('form', modalTimerId);
	(0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', "2024-11-22");

	(0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
		container: '.offer__slider',
		slide: ".offer__slide",
		nextArrow: ".offer__slider-next",
		prevArrow: ".offer__slider-prev",
		totalCounter: "#total",
		currentCounter: "#current",
		wrapper: ".offer__slider-wrapper",
		field: ".offer__slider-inner"

		
	});
	//даже если пользователю сказать в каком порядке использовать аргументы, он все равно нарушит и
	// и благодаря деструкторизации мы избавляемся от недочетов
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map