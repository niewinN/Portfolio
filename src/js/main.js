const mobileNav = document.querySelector(".nav_list")
const burgerIcon = document.querySelector(".burger")
const sendBtn = document.querySelector(".contact_form-btn")
const username = document.querySelector("#username")
const email = document.querySelector("#email")
const msg = document.querySelector("#msg")
const form = document.querySelector(".contact_form")
const popup = document.querySelector(".contact_form-popup")
const closePopup = document.querySelector(".contact_form-popup--close")
const experienceInput = document.querySelector(".experience_box-input")
const experienceBtn = document.querySelector(".experience_box-btn")
const experienceText = document.querySelector(".experience_result-text")
const experienceError = document.querySelector(".experience_box-error")
const experienceLink = document.querySelector(".experience_result-link")
const experienceResult = document.querySelector(".experience_result")
const text = document.querySelector(".about_box-text")

text.innerHTML = text.textContent.replace(/\S/g, "<span>$&</span>")

const animation = anime.timeline({
	targets: ".about_box-text span",
	easing: "easeInOutExpo",
	loop: false,
})

animation
	.add({
		rotate: function () {
			return anime.random(-360, 360)
		},
		translateX: function () {
			return anime.random(-500, 500)
		},
		translateY: function () {
			return anime.random(-500, 500)
		},
		duration: 5000,
		delay: anime.stagger(20),
	})

	.add({
		rotate: 0,
		translateX: 0,
		translateY: 0,
		duration: 5000,
		delay: anime.stagger(20),
	})

function sendMail() {
	const params = {
		name: document.getElementById("username").value,
		email: document.getElementById("email").value,
		msg: document.getElementById("msg").value,
	}

	const serviceID = "service_kuoaw14"
	const templateID = "template_gqd9iup"

	emailjs
		.send(serviceID, templateID, params)
		.then(res => {
			document.getElementById("username").value = ""
			document.getElementById("email").value = ""
			document.getElementById("msg").value = ""
			console.log(res)
		})
		.catch(err => console.log(err))
}

burgerIcon.addEventListener("click", function () {
	mobileNav.classList.toggle("active")
	burgerIcon.classList.toggle("active")
})

const showError = (input, msg) => {
	const formBox = input.parentElement
	const errorMsg = formBox.querySelector(".contact_form-box--error")

	formBox.classList.add("error")
	errorMsg.textContent = msg
}

const clearError = input => {
	const formBox = input.parentElement
	formBox.classList.remove("error")
}

const checkForm = input => {
	input.forEach(el => {
		if (el.value === "") {
			showError(el, el.placeholder)
		} else {
			clearError(el)
		}
	})
}

const checkLength = (input, min) => {
	if (input.value.length < min) {
		showError(
			input,
			`${input.previousElementSibling.innerText} must contain at least ${min} characters`
		)
	}
}

const checkEmail = email => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	if (re.test(email.value)) {
		clearError(email)
	} else {
		showError(email, `E-mail is invalid`)
	}
}

const checkErrors = () => {
	const allInputs = document.querySelectorAll(".contact_form-box")
	let errorCount = 0

	allInputs.forEach(el => {
		if (el.classList.contains("error")) {
			errorCount++
		}
	})

	if (errorCount === 0) {
		popup.classList.add("show")
	}

	console.log(errorCount)
}

const showExpError = (input2, text) => {
	const expBox = experienceInput.parentElement
	const errorText = expBox.querySelector(".experience_box-error")

	expBox.classList.add("errorExp")
	errorText.textContent = text
}

const clearExpError = () => {
	const expBox = experienceInput.parentElement
	expBox.classList.remove("errorExp")
}

const checkExp = () => {
	if (experienceInput === "") {
		showExpError(experienceInput, experienceInput.placeholder)
	} else {
		clearExpError()
	}
}

const checkExpLength = min => {
	if (experienceInput.value.length < min) {
		showExpError(
			experienceInput,
			`${experienceInput.previousElementSibling.innerText} must contain at least ${min} characters`
		)
		experienceResult.style.visibility = "hidden"
	} else {
		showExperience()
		confettiAnimation()
		experienceResult.style.visibility = "visible"
	}
}

const showExperience = () => {
	const ExpInputValue = experienceInput.value
	const date = new Date()
	const day = date.getDate()
	const month = date.getMonth() + 1
	const year = date.getFullYear()

	experienceText.textContent = `Frontend developer in ${ExpInputValue} since ${day}.${month}.${year} :)`
	// experienceLink.style.visibility = 'visible';
}

const confettiAnimation = () => {
	confetti({
		particleCount: 100,
		spread: 70,
		origin: { y: 0.6 },
	})
}

experienceBtn.addEventListener("click", e => {
	e.preventDefault()

	checkExp()
	checkExpLength(2)
})

sendBtn.addEventListener("click", e => {
	e.preventDefault()

	checkForm([username, email, msg])
	checkLength(username, 3)
	checkLength(msg, 5)
	checkLength(email, 6)
	checkEmail(email)
	checkErrors()
})

closePopup.addEventListener("click", () => {
	popup.classList.remove("show")
})
