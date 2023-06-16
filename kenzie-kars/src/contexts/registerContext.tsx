import { UserData } from "@/schemas/user.schema";
import api from "@/services/api";
import { useRouter } from "next/router";
import { ReactNode, createContext, useContext, useState } from "react";

interface Props {
  children: ReactNode;
}

interface RegisterProviderData {
  register: (userData: UserData) => void;
  showModal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterContext = createContext<RegisterProviderData>({} as RegisterProviderData);

export const registerProvider = ({ children }: Props) => {
  const router = useRouter();
  const [showModal, setModal] = useState(false);

  const register = (userData: UserData) => {
    api
      .post("/users", userData)
      .then(() => {
        router.push("/login");
        setModal(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <RegisterContext.Provider value={{ register, showModal, setModal }}>
      {children}
    </RegisterContext.Provider>
  );
};

export const useRegister = () => useContext(RegisterContext);
