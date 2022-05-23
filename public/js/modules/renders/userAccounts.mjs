import { getUserAccounts } from "../account/getUserAccounts.mjs";
import { createAccountsHTMLString } from "./createAccountsHTMLString.mjs";
import { setEditAccountEventListeners } from "../eventListeners/account.mjs";
import { userAccountsListContainer, userAccounts } from "../constants.mjs"

const renderUserAccounts = async () => {
  const accounts = await getUserAccounts();
  if (accounts.error) {
    userAccounts.hidden = true;
    return;
  }

  userAccounts.hidden = false;
  createAccountsHTMLString(accounts, userAccountsListContainer);
  setEditAccountEventListeners();
}

export { renderUserAccounts }