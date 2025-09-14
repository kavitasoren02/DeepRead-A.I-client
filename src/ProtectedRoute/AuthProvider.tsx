import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  type LogoutResponse,
  type AuthContextType,
  type AuthProviderProps,
  type LoginRequest,
  type LoginResponse,
  type User,
  type UserInfoResponse,
} from "../Service/interface";
import { _get, _post } from "../Service/ApiService";
import { GETUSERINFO, LOGIN, LOGOUT } from "../Service/useApiService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<number>(0);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      setLoadingAuth(true);
      const { data } = await _get<UserInfoResponse>(GETUSERINFO);
      setUser(data?.user || null);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
      setIsAuthenticated(0);
    } finally {
      setLoadingAuth(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [isAuthenticated]);

  const handleLogin = async (payload: LoginRequest) => {
    try {
      setLoadingAuth(true);
      const response = await _post<LoginResponse>(LOGIN, payload);
      await fetchUser();
      return response;
    } catch (error) {
      console.error("Failed to Login", error);
    } finally {
      setLoadingAuth(false);
    }
  };

  const handleLogout = async () => {
    await _post<LogoutResponse>(LOGOUT, {});
    setUser(null);
    setLoadingAuth(false);
    navigate("/");
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        handleLogin,
        handleLogout,
        loadingAuth,
        setLoadingAuth,
        fetchUser,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//custom hook to use the context
export function useAuth() {
  const context = useContext(AuthContext);

  if (context == undefined) {
    throw new Error("useAuth must be used of an Authprovider");
  }
  return context;
}
