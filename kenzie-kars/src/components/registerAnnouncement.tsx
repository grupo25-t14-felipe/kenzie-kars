import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Options from "./options";
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

const CreateImageSchema = z.object({
  link: z.string({ required_error: 'Este campo é obrigatório' })
})

const CreateAnnouncementSchema = z.object({
  brand: z.string({ required_error: 'Este campo é obrigatório' }).max(1, 'muito pequeno '),
  model: z.string({ required_error: 'Este campo é obrigatório' }),
  year: z.string({ required_error: 'Este campo é obrigatório' }),
  fuel: z.string({ required_error: 'Este campo é obrigatório' }).transform( data => +data ),
  mileage: z.string({ required_error: 'Este campo é obrigatório' }).transform( data => +data ),
  color: z.string({ required_error: 'Este campo é obrigatório' }),
  price_table_fipe: z.string({ required_error: 'Este campo é obrigatório' }), 
  price: z.string({ required_error: 'Este campo é obrigatório' }),
  description: z.string({ required_error: 'Este campo é obrigatório' }),
  cover_image: z.string({ required_error: 'Este campo é obrigatório' }),
  published: z.boolean({ required_error: 'Este campo é obrigatório' }).default(()=> true ),
  images: z.array( CreateImageSchema )
})

export const getBrands = async () => {
  return axios.get('https://kenzie-kars.herokuapp.com/cars').then( res => Object.keys(res.data)).catch( err => err )
}

export const getModels = async ( brand: string ) => {
  return axios.get(`https://kenzie-kars.herokuapp.com/cars?brand=${brand}`).then( res => res.data).catch( err => err )
}

const RegisterAnnouncement = ({ setCreateAd, brands }: iRegisterAnnouncement) => {
  const { register, handleSubmit, reset } = useForm({
    mode: 'onSubmit',
    resolver: zodResolver( CreateAnnouncementSchema )
  })

  const [formImages, setFormImages] = useState([
    { imageId: "image-1", title: "1º Imagem da galeria" },
    { imageId: "image-2", title: "2º Imagem da galeria" }
  ])
  const [openBrandOptions, setOpenBrandOptions] = useState(false)
  const [openModelOptions, setOpenModelOptions] = useState(false)
  const [searchBrand, setSearchBrand] = useState<string>('')
  const [searchModel, setSearchModel] = useState<string>('')
  const [filterBrand, setFilterBrand] = useState<string[]>([])
  const [filterModel, setFilterModel] = useState<string[]>([])
  const [allModels, setAllModels] = useState<iModel[]>([])
  const [models, setModels] = useState<string[]>([])
  const [year, setYear] = useState<string>('')
  const [fuel, setFuel] = useState<string>('')
  const [fipe, setFipe] = useState<string>('')
  
  useEffect(() => {
    if( !brands ) return;

    let res: string[] = [];
    for( const brand of brands ){
        if( brand.startsWith( searchBrand ) ){
            res.push( brand );                 
        }
    }

    return setFilterBrand( res );
  }, [searchBrand])
  
  useEffect(() => {
    let res: string[] = []
    for( const item of models ){
        if( item.startsWith( searchModel )){
            res.push( item )
        }
    }      

    return setFilterModel( res )
  }, [searchModel])

  const addFormImage = () => {
    setFormImages([ ...formImages, {
      imageId: `image-${formImages.length+1}`,
      title: `${formImages.length+1}º Imagem da galeria`,
    } ])
  } 
  
  const createAd = async ( data: any ) => {
    console.log(data);
    // reset();
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
          <input 
            type="text" 
            id="brand" 
            className="input-text" 
            placeholder="chevrolet" 
            value={ searchBrand }
            {...register('brand')} 
            onClick={() => setOpenBrandOptions( !openBrandOptions )}
            onChange={ event => setSearchBrand( event.target.value )}
            required 
          />
          <span></span>
          { openBrandOptions && <Options options={ brands } filter={ filterBrand } id='brand' setState={ setSearchBrand } setCloseOptions={ setOpenBrandOptions } /> }
          
          <label htmlFor="model" className="input-label">Modelo</label>
          <input 
            type="text" 
            id="model" 
            className="input-text" 
            placeholder="bolt ev premier 203cv (elétrico)" 
            value={ searchModel }
            {...register('model')} 
            onClick={async (event) => {
              event.preventDefault()
              const allModelsRequest = await getModels( searchBrand ).then( res => res ).catch( err => 'Deve escolher a marca primeiro')
              setAllModels( allModelsRequest )

              const res = allModelsRequest.map( (model: any) => model.name )

              setModels( res )
              setOpenModelOptions( !openModelOptions )
            }}
            onChange={ event => setSearchModel( event.target.value )}
            required 
          />
          <span></span>
          { openModelOptions && <Options options={ models } filter={ filterModel } id='model' setState={ setSearchModel } setCloseOptions={ setOpenModelOptions } /> }
          
          <div className="flex flex-row gap-2.5 mb-4">
            <div className="w-1/2">
              <label htmlFor="year" className="input-label">Ano</label>
              <input type="text" id="year" className="input-text w-full cursor-not-allowed" placeholder="2022" {...register('year')} value={year}  disabled required />
              <span></span>
            </div>
            <div className="w-1/2">
              <label htmlFor="fuel" className="input-label">Combustível</label>
              <input type="text" id="fuel" className="input-text w-full cursor-not-allowed" placeholder="3" {...register('fuel')} value={fuel} disabled required />
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
                      setYear( model.year )
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
              <input type="text" id="price_table_fipe" className="input-text w-full cursor-not-allowed" placeholder="282045" {...register('price_table_fipe')} value={fipe} disabled required />
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
