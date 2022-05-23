const createAccountsHTMLString = (accounts, container) => {
  const accountsHTMLString = accounts.map( (acc) => {
    const { name, _id, amount } = acc;
    return `
    <li data-accid=${_id}>
      <h4>${name}</h4>
      <p>${_id}</p>
      <p>${amount} kr</p>
      <div id="editAccount"> 
        <div id="accountTransfers"></div>
        <div id="accountBtns">
          <button class="openDepositFormBtn">+ Deposit</button>
          <button class="openWithdrawFormBtn">- Withdraw</button>
          <button class="deleteBtn" data-accid=${_id}>Delete</button>
        </div>
      </div>
    </li>`
  }).join("");

  container.innerHTML = accountsHTMLString;
  return;
}

export { createAccountsHTMLString }