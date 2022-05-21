const logOut = async () => {
  await fetch("/api/logout", {
    method: "POST"
  })
}

export { logOut }