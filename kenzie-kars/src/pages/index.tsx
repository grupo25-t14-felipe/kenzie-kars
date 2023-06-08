import CardList from "@/components/cardList";
import Filters from "@/components/filters";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { GrFormClose } from "react-icons/gr";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [openFilter, setOpenFilter] = useState(true);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Header />
      <div className="h-[680px] w-full text-whiteFixed relative bg-brand-1 bg-cover bg-center">
        <div className="text-whiteFixed w-full h-full flex flex-col items-center justify-center p-4 text-center">
          <p className="text-[32px]">Motors Shop</p>
          <p className="text-[24px]">A melhor plataforma de anúncios de carros do país</p>
        </div>
      </div>
      <main
        className={`${
          windowWidth < 768 ? "flex-col items-center" : "flex-row-reverse justify-between"
        } flex min-h-screen relative ${inter.className}`}>
        <CardList />
        {windowWidth < 768 ? (
          openFilter ? (
            <div className=" fixed top-[70px] left-0 w-full bg-whiteFixed z-10 py-20 h-full border-t border-grey-4 overflow-auto">
              <p className="absolute left-6 top-6">Filtro</p>
              <GrFormClose
                className="w-6 h-6 absolute right-6 top-6 cursor-pointer"
                onClick={() => {
                  setOpenFilter(false);
                }}
              />
              <Filters />
            </div>
          ) : (
            <>
              <div className="w-full font-semibold flex flex-col items-center mt-8">
                <p className="text-grey-3">
                  <span className="text-grey-2">1</span> de 2
                </p>
                <p className="text-brand-1 cursor-pointer">{"Seguinte >"}</p>
              </div>
              <button className="mt-8"
                onClick={() => {
                  setOpenFilter(true);
                }}>
                filtros
              </button>
            </>
          )
        ) : (
          <Filters />
        )}
      </main>
      <Footer/>
    </>
  );
}
