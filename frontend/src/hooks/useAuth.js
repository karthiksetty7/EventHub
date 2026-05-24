import { useEffect, useState } from "react";
import { getAuthUser, logoutService } from "../services/authService";
import { getUser, clearStorage } from "../utils/storage";

const useAuth = () => {
  const [user, setUser] = useState(getUser());
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = !!user;

  const logout = () => {
    logoutService();
    clearStorage();
    setUser(null);
  };

  const refreshUser = async () => {
    setIsLoading(true);
    try {
      const data = await getAuthUser();
      setUser(data);
    } catch (error) {
      setUser(null);
      clearStorage();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      refreshUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    user,
    isAuthenticated,
    isLoading,
    logout,
    refreshUser,
  };
};

export default useAuth;
