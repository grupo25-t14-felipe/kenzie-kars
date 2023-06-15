import Image from "next/image";
import car from "../assets/car.png";
import Profile from "./profileIcon";
import { ReactNode } from "react";

interface ICardProps {
  children: ReactNode;
}

const Card = ({children}: ICardProps) => {
  return (
      <li className="px-4 py-8 flex flex-col gap-6 text-grey-1 min-w-[100%] md:min-w-[50%] lg:min-w-[33%] xl:min-w-[25%] w-[100%] md:w-[50%] lg:w-[33%] xl:w-[25%] relative">
        {children}
        <div>
          <Image className="w-full h-full" src={car} alt="carro" />
        </div>
        <h3 className="w-full whitespace-nowrap  font-bold truncate">
          Product title stays here - max 1 line
        </h3>
        <p className="w-full line-clamp-2">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem...
        </p>
        <Profile name="Samuel Leão" />
        <div className=" flex justify-between font-bold">
          <div>
            <span className="bg-brand-4 text-brand-2 mr-4 p-2 rounded">0 KM</span>
            <span className="bg-brand-4 text-brand-2 p-2 rounded">2019</span>
          </div>
          <p>R$ 00.0000,00</p>
        </div>
      </li>
  );
};

export default Card;
