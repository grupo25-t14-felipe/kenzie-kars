import Footer from "@/components/footer";
import Header from "@/components/header";
import ResetPasswordForm from "@/components/resetPasswordForm";

import { NextPage } from "next";
import { useRouter } from "next/router";

const ResetPassword: NextPage = () => {
  const router = useRouter();
  const { token } = router.query;

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center bg-grey-9">
        <ResetPasswordForm token={token as string} />
      </main>
      <Footer />
    </>
  );
};

export default ResetPassword;
