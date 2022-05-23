import { setDoneBtn } from "../eventListeners/account.mjs";

const renderWithdrawSuccess = (e) => {
  const accountTransfers = e.target.closest("#editAccount").firstElementChild;
  accountTransfers.innerHTML = `
  <div>
    <p>✅ Your withdraw was successful! ✅ </p>
    <button id="doneTransferBtn">Done</button>
  </div>`

  setDoneBtn();
}

export { renderWithdrawSuccess }