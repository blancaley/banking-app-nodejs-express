import { logoutForm, userPage } from "../constants.mjs"

const renderPublicPage = () => {
  // Hide logout button if user is not logged in
  logoutForm.hidden = true;
  userPage.hidden = true;
}

export { renderPublicPage }