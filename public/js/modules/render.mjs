import { loginForm, registerForm, logoutForm, welcomeMsg } from "./constants.mjs"

const renderLoggedInPage = (user) => {
    welcomeMsg.innerText = `Welcome ${user.firstName}`
    logoutForm.hidden = false;
    loginForm.hidden = true;
    registerForm.hidden = true;
};

const renderPublicPage = () => {
    // Hide logout button if user is not logged in
    logoutForm.hidden = true;
}

export { renderLoggedInPage, renderPublicPage }