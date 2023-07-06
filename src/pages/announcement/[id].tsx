import Footer from "@/components/footer";
import Header from "@/components/header";
import { Inter } from "next/font/google";
import ProfileIcon from "@/components/profileIcon";
import { GetServerSideProps } from "next";
import api from "@/services/api";
import { iAnnouncement, iComment } from "@/schemas/announcement.schema";
import { useAuth } from "@/contexts/authContext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
const inter = Inter({ subsets: ["latin"] });

interface ProfileProps {
  announcement: iAnnouncement;
}

export default function Announcement({ announcement }: ProfileProps) {
  const { router, username, token } = useAuth();
  const [validImg, setValidImg] = useState(true);
  const [comments, setComments] = useState(announcement.comment);

  useEffect(() => {
    const img = new Image();
    img.src = announcement?.cover_image;

    img.onerror = () => {
      setValidImg(false);
    };
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({});

  const commentSubmit = async (data: any, id: string) => {
    return api
      .post(`/comments/announcements/${id}/users/`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(async (res) => {
        const comment = await api.get<iAnnouncement>(`/announcements/${announcement.id}`);
        setComments(comment.data.comment);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function MinutesPassed(created: Date): string {
    const currentTime: any = new Date();
    const createdTime: any = new Date(created);
    const timeDifference = currentTime - createdTime;
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    return days > 0 ? `há ${days} dias` : hours > 0 ? `há ${hours} horas` : `há ${minutes} minutos`;
  }

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
                <div className="min-h-[350px] h-[350px] bg-whiteFixed rounded overflow-hidden w-full max-w-[650px]">
                  {validImg ? (
                    <img className="w-full h-full" src={announcement?.cover_image} alt="carro" />
                  ) : (
                    <img src="https://i.imgur.com/bMsj7YJ.png" className="w-full h-full" />
                  )}
                </div>
              </div>
              <div className="p-4 flex flex-col gap-8 relative bottom-12 md:bottom-[180px] w-full md:max-w-[685px] md:mx-auto">
                <div className="flex flex-col gap-8 font-semibold bg-whiteFixed rounded p-8">
                  <h3 className="heading-6-600">
                    {`${announcement?.brand} - ${announcement?.model}`}
                  </h3>
                  <div>
                    <span className="bg-brand-4 text-brand-2 mr-4 p-2 rounded">{`${announcement?.mileage}KM`}</span>
                    <span className="bg-brand-4 text-brand-2 p-2 rounded">
                      {announcement?.year}
                    </span>
                  </div>
                  <p>{`R$ ${new Intl.NumberFormat("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }).format(Number(announcement?.price))}`}</p>
                  {token && <button className="small-brand-1 max-w-max" onClick={(()=>{
                    window.location.href = `https://api.whatsapp.com/send?phone=${announcement.user.telephone}`
                  })}>Comprar</button>}
                </div>

                <div className="flex flex-col gap-8 bg-whiteFixed rounded p-8 ">
                  <h3 className="heading-6-600 ">Descrição</h3>
                  <p className="text-grey-2">{announcement?.description}</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-[40%] relative">
              <div className="p-4 flex flex-col gap-8 relative bottom-12 md:bottom-[-50px] ">
                <ul className="flex flex-wrap bg-whiteFixed px-8  pt-20 pb-10 w-full justify-items-center relative gap-4 rounded md:max-w-[440px]">
                  <h3 className="absolute top-8 left-8 heading-6-600 ">Fotos</h3>
                  {announcement.image && announcement.image.length > 0
                    ? announcement.image.map((image) => (
                        <li key={image.id} className=" rounded overflow-hidden w-[30%] h-[90px] ">
                          <img
                            className="w-full h-full object-cover"
                            src={image.link}
                            alt="carro"
                          />
                        </li>
                      ))
                    : null}
                </ul>
                <div className="flex flex-col gap-8 bg-whiteFixed rounded p-8 items-center md:max-w-[440px]">
                  <div className="flex flex-col items-center gap-4 ">
                    <span className="bg-brand-1 w-[77px] h-[77px] rounded-full text-grey-10 text-center">
                      <p className="relative top-4 heading-3-500">
                        {announcement.user.name
                          .split(" ")
                          .map((letter: string) => letter.charAt(0))}
                      </p>
                    </span>
                    <h3 className="heading-6-600 ">{announcement.user.name}</h3>
                  </div>
                  <p className="text-grey-2">{announcement.user.description}</p>
                  <button
                    className="medium-grey-1 w-10/12"
                    onClick={() => {
                      router.push(`/profile/${announcement.user.id}`);
                    }}>
                    Ver todos anuncios
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[60%]">
            <div className="p-4 flex flex-col gap-8 relative bottom-12 md:bottom-[160px] md:max-w-[685px] mx-auto">
              <div className="flex flex-col gap-8 bg-whiteFixed rounded p-8">
                <h3 className=" heading-6-600 ">Comentários</h3>
                <ul className="flex flex-col gap-8">
                  {comments.length > 0
                    ? comments.map((comment) => (
                        <li key={comment.id} className="flex flex-col gap-4">
                          <div className="flex items-center gap-4">
                            <ProfileIcon name={comment.user.name} />
                            <p className="text-grey-4 text-[12px]">
                              {MinutesPassed(comment.createdAt)}
                            </p>
                          </div>
                          <p className="text-grey-2">{comment.description}</p>
                        </li>
                      ))
                    : null}
                </ul>
              </div>
              {token && (
                <div className="flex flex-col gap-8 bg-whiteFixed rounded p-8 ">
                  <ProfileIcon name={username} />
                  <form
                    onSubmit={handleSubmit((data) => {
                      commentSubmit(data, announcement.id);
                    })}
                    className="flex flex-col gap-8">
                    <textarea
                      className="border border-grey-5 h-[130px] p-4 resize-none rounded"
                      placeholder="Carro muito confortável, foi uma ótima experiência de compra..."
                      {...register("description")}
                      required
                    />
                    <button type="submit" className="small-brand-1 max-w-max ">
                      Comentar
                    </button>
                  </form>
                  <div className="flex flex-wrap gap-4">
                    <span
                      onClick={() => {
                        setValue("description", "Gostei muito!");
                      }}
                      className="bg-grey-7 text-grey-4 max-w-max py-1 px-4 rounded-2xl text-[12px] font-semibold cursor-pointer">
                      Gostei muito!
                    </span>
                    <span
                      onClick={() => {
                        setValue("description", "Incrível!");
                      }}
                      className="bg-grey-7 text-grey-4 max-w-max py-1 px-4 rounded-2xl text-[12px] font-semibold cursor-pointer">
                      Incrível
                    </span>
                    <span
                      onClick={() => {
                        setValue("description", "Recomendarei para meus amigos!");
                      }}
                      className="bg-grey-7 text-grey-4 max-w-max py-1 px-4 rounded-2xl text-[12px] font-semibold cursor-pointer">
                      Recomendarei para meus amigos!
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const announcementId = context.params?.id;
  const response = await api.get<iAnnouncement>(`/announcements/${announcementId}`);
  return {
    props: { announcement: response.data }
  };
};
