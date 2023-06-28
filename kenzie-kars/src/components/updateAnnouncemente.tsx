import { UpdateeAnnouncementSchema, iAnnouncement, iUpdateAnnouncementRequest } from "@/schemas/announcement.schema";
import api from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import trash from '../assets/trash.png';

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
  const [images, setImages] = useState<{id: string, link: string}[] | null>(null)
  const [isPublished, setIsPublished] = useState(true);

  useEffect(() => {
    if( announcement?.image !== undefined ){      
      setImages( announcement.image )
    }
  }, [announcement])

  const addFormImage = () => {
    if( !images ){
      setImages([ {
        id: `id-0`,
        link: '',
      } ])

      return
    }

    setImages([ ...images, {
      id: `id-${images.length}`,
      link: '',
    } ])
    
    return
  }

  const updateAnnouncement = async ( { mileage, image, ...data}: iUpdateAnnouncementRequest ) => {
    const updateData = { ...data, mileage: Number(mileage), published: isPublished};
    
    await api.patch( `/announcements/${announcement?.id}`, updateData)
    
    if( image ){
      await image.forEach( async ({ id, link }) => {
        id?.startsWith( 'id-' ) ?
          await api.post( `/image/announcement/${announcement?.id}`, { link: link }).then( res => {
            console.log(res);
          }).catch( err => {
            console.error(err);
          })
        :
          await api.patch( `/image/${id}`, { link: link })
      })
    }

    setUpdateAnnouncementModal(false)

    return
  }

  const deleteImage = async ( id: string ) => {
    return await api.delete( `/announcements/${announcement?.id}/image/${id}` ).then( res => {
      if( images && images.length < 2 ) {
        setImages( null )
        return 
      }
  
      const newImages: any = images!.map( data => {
        if( data.id !== id ) return data
      })
  
      setImages(newImages)
      return
    }).catch( err => err )
  }

  const deleteAnnouncement = async () => {
    await api.delete( `/announcements/${announcement?.id}`)
    setUpdateAnnouncementModal(false)
  }

  return(
    <div className="w-screen h-screen p-2 bg-grey-0/25 flex content-center fixed z-[21] top-0 cursor-default">
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
                defaultValue={ announcement?.mileage }
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
                defaultValue={ announcement?.color }
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
                defaultValue={ announcement?.price }
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
            defaultValue={ announcement?.description }
            {...register('description')} 
            required={false}
          />

          <label htmlFor="published" className="input-label">Publicado</label>
          <div className="w-full flex row gap-[10px]">
            <input 
              type="button" 
              id="published-0"
              className="w-1/2 big-brand-1 cursor-pointer" 
              onClick={(event) => {
                const button0 = document.getElementById('published-0')
                button0?.classList.remove('big-outline-2')
                button0?.classList.add('big-brand-1')
                
                const button1 = document.getElementById('published-1')
                button1?.classList.remove('big-brand-1')
                button1?.classList.add('big-outline-2')
                setIsPublished(true)
              }}
              value={"Sim"}
              required={false}
              />
            <input 
              type="button" 
              id="published"
              className="w-1/2 big-outline-2 cursor-pointer"
              onClick={(event) => {
                const button0 = document.getElementById('published-0')
                button0?.classList.remove('big-brand-1')
                button0?.classList.add('big-outline-2')
                
                const button1 = document.getElementById('published-1')
                button1?.classList.remove('big-outline-2')
                button1?.classList.add('big-brand-1')
                setIsPublished(false)
              }}
              value={"Não"}
              required={false}
              />
          </div>
          
          <label htmlFor="cover-image" className="input-label">Imagem da capa</label>
          <input 
            type="text" 
            id="cover-image" 
            className="input-text" 
            defaultValue={ announcement?.cover_image }
            {...register('cover_image')} 
            required={false}
          />

          { images ? images.map(({ id, link }, index) => {
            return(
              <React.Fragment key={id}>
                <label htmlFor={id} className="input-label">{index+1}º Imagem da galeria</label>
                <div className="flex justify-between">
                  <input 
                    type="text" 
                    id={id} 
                    className="w-[-moz-available] input-text mb-2 text-ellipsis" 
                    defaultValue={link}
                    {...register(`image.${index}.id`, { value: id })}
                    {...register(`image.${index}.link`)}
                  />
                  <button className="mb-[21px]" onClick={() => deleteImage(id)}>
                    <img className="w-4/5 p-[8px] m-auto" src={trash.src} alt="Remover imagem" />
                  </button>
                </div>
              </React.Fragment>
            )
          }) : <></> }

          <button type="button" onClick={ addFormImage } className="medium-brand-opacity mb-5">
            Adicionar campo para imagens da galeria
          </button>

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
