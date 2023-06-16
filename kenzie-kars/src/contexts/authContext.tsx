import { loginData } from "@/schemas/user.schema";
import api from "@/services/api";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { ReactNode, createContext, useContext } from "react";

interface loginProps {
  children: ReactNode;
}

interface authProviderData {
  login: (loginData: loginData) => void;
}

const AuthContext = createContext<authProviderData>({} as authProviderData);

export const AuthProvider = ({ children }: loginProps) => {
  const router = useRouter();

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
  return <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("lalala");
  }

  return context;
};
