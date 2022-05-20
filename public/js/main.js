import { logIn } from "./modules/login.mjs"
import { register } from "./modules/register.mjs"
import { logOut } from "./modules/logout.mjs"

const loginForm = document.getElementById("login");
const registerForm = document.getElementById("register");
const logoutForm = document.getElementById("logout");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await logIn();
});

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await register();
});

logoutForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await logOut();
});