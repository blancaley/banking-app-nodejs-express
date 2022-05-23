const getAllAccounts = async () => {
  const accounts = await fetch(`/api/accounts`);
  const data = await accounts.json();
  return data;
}

export { getAllAccounts }