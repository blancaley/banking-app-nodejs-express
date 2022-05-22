import { getUserAccounts } from "../account/getUserAccounts.mjs";
import { deleteAccount } from "../account/deleteAccount.mjs"

const renderUserAccounts = async () => {
  const userAccountsList = document.getElementById("userAccountsList");

  const accounts = await getUserAccounts();

  const accountsHTMLString = accounts.map( (acc) => {
    const { name, _id, amount } = acc;
    return `
    <li>
      <h4>${name}</h4>
      <p>${_id}</p>
      <p>${amount} kr</p>
      <button class="depositBtn" data-accid=${_id}>Deposit</button>
      <button class="withdrawBtn" data-accid=${_id}>Withdraw</button>
      <button class="deleteBtn" data-accid=${_id}>Delete</button>
    </li>`
  }).join("");

  userAccountsList.innerHTML = accountsHTMLString;

  const deletBtns = document.querySelectorAll(".deleteBtn");

  deletBtns.forEach(btn => btn.addEventListener("click", async (e) => {
    deleteAccount(e);
    await renderUserAccounts();
  }));
}

export { renderUserAccounts }