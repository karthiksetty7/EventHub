import Cookies from "js-cookie";

const TOKEN_KEY = "jwt_token";
const USER_KEY = "event_user";

// Use Cookies for the token (so axiosInstance can read it)
// Change 'Strict' to 'Lax' to see if it fixes the issue
export const saveToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: 7, sameSite: "Lax" });
};

export const getToken = () => Cookies.get(TOKEN_KEY);

// Use localStorage for the user object
export const saveUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

// Clear both
export const clearStorage = () => {
  Cookies.remove(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const isAuthenticated = () => !!getToken();
