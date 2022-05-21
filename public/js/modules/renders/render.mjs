import { loginForm, registerForm, logoutForm, userPage, welcomeMsg } from "../constants.mjs"
import { createAccount } from "../account/createAccount.mjs";

const userProfileWrapper = document.getElementById("userProfile");
const createAccountWrapper = document.getElementById("createAccount");
const userAccountsWrapper = document.getElementById("userAccounts");

const renderUserProfile = () => {
  userProfileWrapper.innerHTML =
  `Test user profile`
}

const renderCreateAccounts = () => {
  createAccountWrapper.innerHTML =
  `<form id="createAccountForm">
  <h3>Create account</h3>
  <label for="accountName">Account Name</label>
  <input type="text" name="accountName" id="accountName">

  <label for="amount">Amount</label>
  <input type="number" name="amount" id="amount">

  <button>Add account</button>
  </form>`
}

const renderAccounts = () => {
  userAccountsWrapper.innerHTML =
  `Test account list`
}

const renderLoggedInPage = (user) => {
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

const renderPublicPage = () => {
    // Hide logout button if user is not logged in
    logoutForm.hidden = true;
    userPage.hidden = true;
}

export { renderLoggedInPage, renderPublicPage }