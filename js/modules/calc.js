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

export default calculator;