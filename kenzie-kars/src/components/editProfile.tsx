import { iUserResponse, iUserUpdate, userUpdateSchema } from "@/schemas/user.schema";
import api from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

/* O QUE PRECISA PARA ABRIR O COMPONENTE

const [editProfileModal, setEditProfileModal] = useState(false);
const [userData, setUserData] = useState<Omit<iUserResponse, "announcement"> | null>(null);

{
  editProfileModal && 
  <EditProfile 
    setEditProfileModal={setEditProfileModal} 
    userData={userData} 
    setUserData={setUserData} 
  />
}

<button 
  type="button" 
  className="big-brand-1" 
  onClick={async () => {
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
  edit profile
</button>

+-------------------- */

interface iEditProfile {
  setEditProfileModal: Dispatch<SetStateAction<boolean>>
  userData: Omit<iUserResponse, "announcement"> | null
  setUserData: Dispatch<SetStateAction<Omit<iUserResponse, "announcement"> | null>>
}

const EditProfile = ({ setEditProfileModal, userData, setUserData  }: iEditProfile) => {
  const router = useRouter();
  const { register, handleSubmit, formState:{ errors }, reset } = useForm({
    mode: "onSubmit",
    resolver: zodResolver( userUpdateSchema )
  });

  const updateProfile = async ( { name, cpf, date_of_birth, description, email, telephone }: iUserUpdate ) => {
    const dataUpdated: iUserUpdate = {
      name: name || userData?.name, 
      cpf: cpf || userData?.cpf, 
      date_of_birth: date_of_birth || userData?.date_of_birth, 
      description: description || userData?.description, 
      email: email || userData?.email,
      telephone: telephone || userData?.telephone
    }

    await api.patch(`/users/${userData?.id}`, dataUpdated).then( res => {
      setUserData({ ...userData, ...res.data })
    })

    reset()
    setEditProfileModal(false)
  }

  const deleteAccount = async () => {
    await api.delete(`/users/${userData?.id}`)
    setEditProfileModal(false)
    window.localStorage.removeItem('@kenzie-kars-userId')
    router.push("");
  }

  return(
    <div className="w-screen h-screen p-2 bg-grey-0/25 flex content-center fixed z-[21] top-0">
      <div className="min-w-[300px] max-w-[400px] p-2 m-auto bg-whiteFixed rounded-[4px]">
        <div className="mb-4 flex flex-row justify-between items-center">
          <h3 className="heading-6-500">Informações pessoais</h3>
          <button onClick={() => { reset(); setEditProfileModal(false) }} className="medium-negative">X</button>
        </div>
        <form 
          className="max-h-[87vh] p-2 flex flex-col box-border overflow-y-scroll scroll-auto"
          onSubmit={handleSubmit( updateProfile )}
        >
          <h3 className="body-2-500 mb-2">Informações do veículo</h3>
          
          <label htmlFor="name" className="input-label">Nome</label>
          <input 
            type="text" 
            id="name" 
            className="input-text w-full" 
            placeholder={ userData?.name }
            {...register( "name" )}
            required={false}
          />

          <label htmlFor="email" className="input-label">Email</label>
          <input 
            type="text" 
            id="email" 
            className="input-text w-full" 
            placeholder={ userData?.email }
            {...register( "email" )}
          />

          <label htmlFor="cpf" className="input-label">CPF</label>
          <input 
            type="text" 
            id="cpf" 
            className="input-text w-full" 
            placeholder={ userData?.cpf }
            {...register( "cpf" )}
          />

          <label htmlFor="telephone" className="input-label">Celular</label>
          <input 
            type="text" 
            id="telephone" 
            className="input-text w-full" 
            placeholder={ userData?.telephone }
            {...register( "telephone" )}
          />

          <label htmlFor="date_of_birth" className="input-label">Data de nascimento</label>
          <input 
            type="text" 
            id="date_of_birth" 
            className="input-text w-full" 
            placeholder={ userData?.date_of_birth }
            {...register( "date_of_birth" )}
          />

          <label htmlFor="description" className="input-label">Descrição</label>
          <input 
            type="text" 
            id="description" 
            className="input-text w-full" 
            placeholder={ userData?.description }
            {...register( "description" )}
          />
          <div className="flex row gap-[10px]">
            <div className="flex row gap-[10px]">
              <button 
                type="button" 
                className="medium-negative" 
                onClick={() => { 
                  reset()
                  setEditProfileModal(false)
                }}
              >
                Cancelar
              </button>
              <button 
                type="button" 
                className="medium-alert"
                onClick={ () => { deleteAccount()}}
              >Exluir Perfil</button>
            </div>
            <button type="submit" className="medium-brand-1">
              Salvar alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProfile;
