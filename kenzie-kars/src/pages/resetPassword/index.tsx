import Footer from "@/components/footer";
import Header from "@/components/header";
import SendEmailForm from "@/components/sendEmailForm";
import { NextPage } from "next";

const SendEmailResetPassword: NextPage = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center bg-grey-9">
        <SendEmailForm />
      </main>
      <Footer />
    </>
  );
};

export default SendEmailResetPassword;
