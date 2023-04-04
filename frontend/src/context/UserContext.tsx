import axios from "axios";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";

type UserContextProviderProps = {
  children: ReactNode;
};
type UserContext = {
  admin: User | undefined;
  profile: Profile | undefined;
  logout: () => void;
  // setUser: User | null;
};
type User = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  deliveryAddress: string;
};
type Profile = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  deliveryAddress: string;
};

export const UserContext = createContext({} as UserContext);

export function useUser() {
  return useContext(UserContext);
}
const token: string | null = localStorage.getItem("webshop");
const headers: object = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};
export function UserContextProvider({ children }: UserContextProviderProps) {
  const [admin, setAdmin] = useState<User>();
  const [profile, setProfile] = useState<Profile>();
  const navigate = useNavigate();

  const getCurrentUserProfile = () => {
    return axios.get("/auth/profile", headers);
  };
  const isAdmin = () => {
    return axios.get("/auth/admin");
  };
  useEffect(() => {
    getCurrentUserProfile().then((res) => setProfile(res.data));
    isAdmin().then((res) => setAdmin(res.data));
  }, []);
  const logout = () => {
    localStorage.removeItem("webshop");
    navigate("/");
    window.location.reload();
  };
  return (
    <UserContext.Provider value={{ profile, logout, admin }}>
      {children}
    </UserContext.Provider>
  );
}
