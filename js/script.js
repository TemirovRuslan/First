document.addEventListener("DOMContentLoaded", () => {
	//*======================================================== TABS ==*//

	const tabs = document.querySelectorAll(".tabheader__item"), //variabels
		tabContant = document.querySelectorAll(".tabcontent");

	function hideTabContant() {
		// f hide
		tabContant.forEach((e) => {
			e.classList.add("hide"); //remove class show in tabContant
			e.classList.remove("show"); //add class show in tabContant
		});

		tabs.forEach((event) => {
			//remove class active in all tabs
			event.classList.remove("tabheader__item_active");
		});
	}

	function showTabsContant(i = 0) {
		tabContant[i].classList.add("show", "fade"); //add class show in tabContant and fade-animation class
		tabContant[i].classList.remove("hide"); //remove class show in tabContant
		tabs[i].classList.add("tabheader__item_active"); //add class active in tabs
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

	//*======================================================== TIMER ==*//

	const deadline = "2022-08-22"; // deadline

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
	setClock(".timer", deadline);

	//*======================================================== MODAL ==*//
	const modalTrigger = document.querySelectorAll("[data-modal]"),
		modal = document.querySelector(".modal");

	modalTrigger.forEach((btn) => {
		btn.addEventListener("click", openModal);
	});

	function closeModal() {
		modal.classList.add("hide");
		modal.classList.remove("show");
		document.body.style.overflow = "";
	}

	function openModal() {
		modal.classList.add("show");
		modal.classList.remove("hide");
		document.body.style.overflow = "hidden"; // stop scroll we modal is open
		clearInterval(modalTimerId); //if u opened modal, we predict it again
	}

	//here we applied delegation events here e.target.getAttribute("data-close") == ""
	modal.addEventListener("click", (e) => {
		if (e.target === modal || e.target.getAttribute("data-close") == "") {
			//close modal when click on x
			closeModal();
		}
	});

	document.addEventListener("keydown", (e) => {
		// if u pressed escape we close modal
		if (e.code === "Escape" && modal.classList.contains("show")) {
			closeModal();
		}
	});

	const modalTimerId = setTimeout(openModal, 300000);
	// Изменил значение, чтобы не отвлекало

	function showModalByScroll() {
		// show modal when u got to end of page
		if (
			window.pageYOffset + document.documentElement.clientHeight >=
			document.documentElement.scrollHeight
		) {
			openModal();
			window.removeEventListener("scroll", showModalByScroll);
		}
	}
	window.addEventListener("scroll", showModalByScroll);

	//*======================================================== Using Class for сards ==*//

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

	getResource("http://localhost:3000/menu")
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

	//*======================================= XMLHttpRequest ================= Работа с локальным сервером ==*//

	const forms = document.querySelectorAll("form");
	const message = {
		loading: "img/spinner.svg", // if we want to add a picture
		success: "Спасибо! Скоро мы с вами свяжемся",
		failure: "Что-то пошло не так...",
	};

	forms.forEach((item) => {
		bindPostData(item);
	});

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

			postDate("http://localhost:3000/requests", json)
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
		openModal();

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
			closeModal();

			setTimeout(() => {
				//add class show
				prevModalDialog.classList.remove("show");
			}, 300);
			//устан setTimeout тут чтоб удалить класс show
		}, 2000);
	}
	//*======================================================== Slider ==*//

	let offset = 0;
	let slideIndex = 1;

	const slides = document.querySelectorAll(".offer__slide"),
		prev = document.querySelector(".offer__slider-prev"),
		next = document.querySelector(".offer__slider-next"),
		total = document.querySelector("#total"),
		current = document.querySelector("#current"),
		slidesWrapper = document.querySelector(".offer__slider-wrapper"),
		width = window.getComputedStyle(slidesWrapper).width,
		//получаем параметр ширины
		slidesField = document.querySelector(".offer__slider-inner");

	if (slides.length < 10) {
		total.textContent = `0${slides.length}`;
		current.textContent = `0${slideIndex}`;
	} else {
		total.textContent = slides.length;
		current.textContent = slideIndex;
	}

	slidesField.style.width = 100 * slides.length + "%";
	//устанавливаем ширину
	slidesField.style.display = "flex";
	slidesField.style.transition = "0.5s all";
	slidesWrapper.style.overflow = "hidden";

	slides.forEach((slide) => {
		slide.style.width = width;
	});

	next.addEventListener("click", () => {
		if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += +width.slice(0, width.length - 2);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}
	});

	prev.addEventListener("click", () => {
		if (offset == 0) {
			offset = +width.slice(0, width.length - 2) * (slides.length - 1);
		} else {
			offset -= +width.slice(0, width.length - 2);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}
	});

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

	//*======================================================== Calculator ==*//

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
});
