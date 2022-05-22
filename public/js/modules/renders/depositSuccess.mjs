import { renderUserAccounts } from "./userAccounts.mjs";

const renderDepositSuccess = () => {
  const accountTransfers = document.getElementById("accountTransfers");
  accountTransfers.innerHTML = `
  <div>
    <p>✅ Your top up was successful! ✅ </p>
    <button id="doneDepositBtn">Done</button>
  </div>`

  const doneDepositBtn = document.getElementById("doneDepositBtn");
  doneDepositBtn.addEventListener("click", () => {
    renderUserAccounts();
  })
}

export { renderDepositSuccess }