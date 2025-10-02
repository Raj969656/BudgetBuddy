//save user data to localstorage

export const saveLoginData = (userData) => {
  localStorage.setItem("userData", JSON.stringify(userData));
};

//getting login data from localStorage
export const getLoginData = () => {
  const userDataStr = localStorage.getItem("userData");
  if (userDataStr) return JSON.parse(userDataStr);
  else return null;
};

export const getUserFromLocalStorage = () => {
  return getLoginData()?.user;
};

export const getAccessTokenFromLocalStorage = () => {
  return getLoginData()?.accessToken;
};

export const removeLoginData = () => {
  localStorage.removeItem("userData");
};

export const isUserLogin = () => {
  return getUserFromLocalStorage() && getAccessTokenFromLocalStorage();
};
