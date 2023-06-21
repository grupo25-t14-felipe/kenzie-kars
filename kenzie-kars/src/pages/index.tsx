import Card from "@/components/card";
import Filters from "@/components/filters";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Inter } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GrFormClose } from "react-icons/gr";
import carIntro from "../assets/carIntro.png";
import { GetServerSideProps } from "next";
import api from "@/services/api";
import { iAllAnnouncements } from "@/schemas/announcement.schema";
import nookies from "nookies";
import { useAuth } from "@/contexts/authContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ announcements, token }: any) {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [openFilter, setOpenFilter] = useState(false);
  const { setToken } = useAuth();
  
  setToken(token)

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
      <div className="h-[627px] md:h-[544px] w-full text-whiteFixed relative mt-[75px]">
        <Image
          className="w-full h-full object-cover absolute mix-blend-overlay"
          src={carIntro}
          alt="logo motors shop"
        />
        <div className="text-whiteFixed w-full h-full flex flex-col items-center p-4 text-center">
          <h1 className="heading-3-500 md:heading-1-700 mt-[76px] ">Motors Shop</h1>
          <h2 className="heading-5-500 md:heading-2-600">
            A melhor plataforma de anúncios de carros do país
          </h2>
        </div>
      </div>
      <main
        className={`${
          windowWidth < 768 ? "flex-col items-center" : "flex-row-reverse justify-between"
        } flex min-h-screen relative ${inter.className} gap-20 pb-20 pt-14`}>
        <ul className="w-full md:w-[70%] flex overflow-auto md:flex-wrap relative h-full">
          {announcements.map((announcement: any) => (
            <Card key={announcement.id} announcement={announcement}>
              <span></span>
            </Card>
          ))}
          <div className="w-full font-semibold md:flex gap-8 justify-center items-center hidden">
            <p className="text-grey-3">
              <span className="text-grey-2">1</span> de 2
            </p>
            <p className="text-brand-1 cursor-pointer">{"Seguinte >"}</p>
          </div>
        </ul>
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
              <button
                className="medium-brand-1 w-[80%]"
                onClick={() => {
                  setOpenFilter(true);
                }}>
                Filtros
              </button>

              <div className="w-full font-semibold flex flex-col items-center gap-4">
                <p className="text-grey-3">
                  <span className="text-grey-2">1</span> de 2
                </p>
                <p className="text-brand-1 cursor-pointer">{"Seguinte >"}</p>
              </div>
            </>
          )
        ) : (
          <Filters />
        )}
      </main>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await api.get<iAllAnnouncements>(`/announcements`);
  const cookies = nookies.get(context);
  
  return {
    props: { announcements: response.data, token: cookies["projetofinal.token"] || null }
  };
};
