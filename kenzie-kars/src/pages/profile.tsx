import Card from "@/components/card";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Profile() {
  return (
    <>
      <Header />
      <main
        className={`flex min-h-screen relative ${inter.className} gap-20 pt-[75px] bg-grey-8 body-1-400 -z-20`}>
        <span className="absolute top-0 left-0 bg-brand-1 w-full h-[357px] -z-10"></span>
        <div className="px-4 py-20 flex flex-col gap-8 w-full items-center">
          <div className=" w-full bg-whiteFixed flex flex-col gap-8 p-8 rounded md:max-w-[70%]">
            <span className="bg-brand-1 w-[77px] h-[77px] rounded-full text-grey-10 text-center">
              <p className="relative top-4 heading-3-500">
                {"Name Name".split(" ").map((letter: string) => letter.charAt(0))}
              </p>
            </span>
            <div className="flex items-center gap-4">
              <h3 className="heading-6-600 ">{"Name Name"}</h3>
              <p className="bg-brand-4 text-brand-2 mr-4 p-2 rounded font-semibold">anunciante</p>
            </div>
            <p className="text-grey-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s
            </p>
          </div>
          <h3 className="heading-5-600 text-left w-full pl-[8%]">Anúncios</h3>
          <ul className="w-full md:w-[80%] flex overflow-auto md:flex-wrap relative h-full">
            <Card >
              <span className="absolute top-10 left-6 text-grey-10 bg-brand-1 py-[2px] px-2 body-2-500">Ativo</span>
            </Card>
            <Card>
              <span className="absolute top-10 left-6 text-grey-10 bg-brand-1 py-[2px] px-2 body-2-500">Ativo</span>
            </Card>
            <Card>
              <span className="absolute top-10 left-6 text-grey-10 bg-brand-1 py-[2px] px-2 body-2-500">Ativo</span>
            </Card>
            <Card>
              <span className="absolute top-10 left-6 text-grey-10 bg-brand-1 py-[2px] px-2 body-2-500">Ativo</span>
            </Card>
          </ul>
          <div className="w-full font-semibold flex flex-col items-center gap-4">
            <p className="text-grey-3">
              <span className="text-grey-2">1</span> de 2
            </p>
            <p className="text-brand-1 cursor-pointer">{"Seguinte >"}</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
