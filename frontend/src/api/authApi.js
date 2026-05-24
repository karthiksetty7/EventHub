import axiosInstance from "../services/axiosInstance";

// ==========================================
// COMMON ERROR HANDLER
// ==========================================
const handleApiError = (error, defaultMessage = "Something went wrong") => {
  const customError = new Error(
    error?.response?.data?.message || error?.message || defaultMessage,
  );

  customError.status = error?.response?.status || 500;

  customError.success = false;

  throw customError;
};

// ==========================================
// REGISTER USER API
// ==========================================
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData);

    return response.data;
  } catch (error) {
    handleApiError(error, "Registration failed");
  }
};

// ==========================================
// LOGIN USER API
// ==========================================
export const loginUser = async (loginData) => {
  try {
    const response = await axiosInstance.post("/auth/login", loginData);

    return response.data;
  } catch (error) {
    handleApiError(error, "Login failed");
  }
};

// ==========================================
// GET CURRENT USER PROFILE
// ==========================================
export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/auth/me");

    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to fetch profile");
  }
};

// ==========================================
// UPDATE USER PROFILE
// ==========================================
export const updateProfile = async (profileData) => {
  try {
    const response = await axiosInstance.put("/auth/profile", profileData);

    return response.data;
  } catch (error) {
    handleApiError(error, "Profile update failed");
  }
};

// ==========================================
// CHANGE PASSWORD
// ==========================================
export const changePassword = async (passwordData) => {
  try {
    const response = await axiosInstance.put(
      "/auth/change-password",
      passwordData,
    );

    return response.data;
  } catch (error) {
    handleApiError(error, "Password update failed");
  }
};
