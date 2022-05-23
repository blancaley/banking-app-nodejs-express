import { deleteAccount } from "../account/deleteAccount.mjs"
import { renderDepositForm } from "../renders/depositForm.mjs";
import { renderWithdrawForm } from "../renders/withdrawForm.mjs"
import { renderUserAccounts } from "../renders/userAccounts.mjs";
import { deposit } from "../account/deposit.mjs";
import { withdraw } from "../account/withdraw.mjs";
import { renderDepositSuccess } from "../renders/depositSuccess.mjs";
import { renderWithdrawSuccess } from "../renders/withdrawSuccess.mjs";

const setDelete = () => {
  const deletBtns = document.querySelectorAll(".deleteBtn");
  deletBtns.forEach(btn => btn.addEventListener("click", async (e) => {
    deleteAccount(e);
    await renderUserAccounts();
  }));
}

const setDeposit = (e) => {
  const depositForm = e.target.closest("#editAccount").querySelector("#depositForm");
  depositForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const res = await deposit(e);
    if (res.success) {
      renderDepositSuccess(e);
    }
  })
}

const setWithdraw = (e) => {
  const withdrawForm = e.target.closest("#editAccount").querySelector("#withdrawForm");
  withdrawForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const res = await withdraw(e);
    if (res.success) {
      renderWithdrawSuccess(e);
    }
  })
}

const setOpenDepositForm = () => {
  const openDepositFormBtns = document.querySelectorAll(".openDepositFormBtn");
  openDepositFormBtns.forEach(btn => btn.addEventListener("click", async (e) => {
    renderDepositForm(e);
    setDeposit(e);
  }));
}

const setOpenWithdrawForm = () => {
  const openWithDrawFormBtns = document.querySelectorAll(".openWithdrawFormBtn");
  openWithDrawFormBtns.forEach(btn => btn.addEventListener("click", async (e) => {
    renderWithdrawForm(e);
    setWithdraw(e);
  }));
}

const setDoneBtn = (e) => {
  const doneTransferBtn = document.getElementById("doneTransferBtn");
  doneTransferBtn.addEventListener("click", () => {
    renderUserAccounts();
  })
}

const setEditAccountEventListeners = () => {
  setDelete();
  setOpenDepositForm();
  setOpenWithdrawForm();
}

export { setEditAccountEventListeners, setDoneBtn }