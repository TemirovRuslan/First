import {getResource} from '../services/services'

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
}

export default cards;
