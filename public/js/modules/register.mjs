const signUpUsername = document.getElementById("signUpUsername");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const signUpPassword = document.getElementById("signUpPassword");

const register = async () => {
  const res = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: signUpUsername.value,
      firstName: firstName.value,
      lastName: lastName.value,
      password: signUpPassword.value    
    })
  });

  const data = await res.json();
  return data;
}

export { register }