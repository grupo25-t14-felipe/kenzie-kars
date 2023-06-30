import Footer from "@/components/footer";
import Header from "@/components/header";
import LoginForm from "@/components/loginForm";
import { NextPage } from "next";

const Login: NextPage = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center bg-grey-9">
        <LoginForm />
      </main>
      <Footer />
    </>
  );
};

export default Login;
