import { loggedinNav, userPage } from "../constants.mjs"

const renderPublicPage = () => {
  // Hide nav buttons if user is not logged in
  loggedinNav.hidden = true;
  userPage.hidden = true;
}

export { renderPublicPage }