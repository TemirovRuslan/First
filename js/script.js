import tabs from "./modules/tabs";
import modal from "./modules/modal";
import calc from "./modules/calc";
import cards from "./modules/cards";
import forms from "./modules/forms";
import slider from "./modules/slider";
import timer from "./modules/timer";
import {openModal} from './modules/modal'

document.addEventListener("DOMContentLoaded", () => {
	const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 300000);

	tabs(".tabheader__item", ".tabcontent", "tabheader__item_active");
	modal("[data-modal]", ".modal", modalTimerId);
	calc();
	cards();
	forms('form', modalTimerId);
	timer('.timer', "2024-11-22");

	slider({
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
