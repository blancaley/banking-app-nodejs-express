const renderDepositForm = () => {
  const accountBtns = document.getElementById("accountBtns");
  const accountTransfers = document.getElementById("accountTransfers");
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