import { isLoggedIn } from "../authentication/isloggedin.mjs";

const getUserAccounts = async () => {
  // Get user info from cookie session
  const user = await isLoggedIn();
  const accounts = await fetch(`/api/users/${user.userID}/accounts`);
  return accounts.json();
}

export { getUserAccounts }