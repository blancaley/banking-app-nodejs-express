const userProfileWrapper = document.getElementById("userProfile");
const createAccountWrapper = document.getElementById("createAccount");

const renderUserProfile = () => {
  userProfileWrapper.innerHTML =
  `Test user profile`
}

const renderCreateAccounts = () => {
  createAccountWrapper.innerHTML =
  `<form id="createAccountForm">
  <h3>Create account</h3>
  <label for="accountName">Account Name</label>
  <input type="text" name="accountName" id="accountName">

  <label for="amount">Amount</label>
  <input type="number" name="amount" id="amount">

  <button>Add account</button>
  </form>`
}

export { renderUserProfile, renderCreateAccounts }