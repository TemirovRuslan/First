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

export default timer;
