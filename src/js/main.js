const mobileNav = document.querySelector(".nav_list")
const burgerIcon = document.querySelector(".burger")
const sendBtn = document.querySelector(".contact_form-btn")
const username = document.querySelector("#username")
const email = document.querySelector("#email")
const msg = document.querySelector("#msg")
const form = document.querySelector(".contact_form")
const popup = document.querySelector('.contact_form-popup')
const closePopup = document.querySelector('.contact_form-popup--close')


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
			document.getElementById("username").value = "";
			document.getElementById("email").value = "";
			document.getElementById("msg").value = "";
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

const checkEmail = params => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	if (re.test(email.value)) {
		clearError(email)
	} else {
		showError(email, `E-mail is invalid`)
	}
}

const checkErrors = () => {
    const allInputs = document.querySelectorAll('.contact_form-box')
    let errorCount = 0;

    allInputs.forEach(el => {
        if(el.classList.contains('error')) {
            errorCount++;
        }
    })

    if(errorCount === 0) {
        popup.classList.add('show')
    }

    console.log(errorCount);
}

sendBtn.addEventListener("click", e => {
	e.preventDefault()

	checkForm([username, email, msg])
	checkLength(username, 3)
	checkLength(msg, 5)
	checkEmail(email)
    checkErrors()
})

closePopup.addEventListener('click', () => {
    popup.classList.remove('show')
})

