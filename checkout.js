// validations coordonnées

function validateForm() {
  // champs obligatoire
  const mandatoryForm = [
    "email",
    "firstName",
    "lastName",
    "address",
    "city",
    "country",
    "postal",
    "card",
    "nameOnCard",
    "expiration",
    "cvv",
  ];

  // Suppose que tout est valable
  let valid = true;

  //Parcour tous les champs obligatoire
  mandatoryForm.forEach(function (fieldName) {
    console.log("test");

    // chercher le champ donne le HTML
    const inputElement = document.querySelector(`[name="${fieldName}"]`);

    // si le champe n'est pas trouvé ou son contenu est vide
    if (!inputElement || inputElement.value.trim() === "") {
      // => error
      inputElement.classList.add("error");

      // la forme nest pas valide
      valid = false;
    } else {
      // si ok, j'enleve error
      inputElement.classList.remove("error");
    }
  });

  // si l'utilisateur a accepté les condotions...
  const termsCheckbox = document.querySelector("#terms");
  if (!termsCheckbox.checked) {
    alert("You must accept the terms of purchase");
    valid = false;
  }

  return valid;
}
