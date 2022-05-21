import { loginForm, registerForm, logoutForm, userPage, welcomeMsg } from "./constants.mjs"

const userProfileWrapper = document.getElementById("userProfile");
const createAccountWrapper = document.getElementById("createAccount");
const userAccountsWrapper = document.getElementById("userAccounts");

const renderUserProfile = () => {
  userProfileWrapper.innerHTML =
  `Test user profile`
}

const renderCreateAccounts = () => {
  createAccountWrapper.innerHTML =
  `Test account form`
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
};

const renderPublicPage = () => {
    // Hide logout button if user is not logged in
    logoutForm.hidden = true;
    userPage.hidden = true;
}

export { renderLoggedInPage, renderPublicPage }