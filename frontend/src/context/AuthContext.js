import { createContext, useEffect, useState } from "react";

import {
  loginService,
  registerService,
  logoutService,
  getAuthUser,
} from "../services/authService";

import { isAuthenticated } from "../utils/storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // ==========================================
  // INITIAL AUTH CHECK
  // ==========================================
  useEffect(() => {
    const init = async () => {
      try {
        if (isAuthenticated()) {
          const currentUser = await getAuthUser();

          setUser(currentUser);
        }
      } catch (error) {
        console.error("Auth Init Error:", error);

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  // ==========================================
  // LOGIN
  // ==========================================
  const login = async (data) => {
    try {
      const res = await loginService(data);

      setUser(res.user);

      return res;
    } catch (error) {
      throw new Error(error?.message || "Invalid email or password");
    }
  };

  // ==========================================
  // REGISTER
  // ==========================================
  const register = async (data) => {
    try {
      const res = await registerService(data);

      setUser(res.user);

      return res;
    } catch (error) {
      throw new Error(error?.message || "Registration failed");
    }
  };

  // ==========================================
  // LOGOUT
  // ==========================================
  const logout = () => {
    logoutService();

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
