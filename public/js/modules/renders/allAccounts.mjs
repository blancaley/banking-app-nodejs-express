import { getAllAccounts } from "../account/getAllAccounts.mjs";
import { createAccountsHTMLString } from "./createAccountsHTMLString.mjs";
import { setEditAccountEventListeners } from "../eventListeners/account.mjs";
import { allAccounts, allAccountsListContainer, showAllAccountsForm } from "../constants.mjs"

const renderAllAccounts = async () => {
  const accounts = await getAllAccounts();

  if (accounts.error) {
    allAccounts.hidden = true;
    // If message already exists, skip creating it again
    if (document.getElementById("toolTip")) {
      return;
    }

    const toolTip = document.createElement("p");
    toolTip.id = "toolTip";
    toolTip.innerText = "Log in as admin to see all registered accounts."
    showAllAccountsForm.append(toolTip);
    return;
  }

  allAccounts.hidden = false;
  createAccountsHTMLString(accounts, allAccountsListContainer);
  setEditAccountEventListeners();
}

export { renderAllAccounts }