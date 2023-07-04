import Image from "next/image";
import logo from "../assets/Logo.png";
import Link from "next/link";
import { BiMenu } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/authContext";
import ProfileIcon from "./profileIcon";
import jwt_decode from "jwt-decode";
import { destroyCookie } from "nookies";
import { iUserResponse } from "@/schemas/user.schema";
import EditProfile from "./editProfile";
import api from "@/services/api";
import UpdateAddress from "./updateAddress";
import { AddressResponseSchema, iAddressResponse } from "@/schemas/address.schema";

const Header = () => {
  const { router, token, setToken, username} = useAuth();
  const [menu, setMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [userData, setUserData] = useState<Omit<iUserResponse, "announcement"> | null>(null);
  const [updateAddressModal, setUpdateAddressModal] = useState(false)
  const [updateAddressButton, setUpdateAddressButton] = useState(true)
  const [address, setAddress] = useState<iAddressResponse | null>(null);

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
    <header className="fixed w-full top-0 left-0 shadow-sm bg-whiteFixed z-20">
      {
        editProfileModal && 
        <EditProfile
          setEditProfileModal={setEditProfileModal} 
          userData={userData} 
          setUserData={setUserData} 
        />
      }
      { updateAddressModal && 
        <UpdateAddress 
          setUpdateAddressModal={setUpdateAddressModal} 
          address={address} 
          setAddress={setAddress}
        /> 
      }
      <div
        className={`w-full flex ${
          windowWidth < 768 && menu ? "flex-col" : "flex-row items-center"
        } justify-between  px-6 mx-auto`}>
        <div className="py-6">
          <Image
            className=" cursor-pointer"
            width={153}
            height={27}
            src={logo}
            alt="logo motors shop"
            onClick={() => {
              router.push(`/`);
            }}
          />
        </div>

        {windowWidth < 768 ? (
          menu ? (
            <>
              <GrFormClose
                className="w-6 h-6 absolute right-6 top-6 cursor-pointer"
                onClick={() => {
                  setMenu(false);
                }}
              />
              <nav className=" w-full flex flex-col gap-8 font-semibold py-6">
                {token ? (
                  <>
                    {updateAddressButton && <p 
                      className="cursor-pointer"
                      onClick={async () => {
                        const id = window.localStorage.getItem( '@kenzie-kars-userId' )
                        return await api.get( `/users/${id}`).then( res => {
                          if( !res.data.address ){
                            setAddress( null )
                            setUpdateAddressButton( false )

                            return
                          }

                          const data = AddressResponseSchema.parse( res.data.address );

                          setAddress( data )
                          setUpdateAddressModal(true)

                          return
                        }).catch( err => err)
                      }}
                    >
                      Editar Perfil
                    </p>}
                    <p 
                      className="cursor-pointer"
                      id="editAddress"
                      onClick={async () => {
                        const id = window.localStorage.getItem( '@kenzie-kars-userId' )
                        return await api.get( `/users/${id}`).then( res => {
                          const data = AddressResponseSchema.nullable().parse( res.data.address );

                          setAddress( data )
                          setUpdateAddressModal(true)

                          return
                        }).catch( err => {
                          setAddress( null )

                          return
                        })
                      }}
                    >
                      Editar endereço
                    </p>
                    {!jwt_decode<any>(token).buyer && (
                      <Link
                        className="whitespace-nowrap"
                        href={`/profile/${jwt_decode<any>(token).sub}`}>
                        Meus Anúncios
                      </Link>
                    )}
                    <p
                      className="cursor-pointer"
                      onClick={() => {
                        destroyCookie(null, "projetofinal.token")
                        setToken(false)
                        router.push("/login")
                      }}>
                      Sair
                    </p>
                  </>
                ) : (
                  <>
                    <Link className="whitespace-nowrap" href={"/login"}>
                      Fazer login
                    </Link>

                    <Link className="big-outline-2" href={"/register"}>
                      Cadastrar
                    </Link>
                  </>
                )}
              </nav>
            </>
          ) : (
            <BiMenu
              className="w-6 h-6 absolute right-6 top-6 cursor-pointer"
              onClick={() => {
                setMenu(true);
              }}
            />
          )
        ) : (
          <nav className=" w-80 flex justify-around items-center h-20 border-l border-grey-4 relative">
            {token ? (
              <ProfileIcon
                name={username}
                onClick={() => {
                  setMenu(!menu);
                }}
              />
            ) : (
              <>
                <Link className="whitespace-nowrap" href={"/login"}>
                  Fazer login
                </Link>

                <Link className="big-outline-2" href={"/register"}>
                  Cadastrar
                </Link>
              </>
            )}
            {token && menu && (
              <>
                <div className="w-[60%] bg-whiteFixed rounded absolute top-16 shadow-lg flex flex-col gap-6 p-6">
                  <p 
                    className="cursor-pointer"
                    onClick={ async () => {
                      if( !userData ){
                        const id = window.localStorage.getItem('@kenzie-kars-userId')
                        await api.get(`/users/${id}`).then( res => {
                          const { announcement, ...data } = res.data
                          setUserData( data )
                        }).catch( err => {console.log( 'erro na requisição: ', err) })
                      }
                      setEditProfileModal(true)
                    }}
                  >
                    Editar Perfil
                  </p>
                  {updateAddressButton && <p 
                    className="cursor-pointer"
                    id="editAddress"
                    onClick={async () => {
                        const id = window.localStorage.getItem( '@kenzie-kars-userId' )
                        return await api.get( `/users/${id}`).then( res => {
                          if( !res.data.address ){
                            setAddress( null )
                            setUpdateAddressButton( false )

                            return
                          }

                          const data = AddressResponseSchema.parse( res.data.address );

                          setAddress( data )
                          setUpdateAddressModal(true)

                          return
                        }).catch( err => err)
                      }}
                  >
                    Editar endereço
                  </p>}
                  {!jwt_decode<any>(token).buyer && (
                    <Link
                      className="whitespace-nowrap"
                      href={`/profile/${jwt_decode<any>(token).sub}`}>
                      Meus Anúncios
                    </Link>
                  )}
                  <p
                    className="cursor-pointer"
                    onClick={() => {
                      destroyCookie(null, "projetofinal.token")
                      setToken(false)
                      router.push("/login")
                    }}>
                    Sair
                  </p>
                </div>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
