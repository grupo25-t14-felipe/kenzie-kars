import Card from "@/components/card";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Inter } from "next/font/google";
import { GetServerSideProps } from "next";
import api from "@/services/api";
import { iUserAnnouncements } from "@/schemas/announcement.schema";
const inter = Inter({ subsets: ["latin"] });

interface ProfileProps {
  userAnnouncements: iUserAnnouncements;
}

export default function Profile({ userAnnouncements }: ProfileProps) {
  return (
    <>
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
          </div>
          <h3 className="heading-5-600 text-left w-full pl-[8%]">Anúncios</h3>
          <ul className="w-full md:w-[80%] flex overflow-auto md:flex-wrap relative h-full">
            {userAnnouncements.announcement.map((announcement) => (
              <Card
                key={announcement.id}
                announcement={announcement}
                userAnnouncement={userAnnouncements}>
                <span
                  className={`absolute top-10 left-6 text-grey-10 ${
                    announcement.published ? "bg-brand-1" : "bg-grey-4"
                  } py-[2px] px-2 body-2-500`}>
                  {announcement.published ? "Ativo" : "Inativo"}
                </span>
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
