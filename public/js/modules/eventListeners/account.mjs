import { deleteAccount } from "../account/deleteAccount.mjs"
import { renderDepositForm } from "../renders/depositForm.mjs";
import { renderUserAccounts } from "../renders/userAccounts.mjs";
import { deposit } from "../account/deposit.mjs";
import { renderDepositSuccess } from "../renders/depositSuccess.mjs";

const setDelete = () => {
  const deletBtns = document.querySelectorAll(".deleteBtn");
  deletBtns.forEach(btn => btn.addEventListener("click", async (e) => {
    deleteAccount(e);
    await renderUserAccounts();
  }));
}

const setDeposit = () => {
  const depositForm = document.getElementById("depositForm");
  depositForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("On the way to depositing")
    const res = await deposit(e);
    if (res.success) {
      renderDepositSuccess();
    }
  })
}

const setOpenDepositForm = () => {
  const openDepositFormBtns = document.querySelectorAll(".openDepositFormBtn");
  openDepositFormBtns.forEach(btn => btn.addEventListener("click", async (e) => {
    renderDepositForm();
    setDeposit();
  }));
}

const setEditAccountEventListeners = () => {
  setDelete();
  setOpenDepositForm();
}

export { setEditAccountEventListeners }