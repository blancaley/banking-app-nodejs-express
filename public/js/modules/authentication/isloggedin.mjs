const isLoggedIn = async () => {
  try {
    const res = await fetch("/api/loggedin");
    if (res.status === 401) {
      throw new Error('Unauthorized')
    }
    const user = await res.json();
    return user;
  } catch (error) {
    return false;
  }
}

export { isLoggedIn }