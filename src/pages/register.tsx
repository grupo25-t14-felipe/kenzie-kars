import RegisterForm from "@/components/formRegister";
import { NextPage } from "next";
import Header from "@/components/header";
import { Inter } from "next/font/google";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

const Cadastro: NextPage = () => {
  return (
    <>
      <Header />
      <main
        className={`flex min-h-screen relative ${inter.className} gap-20 pt-[75px] bg-grey-8 body-1-400  justify-center`}>
        <RegisterForm/>
      </main>
      <Footer />
    </>
  );
};

export default Cadastro;
