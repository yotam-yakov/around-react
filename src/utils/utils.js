export function updateSaveButton(isSaving, formSelector) {
  const form = document.querySelector(formSelector);
  const submitButton = form.querySelector(".submit-button");
  if (isSaving) {
    submitButton.textContent = "Saving...";
  } else {
    if (formSelector === ".delete-popup") {
      submitButton.textContent = "Yes";
    } else {
      submitButton.textContent = "Save";
    }
  }
}
