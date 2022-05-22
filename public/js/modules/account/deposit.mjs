const deposit = async (e) => {
  const depositAmountInput = document.getElementById("depositAmount");
  // Get accID from li item
  const accID = e.target.closest("li").dataset.accid;

  const res = await fetch(`/api/accounts/${accID}/deposit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      amount: depositAmountInput.value
    })
  })
  const data = await res.json();
  return data;
}

export { deposit }