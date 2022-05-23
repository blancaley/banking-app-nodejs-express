import { loginForm, registerForm, loggedinNav, userPage, welcomeMsg, allAccounts } from "../constants.mjs"
import { renderUserProfile } from "./userProfile.mjs"
import { renderCreateAccounts } from "./renderComponents.mjs"
import { createAccount } from "../account/createAccount.mjs";
import { renderUserAccounts } from "./userAccounts.mjs"
import { renderAllAccounts } from "./allAccounts.mjs";

const renderLoggedInPage = (user) => {
  // User has username, firstName and ID
  loginForm.hidden = true;
  registerForm.hidden = true;
  allAccounts.hidden = true;

  userPage.hidden = false;
  loggedinNav.hidden = false;

  welcomeMsg.innerText = `Welcome ${user.firstName}`

  renderUserProfile();
  renderCreateAccounts();
  renderUserAccounts();

  const createAccountForm = document.getElementById("createAccountForm");
  createAccountForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    await createAccount();
    await renderUserAccounts();

    // Update all accounts list if it was open before
    if (!allAccounts.hidden) {
      await renderAllAccounts();
    }

  })
};

export { renderLoggedInPage }