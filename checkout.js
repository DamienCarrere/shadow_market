// validations coordonnées - Contact Information

const validateContactInformationBtn = document.getElementById("vCIBtn");

function validateContactInformation() {
    let valid = true;

    document.getElementById("emailError").textContent = "";
    document.getElementById("phoneError").textContent = "";
    document.getElementById("firstNameError").textContent = "";
    document.getElementById("lastNameError").textContent = "";

    const email = document.getElementById("email").value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "" || !emailPattern.test(email)) {
        document.getElementById("emailError").textContent =
            "Please enter a valid email";
        valid = false;
    }

    const tel = document.getElementById("tel").value.trim();
    const phonePattern = /^\d{10}$/;
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
    const b = document.getElementById("shippingAddresse");
    b.style.display = "block";
}

validateContactInformationBtn.addEventListener("click", () => {
    if (validateContactInformation()) {
        changefirst();
    }
});

// validation coordonnées - Shipping address
