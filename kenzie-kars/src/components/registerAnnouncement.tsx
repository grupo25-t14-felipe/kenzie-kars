import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

interface iModel {
  id: string
  name: string
  brand: string
  year: string
  fuel: number
  value: number
}

interface iRegisterAnnouncement {
  setCreateAd: React.Dispatch<React.SetStateAction<boolean>>,
  brands: string[] | undefined
}

interface iImageGalery {
  imageId: string
  title: string
}

const CreateImageSchema = z.object({
  link: z.string({ required_error: 'Este campo é obrigatório' })
})

const CreateAnnouncementSchema = z.object({
  brand: z.string({ required_error: 'Este campo é obrigatório' }),
  model: z.string({ required_error: 'Este campo é obrigatório' }),
  year: z.string({ required_error: 'Este campo é obrigatório' }),
  fuel: z.string({ required_error: 'Este campo é obrigatório' }),
  mileage: z.string({ required_error: 'Este campo é obrigatório' }),
  color: z.string({ required_error: 'Este campo é obrigatório' }),
  price_table_fipe: z.string({ required_error: 'Este campo é obrigatório' }), 
  price: z.string({ required_error: 'Este campo é obrigatório' }),
  description: z.string({ required_error: 'Este campo é obrigatório' }),
  cover_image: z.string({ required_error: 'Este campo é obrigatório' }),
  published: z.boolean({ required_error: 'Este campo é obrigatório' }).default(()=> true ),
  images: z.array( CreateImageSchema ).optional()
})

export const getBrands = async () => {
  return axios.get('https://kenzie-kars.herokuapp.com/cars').then( res => Object.keys(res.data)).catch( err => err )
}

export const getModels = async ( brand: string ) => {
  return axios.get(`https://kenzie-kars.herokuapp.com/cars?brand=${brand}`).then( res => res.data).catch( err => err )
}

