import { ResetPasswordData, SendEmailResetPasswordData, loginData } from "@/schemas/user.schema";
import api from "@/services/api";
import { NextRouter, useRouter } from "next/router";
import { parseCookies, setCookie } from "nookies";
import { ReactNode, createContext, use, useContext, useEffect, useState } from "react";
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
  router: NextRouter
  token: any;
  setToken: React.Dispatch<React.SetStateAction<any>>
  sendEmail: (sendEmailResetPasswordData: SendEmailResetPasswordData) => void;
  resetPassword: (resetPasswordData: ResetPasswordData, token: string) => void;
  username: string ;
  setUsername: React.Dispatch<React.SetStateAction<string>>
}
export const AuthContext = createContext<authProviderData>({} as authProviderData);

export const AuthProvider = ({ children }: loginProps) => {
  const router = useRouter();
  const [showModal, setModal] = useState(false);
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");

  useEffect(()=>{
    const token = parseCookies()["projetofinal.token"]
    setToken(token)
    setUsername(`${token && jwtDecode<any>(token).userName}`)
  },[])

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
      .then((response) => {
        const { sub, userName }: { sub: string, userName: string } = jwtDecode(response.data.token);
        setUsername(userName)
        window.localStorage.setItem("@kenzie-kars-userId", sub);

        return response;
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

  const sendEmail = (sendEmailResetPasswordData: SendEmailResetPasswordData) => {
    api
      .post("/users/resetPassword", sendEmailResetPasswordData)
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetPassword = (resetPasswordData: ResetPasswordData, token: string) => {
    api
      .patch(`/users/resetPassword/${token}`, { password: resetPasswordData.password })
      .then(() => {
        router.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        registerSubmit,
        showModal,
        setModal,
        router,
        token,
        setToken,
        sendEmail,
        resetPassword,
        username, 
        setUsername
      }}>
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
