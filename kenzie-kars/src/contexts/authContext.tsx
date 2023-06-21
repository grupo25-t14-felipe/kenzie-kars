import { loginData } from "@/schemas/user.schema";
import api from "@/services/api";
import { useRouter } from "next/router";
import { parseCookies, setCookie } from "nookies";
import { ReactNode, createContext, useContext, useState } from "react";
import { UserData } from "@/schemas/user.schema";
import jwtDecode from "jwt-decode";

interface loginProps {
  children: ReactNode;
}

interface authProviderData {
  login: (loginData: loginData) => void;
  registerSubmit: (userData: UserData) => void;
  showModal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  router: any;
  token: any;
  setToken: any;
}
export const AuthContext = createContext<authProviderData>({} as authProviderData);

export const AuthProvider = ({ children }: loginProps) => {
  const router = useRouter();
  const [showModal, setModal] = useState(false);
  const [token, setToken] = useState(parseCookies()['projetofinal.token']);
 
  const registerSubmit = (userData: UserData) => {
    api
      .post("/users", userData)
      .then(() => {
        setModal(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const login = (loginData: loginData) => {
    api
      .post("/login", loginData)
      .then( response => {
        const { sub }: { sub: string } = jwtDecode(response.data.token)
        
        window.localStorage.setItem('@kenzie-kars-userId', sub)

        return response
      })
      .then((response) => {
        setCookie(null, "projetofinal.token", response.data.token, {
          maxAge: 60 * 30,
          path: "/"
        });

        api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

        return response.data.token;
      })
      .then((response) => {
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      }); 
  };

  return (
    <AuthContext.Provider value={{ login, registerSubmit, showModal, setModal, router, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("lalala");
  }

  return context;
};
