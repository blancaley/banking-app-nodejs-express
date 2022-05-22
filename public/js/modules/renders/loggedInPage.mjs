import { loginForm, registerForm, logoutForm, userPage, welcomeMsg } from "../constants.mjs"
import { renderUserProfile, renderCreateAccounts, renderAccounts } from "./renderComponents.mjs"
import { createAccount } from "../account/createAccount.mjs";


const renderLoggedInPage = (user) => {
  // User has username, firstName and ID
  loginForm.hidden = true;
  registerForm.hidden = true;
  userPage.hidden = false;
  welcomeMsg.innerText = `Welcome ${user.firstName}`
  logoutForm.hidden = false;

  renderUserProfile();
  renderCreateAccounts();
  renderAccounts();

  const createAccountForm = document.getElementById("createAccountForm");
  createAccountForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    await createAccount();
  })
};

export { renderLoggedInPage }