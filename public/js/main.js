import { logIn } from "./modules/login.mjs"

const loginForm = document.getElementById("login");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await logIn();
})