import { loginForm, registerForm, logoutForm, showAllAccountsForm  } from "./modules/constants.mjs"
import { logIn } from "./modules/authentication/login.mjs"
import { register } from "./modules/authentication/register.mjs"
import { logOut } from "./modules/authentication/logout.mjs"
import { renderAllAccounts } from "./modules/renders/allAccounts.mjs"
import { render } from "./modules/renders/renderIsLoggedIn.mjs"

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await logIn();
  location.reload();
});

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await register();
  location.reload();
});

logoutForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await logOut();
  location.reload();
});

showAllAccountsForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  renderAllAccounts();
})
// Render UI by checking if user is logged in every time page reloads
render();