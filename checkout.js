// validations coordonnées

const validateContactInformationBtn = document.getElementById("vCIBtn");
const form = document.getElementById("validateForm");
let valid = true;
function validateContactInformation() {
    document.getElementById("emailError").textContent = "";
    document.getElementById("phoneError").textContent = "";
    document.getElementById("firstNameError").textContent = "";
    document.getElementById("lastNameError").textContent = "";

    const email = document.getElementById("email").value.trim();
    if (email === "") {
        document.getElementById("emailError").textContent =
            "Please enter a valid email";
        valid = false;
    }

    const tel = document.getElementById("tel").value.trim();
    const phonePattern = /^[0-9\s\-+()]{7,15}$/;
    if (tel === "" || !phonePattern.test(tel)) {
        document.getElementById("phoneError").textContent =
            "Please enter a valid 10-digit phone number";
        valid = false;
    }

    const firstName = document.getElementById("firstName").value.trim();
    if (firstName === "") {
        document.getElementById("firstNameError").textContent =
            "First name is required";
        valid = false;
    }

    const lastName = document.getElementById("lastName").value.trim();
    if (lastName === "") {
        document.getElementById("lastNameError").textContent =
            "Last name is required";
        valid = false;
    }

    return valid;
}

function changefirst() {
    const a = document.getElementById("contactInformation");
    a.style.display = "none";
    const b = document.getElementById("shippingAdresse");
    b.style.display = "block";
}

validateContactInformationBtn.addEventListener("click", () => {
    validateContactInformation();
    changefirst();
});
