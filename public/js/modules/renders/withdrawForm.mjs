const renderWithdrawForm = (e) => {
  const accountBtns = e.target.closest("#accountBtns");
  const accountTransfers = e.target.closest("#editAccount").firstElementChild;
  accountBtns.hidden = true;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
  <form id="withdrawForm">
    <h4>Withdraw</h4>
    <p>Select amount to withdraw from your account.</p>
    <input type="number" name="withdrawAmount" id="withdrawAmount" required>
    <button>Withdraw</button>
  </form>`;
  const form = wrapper.firstElementChild;
  
  accountTransfers.appendChild(form);
}

export { renderWithdrawForm }