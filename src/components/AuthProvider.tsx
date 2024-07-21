import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { formatJWTTokenToUser } from "../utils/formatJWTTokenToUser";
import api from "../services/api.service";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

interface UserContextType {
  user: User | null | undefined;
  login: (userInfo: User) => void;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const navigate = useNavigate();

  // Get token and userId
  const token = localStorage.getItem("token");
  const id = token ? formatJWTTokenToUser(token) : null;

  const fetchUser = async () => {
    if (!token || !id) {
      return setUser(null);
    }
    try {
      const response = await api.get<{ user: User }>(`/Auth/me${id}`);
      setUser(response.data.user);
    } catch (error) {
      console.error("Failed to fetch user data", error);
      if (error instanceof AxiosError && error.response?.status === 401) {
        // Token might be invalid or expired
        logout();
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id, token]);

  const login = (userInfo: User) => {
    setUser(userInfo);
    navigate("/task");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUserContext(): UserContextType {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("This context should be used only inside UserProvider");
  }
  return context;
}
