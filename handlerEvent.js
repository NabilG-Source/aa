const passwordInput = document.querySelector("#input-password");
const eye = document.querySelector(".pass i");

const emailInput = document.querySelector("#input-email");
const form = document.querySelector("form");

eye.addEventListener("click", function () {
  toggleInputPassword(passwordInput);
});

const toggleInputPassword = (input) => {
  eye.classList.toggle("fa-eye");
  eye.classList.toggle("fa-eye-slash");
  input.type = input.type === "text" ? "password" : "text";
};
