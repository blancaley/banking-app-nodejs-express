const deleteAccount = async (e) => {

  const accID = e.target.dataset.accid;

  await fetch(`/api/accounts/${accID}`, {
    method: "DELETE"
  });
}

export { deleteAccount }