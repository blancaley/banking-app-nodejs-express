const logIn = async () => {
  await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: usernameInput.value,
      password: passwordInput.value
    })
  })
}

export { logIn }