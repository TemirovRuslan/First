import {closeModal, openModal} from "./modal";
import{postDate} from "../services/services"

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
		openModal('.modal', modalTimerId);

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
			closeModal('.modal');

			setTimeout(() => {
				//add class show
				prevModalDialog.classList.remove("show");
			}, 300);
			//устан setTimeout тут чтоб удалить класс show
		}, 2000);
	}
}

export default forms;