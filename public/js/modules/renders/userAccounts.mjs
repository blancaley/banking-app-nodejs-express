import { getUserAccounts } from "../account/getUserAccounts.mjs";
import { createAccountsHTMLString } from "./createAccountsHTMLString.mjs";
import { setEditAccountEventListeners } from "../eventListeners/account.mjs";
import { userAccountsListContainer } from "../constants.mjs"

const renderUserAccounts = async () => {
  const accounts = await getUserAccounts();
  createAccountsHTMLString(accounts, userAccountsListContainer);
  setEditAccountEventListeners();
}

export { renderUserAccounts }