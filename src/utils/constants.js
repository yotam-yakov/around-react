//User info consts
export const profileInfoFields = {
  name: document.querySelector("#profile-name"),
  about: document.querySelector("#profile-about"),
};

//Edit profile consts
export const editProfileInputs = {
  name: document.querySelector("#name-input"),
  about: document.querySelector("#about-input"),
};

// Validator consts
const validatorsList = [];
const formsList = Array.from(document.querySelectorAll(".form"));

// Initial function consts
export const config = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save",
  inactiveButtonClass: "form__save_disabled",
  inputErrorClass: "form__input_invalid",
  errorClass: "form__input-error_active",
};
