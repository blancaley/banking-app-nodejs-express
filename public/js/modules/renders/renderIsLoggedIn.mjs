import { isLoggedIn } from "../authentication/isloggedin.mjs";
import { renderLoggedInPage } from "./loggedInPage.mjs"
import { renderPublicPage } from "./publicPage.mjs";

const render = async () => {
  // Variable is either false or user info from cookie
  const isUserLoggedIn = await isLoggedIn();

  if (!isUserLoggedIn) { return renderPublicPage(); }
  
  if (isUserLoggedIn) {
    // Username, firstName and ID
    renderLoggedInPage(isUserLoggedIn);
  }
}

export { render }