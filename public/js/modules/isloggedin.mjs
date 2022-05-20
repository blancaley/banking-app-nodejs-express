import { loginForm, registerForm, logoutForm, welcomeMsg } from "./constants.mjs"

const isLoggedIn = async () => {
  const res = await fetch("/api/loggedin");
  const data = await res.json();

  if (data.username) {
    welcomeMsg.innerText = `Welcome ${data.firstName}`
    logoutForm.hidden = false;
    loginForm.hidden = true;
    registerForm.hidden = true;
  } else {
    // Hide logout button if user is not logged in!
    logoutForm.hidden = true;
  }
}

export { isLoggedIn }