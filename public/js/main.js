import { loginForm, registerForm, logoutForm } from "./modules/constants.mjs"
import { logIn } from "./modules/login.mjs"
import { register } from "./modules/register.mjs"
import { logOut } from "./modules/logout.mjs"
import { isLoggedIn } from "./modules/isloggedin.mjs"

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

// Check if user is logged in every time page reloads
isLoggedIn();