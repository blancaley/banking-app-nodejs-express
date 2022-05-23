import { isLoggedIn } from "../authentication/isloggedin.mjs";

const getUser = async() => {
  // Get user info from cookie session
  const userInfo = await isLoggedIn();
  const res = await fetch(`/api/users/${userInfo.userID}`);
  const user = await res.json();
  return user;
}

export { getUser }