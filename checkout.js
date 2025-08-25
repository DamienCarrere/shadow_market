// validations coordonnées

function validateContactInformation() {
    // let valid = true;

    document.getElementById("emailError").textContent = "";
    document.getElementById("phoneError").textContent = "";
    document.getElementById("firstNameError").textContent = "";
    document.getElementById("lastNameError").textContent = "";

    const email = document.getElementById("email").value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "" || !emailPattern.test(email)) {
        document.getElementById("emailError").textContent =
            "Please enter a valid email";
        return false;
    }

    const tel = document.getElementById("tel").value.trim();
    const phonePattern = /^\d{10}$/;
    if (tel === "" || !phonePattern.test(tel)) {
        document.getElementById("phoneError").textContent =
            "Please enter a valid 10-digit phone number";
        return false;
    }

    const firstName = document.getElementById("firstName").value.trim();
    if (firstName === "") {
        document.getElementById("firstNameError").textContent =
            "First name is required";
        return false;
    }

    const lastName = document.getElementById("lastName").value.trim();
    if (lastName === "") {
        document.getElementById("lastNameError").textContent =
            "Last name is required";
        return false;
    }

    return true;
}

const validateContactInformationBtn = document.getElementById("vCIBtn");
const form = document.getElementById("validateForm");

function changefirst() {
    const a = document.getElementById("contactInformation");
    a.style.display = "none";
    const b = document.getElementById("shippingAdresse");
    b.style.display = "block";
}

validateContactInformationBtn.addEventListener("click", () => {
    if (validateContactInformation()) {
        changefirst();
    }
});
