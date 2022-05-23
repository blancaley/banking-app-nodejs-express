import { getUser } from "../user/getUser.mjs";

const userProfileWrapper = document.getElementById("userProfile");

const renderUserProfile = async () => {
  const user = await getUser();

  userProfileWrapper.innerHTML = `
  <h3>${user.firstName} ${user.lastName}</h3>
  <p>${user.username}</p>
  <p>${user.accounts.length} accounts</p>`
}

export { renderUserProfile }