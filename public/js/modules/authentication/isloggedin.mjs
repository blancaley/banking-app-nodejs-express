import { renderLoggedInPage, renderPublicPage } from "../renders/render.mjs"

const isLoggedIn = async () => {
  const res = await fetch("/api/loggedin");
  const user = await res.json();
  if (user.username) {
    renderLoggedInPage(user);
  } else {
    renderPublicPage();
  }
}

export { isLoggedIn }