const withdraw = async (e) => {
  const withdrawAmountInput = document.getElementById("withdrawAmount");
  // Get accID from li item
  const accID = e.target.closest("li").dataset.accid;

  const res = await fetch(`/api/accounts/${accID}/withdraw`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      amount: withdrawAmountInput.value
    })
  })
  const data = await res.json();
  return data;
}

export { withdraw }