import { getUserAccounts } from "../account/getUserAccounts.mjs";

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
      <button class="deposit-btn" data-accid=${_id}>Deposit</button>
      <button class="withdraw-btn" data-accid=${_id}>Withdraw</button>
    </li>`
  }).join("");

  userAccountsList.innerHTML = accountsHTMLString;
}

export { renderUserAccounts }