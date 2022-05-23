const getAllAccounts = async () => {
  const accounts = await fetch(`/api/accounts`);
  return accounts.json();
}

export { getAllAccounts }