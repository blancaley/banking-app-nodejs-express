import { loginForm, registerForm, logoutForm, userPage, welcomeMsg } from "../constants.mjs"
import { renderUserProfile, renderCreateAccounts } from "./renderComponents.mjs"
import { createAccount } from "../account/createAccount.mjs";
import { renderUserAccounts } from "./userAccounts.mjs"

const renderLoggedInPage = (user) => {
  // User has username, firstName and ID
  loginForm.hidden = true;
  registerForm.hidden = true;
  userPage.hidden = false;
  welcomeMsg.innerText = `Welcome ${user.firstName}`
  logoutForm.hidden = false;

  renderUserProfile();
  renderCreateAccounts();
  renderUserAccounts();

  const createAccountForm = document.getElementById("createAccountForm");
  createAccountForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    await createAccount();
    await renderUserAccounts();
  })
};

export { renderLoggedInPage }