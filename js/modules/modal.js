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

export default modal;
export {closeModal, openModal}