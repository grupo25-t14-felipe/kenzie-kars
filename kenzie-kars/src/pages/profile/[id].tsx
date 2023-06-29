import Card from "@/components/card";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Inter } from "next/font/google";
import { GetServerSideProps } from "next";
import api from "@/services/api";
import { iAnnouncement, iUserAnnouncements } from "@/schemas/announcement.schema";
import { useAuth } from "@/contexts/authContext";
const inter = Inter({ subsets: ["latin"] });
import jwt_decode from "jwt-decode";
import { useState } from "react";
import RegisterAnnouncement, { getBrands } from "@/components/registerAnnouncement";
import CreatedAnnouncement from "@/components/createdAnnouncement";
import UpdateAnnouncement from "@/components/updateAnnouncemente";

interface ProfileProps {
  userAnnouncements: iUserAnnouncements;
}

export default function Profile({ userAnnouncements }: ProfileProps) {
  const { router, token, showModal, setModal } = useAuth();
  const [createAd, setCreateAd] = useState(false)
  const [brands, setBrands] = useState<string[]>()
  const [Announcemets, setAnnouncemets] = useState(userAnnouncements.announcement)
 
  const [updateAnnouncementModal, setUpdateAnnouncementModal] = useState(false)
  const [announcement, setAnnouncement] = useState<Omit<iAnnouncement, 'user'> | null>(null)
  
  const requestBrands = async () => {
    const brands = await getBrands()
    setBrands(brands)
    setCreateAd(true)
  }

  const editAnnouncement = (announcement: Omit<iAnnouncement, 'user'>) => {
    setAnnouncement( announcement )
    setUpdateAnnouncementModal(true)
  }
 
  return (
    <>
      {createAd && <RegisterAnnouncement setCreateAd={setCreateAd} brands={brands} setAnnouncements={setAnnouncemets}/>}
      {updateAnnouncementModal && 
        <UpdateAnnouncement 
          announcement={announcement} 
          setAnnouncement={setAnnouncement} 
          setUpdateAnnouncementModal={setUpdateAnnouncementModal}
        />
      }
      <Header />
      <main
        className={`flex min-h-screen relative ${inter.className} gap-20 pt-[75px] bg-grey-8 body-1-400 z-10`}>
        <span className="absolute top-0 left-0 bg-brand-1 w-full h-[357px] z-20"></span>
        <div className="px-4 py-20 flex flex-col gap-8 w-full items-center">
          <div className=" w-full bg-whiteFixed flex flex-col gap-8 p-8 rounded md:max-w-[70%] z-30">
            <span className="bg-brand-1 w-[77px] h-[77px] rounded-full text-grey-10 text-center">
              <p className="relative top-4 heading-3-500">
                {userAnnouncements.name.split(" ").map((letter: string) => letter.charAt(0))}
              </p>
            </span>
            <div className="flex items-center gap-4">
              <h3 className="heading-6-600 ">{userAnnouncements.name}</h3>
              <p className="bg-brand-4 text-brand-2 mr-4 p-2 rounded font-semibold">anunciante</p>
            </div>
            <p className="text-grey-2">{userAnnouncements.description}</p>
            {token && jwt_decode<any>(token).sub == userAnnouncements.id ? (
              <button className="medium-outline-brand-1 max-w-max" onClick={() => {requestBrands()}}>Criar anuncio</button>
            ) : null}
          </div>
          <h3 className="heading-5-600 text-left w-full pl-[8%]">Anúncios</h3>
          <ul className="w-full md:w-[80%] flex overflow-auto md:flex-wrap relative h-full">
            {Announcemets.map((announcement) => (
              <Card
                key={announcement.id}
                announcement={announcement}
                userAnnouncement={userAnnouncements}
                onClickHabilit={false}
              >
                {token && jwt_decode<any>(token).sub == userAnnouncements.id ? (
                  <div className="flex gap-4">
                    <button className="small-outline-1 max-w-max" onClick={() => {
                      editAnnouncement(announcement)}
                    }>
                      Editar
                    </button>
                    <button className="small-outline-1 max-w-max truncate">Ver detalhes</button>
                  </div>
                ) : (
                  <span
                    className={`absolute top-10 left-6 text-grey-10 ${
                      announcement.published ? "bg-brand-1" : "bg-grey-4"
                    } py-[2px] px-2 body-2-500`}>
                    {announcement.published ? "Ativo" : "Inativo"}
                  </span>
                )}
              </Card>
            ))}
          </ul>
          <div className="w-full font-semibold flex flex-col items-center gap-4">
            <p className="text-grey-3">
              <span className="text-grey-2">1</span> de 2
            </p>
            <p className="text-brand-1 cursor-pointer">{"Seguinte >"}</p>
          </div>
        </div>
        <CreatedAnnouncement isVisible={showModal} onClose={() => setModal(false)} />
      </main>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = context.params?.id;
  const response = await api.get<iUserAnnouncements>(`/users/${userId}`);
  
  return {
    props: { userAnnouncements: response.data }
  };
};
