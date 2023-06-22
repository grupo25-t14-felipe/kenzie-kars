import { UpdateeAnnouncementSchema, iAnnouncement, iUpdateAnnouncementRequest } from "@/schemas/announcement.schema";
import api from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

interface iUpdateAnnouncement {
  announcement: Omit<iAnnouncement, 'user'> | null
  setAnnouncement: Dispatch<SetStateAction<Omit<iAnnouncement, 'user'> | null>>
  setUpdateAnnouncementModal: Dispatch<SetStateAction<boolean>>
}

const UpdateAnnouncement = ({ announcement, setAnnouncement, setUpdateAnnouncementModal }: iUpdateAnnouncement) => {
  const { register, handleSubmit, reset, formState:{ errors }, setValue } = useForm<iUpdateAnnouncementRequest>({
    mode: 'onSubmit',
    resolver: zodResolver( UpdateeAnnouncementSchema )
  })

  const updateAnnouncement = async ( { mileage, color, price, description, cover_image }: iUpdateAnnouncementRequest ) => {
    const updatedData = { ...announcement, ...{
      mileage: Number(mileage) || Number(announcement?.mileage),
      color: color || announcement?.color,
      price: price || announcement?.price,
      description: description || announcement?.description,
      cover_image: cover_image || announcement?.cover_image,
    }}
    
    await api.patch( `/announcements/${announcement?.id}`, updatedData)
      .then( res => res)
      .catch( err => err)
  }

  const deleteAnnouncement = async () => {
    await api.delete( `/announcements/${announcement?.id}`)
    setUpdateAnnouncementModal(false)
  }

  return(
    <div className="w-screen h-screen p-2 bg-grey-0/25 flex content-center fixed z-[21] top-0">
      <div className="min-w-[300px] max-w-[400px] p-2 m-auto bg-whiteFixed rounded-[4px]">
        <div className="mb-4 flex flex-row justify-between items-center">
          <h3 className="heading-6-500">Editar anúncio</h3>
          <button onClick={() => { reset(); setUpdateAnnouncementModal(false) }} className="medium-negative">X</button>
        </div>
        <form 
          className="max-h-[87vh] p-2 flex flex-col box-border overflow-y-scroll scroll-auto"
          onSubmit={handleSubmit( updateAnnouncement )}
        >
          <h3 className="body-2-500 mb-2">Informações do veículo</h3>
          
          <label htmlFor="brand" className="input-label">Marca</label>
          <input 
            type="text" 
            id="brand" 
            className="input-text w-full cursor-not-allowed" 
            placeholder={ announcement?.brand }
            value={ announcement?.brand }
            disabled
          />

          <label htmlFor="model" className="input-label">Modelo</label>
          <input 
            type="text" 
            id="model" 
            className="input-text w-full cursor-not-allowed" 
            placeholder={ announcement?.model }
            value={ announcement?.model }
            disabled
          />

          <div className="flex flex-row gap-2.5 mb-4">
            <div className="w-1/2">
              <label htmlFor="year" className="input-label">Ano</label>
              <input 
                type="text" 
                id="year" 
                className="input-text w-full cursor-not-allowed" 
                placeholder={ announcement?.year }
                value={ announcement?.year }
                disabled 
              />
            </div>

            <div className="w-1/2">
              <label htmlFor="fuel" className="input-label">Combustível</label>
              <input 
                type="text" 
                id="fuel" 
                className="input-text w-full cursor-not-allowed" 
                placeholder={ announcement?.fuel }
                value={ announcement?.fuel }
                disabled 
              />
              <span></span>
            </div>
          </div>
          
          <div className="flex flex-row gap-2.5">
            <div className="w-1/2">
              <label htmlFor="mileage" className="input-label">Quilometragem</label>
              <input 
                type="text" 
                id="mileage" 
                className="input-text w-full"
                placeholder={ announcement?.mileage }
                {...register('mileage')}
                required={false}
              />
            </div>

            <div className="w-1/2">
              <label htmlFor="color" className="input-label">Cor</label>
              <input 
                type="text" 
                id="color" 
                className="input-text w-full" 
                placeholder={ announcement?.color }
                {...register('color')} 
                required={false} 
              />
            </div>
          </div>
          
          <div className="flex flex-row gap-2.5">
            <div className="w-1/2">
              <label htmlFor="price_table_fipe" className="input-label">Preço tablela FIPE</label>
              <input 
                type="text" 
                id="price_table_fipe" 
                className="input-text w-full cursor-not-allowed" 
                placeholder={ announcement?.price_table_fipe }
                value={ announcement?.price_table_fipe }
                disabled
              />
            </div>

            <div className="w-1/2">
              <label htmlFor="price" className="input-label">Preço</label>
              <input 
                type="text" 
                id="price" 
                className="input-text w-full" 
                placeholder={ announcement?.price }
                {...register('price')} 
                required={false}
              />
            </div>
          </div>
          
          <label htmlFor="description" className="input-label">Description</label>
          <input 
            type="text" 
            id="description" 
            className="input-text" 
            placeholder={ announcement?.description }
            {...register('description')} 
            required={false}
          />
          
          <label htmlFor="cover-image" className="input-label">Imagem da capa</label>
          <input 
            type="text" 
            id="cover-image" 
            className="input-text" 
            placeholder={ announcement?.cover_image }
            {...register('cover_image')} 
            required={false}
          />

          <div className="flex row gap-[10px]">
            <div className="flex row gap-[10px]">
              <button 
                type="button" 
                className="medium-negative" 
                onClick={() => { 
                  reset()
                  setUpdateAnnouncementModal(false)
                }}
              >
                Cancelar
              </button>
              <button 
                type="button" 
                className="medium-alert"
                onClick={ () => { deleteAnnouncement()}}
              >
                Exluir anúncio
              </button>
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

export default UpdateAnnouncement;
