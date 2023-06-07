import Image from "next/image";
import logo from "../assets/Logo.png";
import Link from "next/link";
import { BiMenu } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";
import { useEffect, useState } from "react";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="relative shadow-lg">
      <div
        className={`w-full max-w-7xl flex ${
            windowWidth < 768 && menu ? "flex-col" : "flex-row items-center"
        } justify-between  px-6 mx-auto`}>

        <div className="py-6">
          <Image className="" width={153} height={27} src={logo} alt="logo motors shop" />
        </div>

        {windowWidth < 768 ? (
          menu ? (
            <>
              <GrFormClose className="w-6 h-6 absolute right-6 top-6 cursor-pointer" onClick={()=>{setMenu(false)}}/>
              <nav className=" w-full flex flex-col gap-8 font-semibold py-6">
                <Link className="whitespace-nowrap" href={"/login"}>
                  Fazer login
                </Link>

                <Link className="p-3 border border-grey-3 rounded" href={"/register"}>
                  Cadastrar
                </Link>
              </nav>
            </>
          ) : (
            <BiMenu className="w-6 h-6 absolute right-6 top-6 cursor-pointer" onClick={()=>{setMenu(true)}}/>
          )
        ) : (
          <nav className=" w-80 flex justify-around items-center font-semibold h-20 border-l">
            <Link className="whitespace-nowrap" href={"/login"}>
              Fazer login
            </Link>

            <Link className="py-3 px-6 border border-grey-3 rounded" href={"/register"}>
              Cadastrar
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
