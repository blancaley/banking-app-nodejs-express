import { logIn } from "./modules/login.mjs"
import { register } from "./modules/register.mjs"

const loginForm = document.getElementById("login");
const registerForm = document.getElementById("register");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await logIn();
});

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await register();
})