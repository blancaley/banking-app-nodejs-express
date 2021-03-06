const renderDepositForm = (e) => {
  
  const accountBtns = e.target.closest("#accountBtns");
  const accountTransfers = e.target.closest("#editAccount").firstElementChild;
  accountBtns.hidden = true;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
  <form id="depositForm">
    <h4>Top up</h4>
    <p>Select amount to transfer into your account.</p>
    <input type="number" name="depositAmount" id="depositAmount" required>
    <button>Deposit</button>
  </form>`;
  const form = wrapper.firstElementChild;
  
  accountTransfers.appendChild(form);
}

export { renderDepositForm }