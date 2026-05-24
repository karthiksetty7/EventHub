import { loginUser, registerUser, getCurrentUser } from "../api/authApi";

import { saveToken, saveUser, clearStorage } from "../utils/storage";

// ==========================================
// LOGIN SERVICE
// ==========================================
export const loginService = async (data) => {
  try {
    const response = await loginUser(data);

    const { token, user } = response;

    saveToken(token);

    saveUser(user);

    return response;
  } catch (error) {
    throw new Error(error?.message || "Invalid email or password");
  }
};

// ==========================================
// REGISTER SERVICE
// ==========================================
export const registerService = async (data) => {
  try {
    const response = await registerUser(data);

    const { token, user } = response;

    saveToken(token);

    saveUser(user);

    return response;
  } catch (error) {
    throw new Error(error?.message || "Registration failed");
  }
};

// ==========================================
// LOGOUT SERVICE
// ==========================================
export const logoutService = () => {
  clearStorage();
};

// ==========================================
// GET AUTH USER
// ==========================================
export const getAuthUser = async () => {
  try {
    const response = await getCurrentUser();

    return response.user;
  } catch (error) {
    throw new Error(error?.message || "Failed to fetch user");
  }
};
