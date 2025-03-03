const formData = { email: '', message: '' };
const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

restoreForm();

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', onTextareaInput);

function onFormSubmit(evt) {
  evt.preventDefault();

  const form = evt.currentTarget;

  if (form.elements.email.value === '' || form.elements.message.value === '') {
    alert('Fill please all fields');
  } else {
    console.log(formData);

    formData.email = '';
    formData.message = '';

    localStorage.removeItem(STORAGE_KEY);

    form.reset();
  }
}

function onTextareaInput(evt) {
  const name = evt.target.name;
  let value = evt.target.value;

  if (name in formData) {
    formData[name] = value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
}

function restoreForm() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (!savedData) {
    return;
  }

  formData.email = savedData.email;
  formData.message = savedData.message;

  form.elements.email.value = savedData.email;
  form.elements.message.value = savedData.message;
}
