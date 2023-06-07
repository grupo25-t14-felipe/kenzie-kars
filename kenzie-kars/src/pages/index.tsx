import Header from "@/components/header";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
    <Header/>
    <main className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}>
    </main>
    </>
  );
}
