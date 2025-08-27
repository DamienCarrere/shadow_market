const localCheckout = JSON.parse(localStorage.getItem("saveCheckout"));

// validations coordonnées - Contact Information

const validateContactInformationBtn = document.getElementById("vCIBtn");

function validateContactInformation() {
    let valid = true;

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
    } else {
        localStorage.setItem("saveCheckout", JSON.stringify(firstName));
        console.log(localCheckout);
    }
}

const lastName = document.getElementById("lastName").value.trim();
if (lastName === "") {
    document.getElementById("lastNameError").textContent =
        "Last name is required";
    valid = false;
}

return valid;

function changefirst() {
    const a = document.getElementById("contactInformation");
    a.style.display = "none";
    const b = document.getElementById("shippingAddress");
    b.style.display = "block";
}

validateContactInformationBtn.addEventListener("click", () => {
    if (validateContactInformation()) {
        changefirst();
    }
});

// validation coordonnées - Shipping address

function validateShippingAddress() {
    let valid = true;

    const address = document.getElementById("address").value.trim();
    if (address === "") {
        document.getElementById("addressError").textContent =
            "Address is required";
        valid = false;
    }

    const apartment = document.getElementById("apartment").value.trim();
    if (apartment === "") {
        document.getElementById("apartmentError").textContent =
            "Apartment is required";
        valid = false;
    }

    const city = document.getElementById("city").value.trim();
    if (city === "") {
        document.getElementById("cityError").textContent = "City is required";
        valid = false;
    }

    const country = document.getElementById("country").value.trim();
    if (country === "") {
        document.getElementById("countryError").textContent =
            "Country is required";
        valid = false;
    }

    const postal = document.getElementById("postal").value.trim();
    if (postal === "") {
        document.getElementById("postalError").textContent =
            "postal is required";
        valid = false;
    }
    return valid;
}

function changesecond() {
    const b = document.getElementById("shippingAddress");
    b.style.display = "none";
    const c = document.getElementById("shippingMethod");
    c.style.display = "block";
}

const validateShippingAddressBtn = document.getElementById("vSABtn");

validateShippingAddressBtn.addEventListener("click", () => {
    if (validateShippingAddress()) {
        changesecond();
    }
});

// validation - Shipping Method

function validateShippingMethod() {
    let valid = true;

    const shippingMethod = document.getElementById("shipping").value.trim();
    if (shippingMethod === "") {
        document.getElementById("shippingError").textContent =
            "Please select your shipping method";
        valid = false;
    }
    return valid;
}

function changesthird() {
    const c = document.getElementById("shippingMethod");
    c.style.display = "none";
    const d = document.getElementById("paymentMethod");
    d.style.display = "block";
}

const validationShippingMethodBtn = document.getElementById("vSMBtn");

validationShippingMethodBtn.addEventListener("click", () => {
    if (validateShippingMethod()) {
        changesthird();
    }
});

// validation payment Method

function validatePaymentMethod() {
    let valid = true;

    const creditCard = document.getElementById("card").value.trim();

    if (creditCard === "") {
        document.getElementById("cardError").textContent =
            "Please enter a valid 16-digit card number";
        valid = false;
    }

    const nameOnCard = document.getElementById("nameOnCard").value.trim();
    if (nameOnCard === "") {
        document.getElementById("nameOnCardError").textContent =
            "Your name is required";
        valid = false;
    }

    const expiration = document.getElementById("expiration").value.trim();

    if (expiration === "") {
        document.getElementById("expirationError").textContent =
            "Expiration Date is required";

        valid = false;
    }

    const cvv = document.getElementById("cvv").value.trim();

    if (cvv === "") {
        document.getElementById("cvv").textContent =
            "Please enter a valid 3-digit CVV number";
    }
    return valid;
}

function changesfourth() {
    const d = document.getElementById("paymentMethod");
    d.style.display = "none";
    const e = document.getElementById("checkboxContainer");
    e.style.display = "block";
}

const validatePaymentMethodBTN = document.getElementById("vPMBtn");

validatePaymentMethodBTN.addEventListener("click", () => {
    if (validatePaymentMethod()) {
        changesfourth();
    }
});

// ---------------afficher la commande+ total

// import { importData } from "../utils/importData.js";

const complatePurchaseBtn = document.getElementById("cPBtn");

complatePurchaseBtn.addEventListener("click", () => {
    thankYou();
});

function thankYou() {
    const local = JSON.parse(localStorage.getItem(localUser));
    document.getElementById(
        "thankYouMessage"
    ).textContent = `${local}thank you for your purchase!`;
}
