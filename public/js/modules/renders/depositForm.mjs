const renderDepositForm = () => {
  const accountBtns = document.getElementById("accountBtns");
  const editAccount = document.getElementById("editAccount");
  accountBtns.hidden = true;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
  <form id="depositForm">
    <h4>Deposit money</h4>
    <input type="number" name="depositAmount" id="depositAmount" required>
    <button>Deposit</button>
  </form>`;
  const form = wrapper.firstElementChild;
  
  editAccount.appendChild(form);
}

export { renderDepositForm }