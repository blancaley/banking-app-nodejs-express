import { isLoggedIn } from "../authentication/isloggedin.mjs";

const createAccount = async () => {
  const accountName = document.getElementById("accountName");
  const amount = document.getElementById("amount");

  // Get user info from cookie session
  const user = await isLoggedIn();
  
  const res = await fetch(`/api/users/${user.userID}/accounts`, {
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