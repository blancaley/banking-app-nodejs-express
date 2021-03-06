import { setDoneBtn } from "../eventListeners/account.mjs";

const renderDepositSuccess = (e) => {
  const accountTransfers = e.target.closest("#editAccount").firstElementChild;
  accountTransfers.innerHTML = `
  <div>
    <p>✅ Your top up was successful! ✅ </p>
    <button id="doneTransferBtn">Done</button>
  </div>`

  setDoneBtn();
}

export { renderDepositSuccess }