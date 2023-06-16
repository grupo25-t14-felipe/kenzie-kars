import Image from "next/image";
import car from "../assets/car.png";
import Profile from "./profileIcon";
import { ReactNode } from "react";
import { iAnnouncement, iUserAnnouncements } from "@/schemas/announcement.schema";
import { useRouter } from "next/router";

interface ICardProps {
  children: ReactNode;
  announcement: iAnnouncement
  userAnnouncement: iUserAnnouncements
}

const Card = ({ children, announcement, userAnnouncement }: any) => {
  const router = useRouter();

  return (
    <li className="px-4 py-8 flex flex-col gap-6 text-grey-1 min-w-[100%] md:min-w-[50%] 
    lg:min-w-[33%] xl:min-w-[25%] w-[100%] md:w-[50%] lg:w-[33%] xl:w-[25%] relative cursor-pointer"
    onClick={()=>{
      router.push(`/announcement/${announcement.id}`)
    }}>

      <div>
        <Image className="w-full h-full" src={car} alt="carro" />
      </div>
      <h3 className="w-full whitespace-nowrap font-bold truncate">
        {`${announcement?.brand} - ${announcement?.model}`}
      </h3>
      <p className="w-full line-clamp-2">
        {announcement?.description}
      </p>
      <Profile name={userAnnouncement?.name} />
      <div className=" flex justify-between font-bold">
        <div>
          <span className="bg-brand-4 text-brand-2 mr-4 p-2 rounded">{`${announcement?.mileage}KM`}</span>
          <span className="bg-brand-4 text-brand-2 p-2 rounded">{announcement?.year}</span>
        </div>
        <p className="truncate">{`R$ ${new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(announcement?.price)}`}</p>
      </div>
      {children}
    </li>
  );
};

export default Card;
