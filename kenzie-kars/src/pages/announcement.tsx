import Footer from "@/components/footer";
import Header from "@/components/header";
import { Inter } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";
import carIntro from "../assets/carIntro.png";
import ProfileIcon from "@/components/profileIcon";

const inter = Inter({ subsets: ["latin"] });

export default function Announcement() {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [openFilter, setOpenFilter] = useState(false);

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
      <main
        className={`flex min-h-screen relative ${inter.className} gap-20 pt-[75px] bg-grey-8 body-1-400 z-10`}>
        <span className="absolute top-0 left-0 bg-brand-1 w-full h-[600px] md:h-[680px] z-20"></span>
        <div className="w-full z-30">
          <div className="md:flex w-full">
            <div className="w-full md:w-[60%]">
              <div className="flex flex-col gap-4 items-center py-16 px-4 h-[500px] md:h-[600px]">
                <div className="min-h-[350px] h-[350px] bg-whiteFixed rounded overflow-hidden">
                  <Image
                    className="w-full h-full object-cover object-center"
                    src={carIntro}
                    alt="logo motors shop"
                  />
                </div>
              </div>

              <div className="p-4 flex flex-col gap-8 relative bottom-12 md:bottom-[180px] w-full md:max-w-[685px] md:mx-auto">
                <div className="flex flex-col gap-8 font-semibold bg-whiteFixed rounded p-8">
                  <h3 className="heading-6-600">
                    Mercedes Benz A 200 CGI ADVANCE SEDAN Mercedes Benz A 200
                  </h3>
                  <div>
                    <span className="bg-brand-4 text-brand-2 mr-4 p-2 rounded">0 KM</span>
                    <span className="bg-brand-4 text-brand-2 p-2 rounded">2019</span>
                  </div>
                  <p>R$ 00.0000,00</p>
                  <button className="small-brand-1 max-w-max">Comprar</button>
                </div>

                <div className="flex flex-col gap-8 bg-whiteFixed rounded p-8 ">
                  <h3 className="heading-6-600 ">Descrição</h3>
                  <p className="text-grey-2">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled it to make a type specimen
                    book.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-[40%] relative">
              <div className="p-4 flex flex-col gap-8 relative bottom-12 md:bottom-[-50px] ">
                <ul className="flex flex-wrap bg-whiteFixed px-8  pt-20 pb-10 w-full justify-items-center relative justify-between gap-y-8 rounded md:max-w-[440px]">
                  <h3 className="absolute top-8 left-8 heading-6-600 ">Fotos</h3>
                  <li className=" rounded overflow-hidden w-[30%] h-[90px] ">
                    <Image
                      className="w-full h-full object-cover"
                      src={carIntro}
                      alt="logo motors shop"
                    />
                  </li>
                  <li className=" rounded overflow-hidden w-[30%] h-[90px]">
                    <Image
                      className="w-full h-full object-cover"
                      src={carIntro}
                      alt="logo motors shop"
                    />
                  </li>
                  <li className=" rounded overflow-hidden w-[30%] h-[90px]">
                    <Image
                      className="w-full h-full object-cover"
                      src={carIntro}
                      alt="logo motors shop"
                    />
                  </li>
                  <li className=" rounded overflow-hidden w-[30%] h-[90px]">
                    <Image
                      className="w-full h-full object-cover"
                      src={carIntro}
                      alt="logo motors shop"
                    />
                  </li>
                </ul>
                <div className="flex flex-col gap-8 bg-whiteFixed rounded p-8 items-center md:max-w-[440px]">
                  <div className="flex flex-col items-center gap-4 ">
                    <span className="bg-brand-1 w-[77px] h-[77px] rounded-full text-grey-10 text-center">
                      <p className="relative top-4 heading-3-500">
                        {"Name Name".split(" ").map((letter: string) => letter.charAt(0))}
                      </p>
                    </span>
                    <h3 className="heading-6-600 ">{"Name Name"}</h3>
                  </div>
                  <p className="text-grey-2">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's
                  </p>
                  <button className="medium-grey-1 w-10/12">Ver todos anuncios</button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[60%]">
            <div className="p-4 flex flex-col gap-8 relative bottom-12 md:bottom-[160px] md:max-w-[685px] mx-auto">
              <div className="flex flex-col gap-8 bg-whiteFixed rounded p-8">
                <h3 className=" heading-6-600 ">Comentários</h3>
                <ul className="flex flex-col gap-8">
                  <li className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <ProfileIcon name="Name" />
                      <p className="text-grey-4 text-[12px]">- há 3 dias</p>
                    </div>
                    <p className="text-grey-2">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                      when an unknown printer took a galley of type and scrambled it to make a type
                      specimen book.
                    </p>
                  </li>
                  <li className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <ProfileIcon name="Name" />
                      <p className="text-grey-4 text-[12px]">- há 3 dias</p>
                    </div>
                    <p className="text-grey-2">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                      when an unknown printer took a galley of type and scrambled it to make a type
                      specimen book.
                    </p>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-8 bg-whiteFixed rounded p-8 ">
                <ProfileIcon name="Name" />
                <form className="flex flex-col gap-8">
                  <textarea
                    className="border border-grey-5 h-[130px] p-4 resize-none rounded"
                    placeholder="Carro muito confortável, foi uma ótima experiência de compra..."></textarea>
                  <button type="submit" className="small-brand-1 max-w-max">
                    Comentar
                  </button>
                </form>
                <div className="flex flex-wrap gap-4">
                  <span className="bg-grey-7 text-grey-4 max-w-max py-1 px-4 rounded-2xl text-[12px] font-semibold">
                    Gostei muito!
                  </span>
                  <span className="bg-grey-7 text-grey-4 max-w-max py-1 px-4 rounded-2xl text-[12px] font-semibold">
                    Gostei muito!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
