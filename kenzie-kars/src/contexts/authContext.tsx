import { loginData } from "@/schemas/user.schema";
import api from "@/services/api";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { ReactNode, createContext, useContext, useState } from "react";
import { UserData } from "@/schemas/user.schema";

interface loginProps {
  children: ReactNode;
}

interface authProviderData {
  login: (loginData: loginData) => void;
  registerSubmit: (userData: UserData) => void;
  showModal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<authProviderData>({} as authProviderData);

export const AuthProvider = ({ children }: loginProps) => {
  const router = useRouter();
  const [showModal, setModal] = useState(false);

  const registerSubmit = (userData: UserData) => {
    console.log(userData)
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
      .then((response) => {
        setCookie(null, "projetofinal.token", response.data.token, {
          maxAge: 60 * 30,
          path: "/"
        });
      })
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return <AuthContext.Provider value={{ login, registerSubmit, showModal, setModal }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("lalala");
  }

  return context;
};
