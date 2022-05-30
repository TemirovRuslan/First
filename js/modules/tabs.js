
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

export default tabs;