const RegisterAnnouncement = ({ setCreateAd, brands }: iRegisterAnnouncement) => {
  const { register, handleSubmit, reset, formState:{ errors }, setValue } = useForm({
    mode: 'onSubmit',
    resolver: zodResolver( CreateAnnouncementSchema )
  })
  
  const [formImages, setFormImages] = useState<iImageGalery[]>([])
  const [searchBrand, setSearchBrand] = useState<string>('')
  const [searchModel, setSearchModel] = useState<string>('')
  const [allModels, setAllModels] = useState<iModel[]>([])
  const [models, setModels] = useState<string[]>([])
  const [year, setYear] = useState<string>('')
  const [fuel, setFuel] = useState<string>('')
  const [fipe, setFipe] = useState<string>('')

  const addFormImage = () => {
    setFormImages([ ...formImages, {
      imageId: `image-${formImages.length+1}`,
      title: `${formImages.length+1}º Imagem da galeria`,
    } ])
  }
  
  const createAd = async ({ images, ...data }: any) => {    
    data['year'] = year;
    data['mileage'] = +data.mileage
    data['fuel'] = +fuel;
    data['price_table_fipe'] = fipe;
    
    return await axios.post( 'http://localhost:3001/announcements', data, {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImxlbyIsImJ1eWVyIjpmYWxzZSwiaWF0IjoxNjg2OTQ2Nzc1LCJleHAiOjE2ODY5NTAzNzUsInN1YiI6Ijg2OGUzMDA3LTBkZGUtNGMzZC1iNTFiLWZmNjU1ZjNjYWNmNSJ9.7quBZ_LHV9Fx4JuFxuSqCWsw_UjsFjRRsH92Hrc4Cec"
      }
    }).then( async (res: any) => {
      if( images ){
        await images.map( async (image: typeof CreateImageSchema) => {
          return await axios.post( `http://localhost:3001/announcements/${res.data.id}/image`, image, {
            headers: {
              Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImxlbyIsImJ1eWVyIjpmYWxzZSwiaWF0IjoxNjg2OTQ2Nzc1LCJleHAiOjE2ODY5NTAzNzUsInN1YiI6Ijg2OGUzMDA3LTBkZGUtNGMzZC1iNTFiLWZmNjU1ZjNjYWNmNSJ9.7quBZ_LHV9Fx4JuFxuSqCWsw_UjsFjRRsH92Hrc4Cec"
            }
          }).then( resImage => resImage ).catch( err => {
            console.error(err);
          })
        })

        reset();
      }
    }).catch( err => { console.error(err) })
  }

  return (
    <div className="w-screen h-screen p-2 bg-grey-0/25 flex content-center fixed z-[21] top-0">
      <div className="min-w-[300px] max-w-[400px] p-2 m-auto bg-whiteFixed rounded-[4px]">
        <div className="mb-4 flex flex-row justify-between items-center">
          <h3 className="heading-6-500">Criar anúncio</h3>
          <button onClick={() => { reset(); setCreateAd( false )}} className="medium-negative">X</button>
        </div>
        <form 
          className="max-h-[87vh] p-2 flex flex-col box-border overflow-y-scroll scroll-auto"
          onSubmit={handleSubmit( createAd )}
        >
          <h3 className="body-2-500 mb-2">Informações do veículo</h3>
          
          <label htmlFor="brand" className="input-label">Marca</label>
          <select 
            className="p-2.5 mb-2.5"
            {...register('brand')}
          >
            <option value=''>Selecione um marca</option>
            {
              brands?.map( brand => {
                return(
                  <>
                    <option onClick={() => setSearchBrand( brand )} value={brand}>{ brand }</option>
                  </>
                )
              })
            }
          </select>
          
          <label htmlFor="model" className="input-label">Modelo</label>
          <select 
            className="p-2.5 mb-2.5"
            {...register('model')}
            onClick={async (event) => {
              event.preventDefault()
              const allModelsRequest = await getModels( searchBrand ).then( res => res ).catch( err => 'Deve escolher a marca primeiro')
              setAllModels( allModelsRequest )

              const res = allModelsRequest.map( (model: any) => model.name )

              setModels( res )
            }}
          >
            <option value=''>Selecione um modelo</option>
            {
              models?.map( model => {
                return(
                  <>
                    <option 
                      value={model}
                      onClick={() => {
                        setSearchModel( model )
                      }}
                    >{ model }</option>
                  </>
                )
              })
            }
          </select>
          
          <div className="flex flex-row gap-2.5 mb-4">
            <div className="w-1/2">
              <label htmlFor="year" className="input-label">Ano</label>
              <input type="text" id="year" className="input-text w-full cursor-not-allowed" placeholder="2022" {...register('year', { value: year })} value={year} disabled required />
              <span></span>
            </div>
            <div className="w-1/2">
              <label htmlFor="fuel" className="input-label">Combustível</label>
              <input 
                type="text" 
                id="fuel" 
                className="input-text w-full cursor-not-allowed" 
                placeholder="3" 
                value={fuel} 
                {...register('fuel', { value: fuel })}
                disabled 
                required 
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
                placeholder="Quilometragem" 
                {...register('mileage')} 
                onClick={() => {
                  let model: iModel
                  for( model of allModels ){
                    if( model.name == searchModel ){
                      setYear( `${model.year}` )
                      setFuel( `${model.fuel}` )
                      setFipe( `${model.value}` )
                    }
                  }
                }}
                required 
              />
              <span></span>
            </div>
            <div className="w-1/2">
              <label htmlFor="color" className="input-label">Cor</label>
              <input type="text" id="color" className="input-text w-full" placeholder="Cor" {...register('color')} required />
              <span></span>
            </div>
          </div>
          
          <div className="flex flex-row gap-2.5">
            <div className="w-1/2">
              <label htmlFor="price_table_fipe" className="input-label">Preço tablela FIPE</label>
              <input type="text" id="price_table_fipe" className="input-text w-full cursor-not-allowed" value={fipe} placeholder="282045" {...register('price_table_fipe', { value: fipe })} disabled required />
              <span></span>
            </div>
            <div className="w-1/2">
              <label htmlFor="price" className="input-label">Preço</label>
              <input type="text" id="price" className="input-text w-full" placeholder="Preco" {...register('price')} required />
              <span></span>
            </div>
          </div>
          
          <label htmlFor="description" className="input-label">Description</label>
          <input type="text" id="description" className="input-text"  placeholder="Description" {...register('description')} required />
          <span></span>
          
          <label htmlFor="cover-image" className="input-label">Imagem da capa</label>
          <input type="text" id="cover-image" className="input-text" placeholder="Imagem da capa" {...register('cover_image')} required />
          <span></span>
          
          {formImages.map(({ imageId, title }, index) => {
            return(
              <React.Fragment key={imageId}>
                <label htmlFor={imageId} className="input-label">{title}</label>
                <input type="text" id={imageId} className="input-text mb-2" placeholder="https://image.com" {...register(`images.${index}.link`)} />
              </React.Fragment>
            )
          })}

          <button type="button" onClick={ addFormImage } className="medium-brand-opacity mb-5">
            Adicionar campo para imagens da galeria
          </button>

          <div className="flex justify-end gap-x-2">
            <button type="button" onClick={ () => { reset(); setCreateAd( false )}} className="medium-negative">Cancelar</button>
            <button type="submit" className="medium-brand-1">Criar anúncio</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterAnnouncement;
