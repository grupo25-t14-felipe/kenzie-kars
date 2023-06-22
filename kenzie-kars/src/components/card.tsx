import Profile from "./profileIcon";
import { ReactNode, useEffect, useState } from "react";
import { iAnnouncement, iUserAnnouncements } from "@/schemas/announcement.schema";
import { useRouter } from "next/router";

interface ICardProps {
  children: ReactNode;
  announcement: iAnnouncement
  userAnnouncement: iUserAnnouncements
  onClickHabilit: boolean
}

const Card = ({ children, announcement, userAnnouncement, onClickHabilit }: any) => {
  const router = useRouter();
  const [validImg, setValidImg] = useState(true)

  useEffect(() => {
    const img = new Image();
    img.src = announcement?.cover_image;

    img.onerror = ()=>{
      setValidImg(false)
    }
 
  }, []);
  
  return (
    <li className="px-4 py-8 flex flex-col gap-6 text-grey-1 min-w-[100%] md:min-w-[50%] 
    lg:min-w-[33%] xl:min-w-[25%] w-[100%] md:w-[50%] lg:w-[33%] xl:w-[25%] relative cursor-pointer"
    onClick={()=>{
      if( onClickHabilit ){
        router.push(`/announcement/${announcement?.id}`)
      }
    }}>
      <div className="w-full h-[400px] md:h-[150px] flex justify-center items-center">
        {validImg ? <img className="w-full h-full" src={announcement?.cover_image} alt="carro"  />:
        <img src="https://i.imgur.com/bMsj7YJ.png" className="w-full h-full"/>}
      </div>
      <h3 className="w-full whitespace-nowrap font-bold truncate">
        {`${announcement?.brand} - ${announcement?.model}`}
      </h3>
      <p className="w-full line-clamp-2">
        {announcement?.description}
      </p>
      <Profile name={userAnnouncement?.name} />
      <div className=" flex justify-between font-bold items-center">
        <div className="flex">
          <p className="bg-brand-4 text-brand-2 mr-4 p-2 rounded max-w-[40%] truncate">{`${announcement?.mileage}KM`}</p>
          <p className="bg-brand-4 text-brand-2 p-2 rounded max-w-[40%] truncate">{announcement?.year}</p>
        </div>
        <p className="max-w-[40%] truncate">{`R$ ${new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(announcement?.price)}`}</p>
      </div>
      {children}
    </li>
  );
};

export default Card;
