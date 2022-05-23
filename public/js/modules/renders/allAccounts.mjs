import { getAllAccounts } from "../account/getAllAccounts.mjs";
import { createAccountsHTMLString } from "./createAccountsHTMLString.mjs";
import { setEditAccountEventListeners } from "../eventListeners/account.mjs";
import { allAccounts, allAccountsListContainer } from "../constants.mjs"

const renderAllAccounts = async () => {
  allAccounts.hidden = false;
  const accounts = await getAllAccounts();
  createAccountsHTMLString(accounts, allAccountsListContainer);
  setEditAccountEventListeners();
}

export { renderAllAccounts }