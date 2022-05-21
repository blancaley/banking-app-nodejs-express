const createAccount = async () => {
  const accountName = document.getElementById("accountName");
  const amount = document.getElementById("amount");

  const res = await fetch("/api/users/62879dfdd9cf9ad203bd8660/accounts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: accountName.value,
      amount: amount.value
    })
  });

  const data = await res.json();
  return data;
}

export { createAccount }