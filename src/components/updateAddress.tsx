import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import api from "@/services/api";
import { AddressResponseSchema, UpdateAddressSchema, iAddressResponse, iAddressUpdateRequest } from "@/schemas/address.schema";
import { AxiosResponse } from "axios";

interface iUpdateAddress {
  setUpdateAddressModal: Dispatch<SetStateAction<boolean>>
  address: iAddressResponse | null
  setAddress: Dispatch<SetStateAction<iAddressResponse | null>>
}

const UpdateAddress = ({ setUpdateAddressModal, address, setAddress }: iUpdateAddress ) => {
  const { register, handleSubmit, reset, formState:{ errors } } = useForm<iAddressUpdateRequest>({
    mode: 'onSubmit',
    resolver: zodResolver( UpdateAddressSchema )
  })

  const updateAdress = async ( { cep, state, city, street, number, complement }: iAddressUpdateRequest ) => {
    const data = {
      cep: cep || address?.cep,
      state: state || address?.state,
      city: city || address?.city,
      street: street || address?.street,
      number: number || address?.number,
      complement: complement || address?.complement
    }
    
    const userId = window.localStorage.getItem( '@kenzie-kars-userId' )
    
    return await api.patch( `/address/${address?.id}`, data).then( (res) => {
      const dataUpdated = AddressResponseSchema.parse( res.data )
      setAddress( dataUpdated )
      
      reset();
      setUpdateAddressModal(false)

      return
    }).catch( err => err)
  }

  const deleteAddress = async () => {
    const userId = window.localStorage.getItem( '@kenzie-kars-userId' )

    return await api.delete( `/users/${userId}/address/${address?.id}`).then( res => {
      setUpdateAddressModal(false)
  
      return
    }).catch( err => err )
  }

  return(
    <div className="w-screen h-screen p-2 bg-grey-0/25 flex content-center fixed z-[21] top-0">
      <div className="min-w-[300px] max-w-[400px] p-2 m-auto bg-whiteFixed rounded-[4px]">
        <div className="mb-4 flex flex-row justify-between items-center">
          <h3 className="heading-6-500">Editar anúncio</h3>
          <button onClick={() => { reset(); setUpdateAddressModal(false) }} className="medium-negative">X</button>
        </div>
        <form 
          className="max-h-[87vh] p-2 flex flex-col box-border"
          onSubmit={handleSubmit( updateAdress )}
        >
          <h3 className="body-2-500 mb-2">Informações de endereço</h3>
          
          <label htmlFor="cep" className="input-label">CEP</label>
          <input 
            type="text" 
            id="cep" 
            className="input-text w-full" 
            placeholder={ address?.cep }
            { ...register( 'cep')}
            required={false}
          />

          <div className="flex flex-row gap-2.5">
            <div className="w-1/2">
              <label htmlFor="state" className="input-label">Estado</label>
              <input 
                type="text" 
                id="state" 
                className="input-text w-full" 
                placeholder={ address?.state }
                { ...register( 'state' )}
                required={false}
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="city" className="input-label">Cidade</label>
              <input 
                type="text" 
                id="city" 
                className="input-text w-full" 
                placeholder={ address?.city }
                { ...register( 'city' )}
                required={false}
              />
            </div>
          </div>

          <label htmlFor="street" className="input-label">Rua</label>
          <input 
            type="text" 
            id="street" 
            className="input-text w-full" 
            placeholder={ address?.street }
            { ...register( 'street' )}
            required={false}
          />

          <div className="flex flex-row gap-2.5">
            <div className="w-1/2">
              <label htmlFor="number" className="input-label">Número</label>
              <input 
                type="text" 
                id="number" 
                className="input-text w-full" 
                placeholder={ address?.number }
                { ...register( 'number' )}
                required={false}
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="complement" className="input-label">Complemento</label>
              <input 
                type="text" 
                id="complement" 
                className="input-text w-full" 
                placeholder={ address?.complement }
                { ...register( 'complement' )}
                required={false}
              />
            </div>
          </div>

          <div className="flex row gap-[10px]">
            <div className="flex row gap-[10px]">
              <button 
                type="button" 
                className="medium-negative" 
                onClick={() => { 
                  reset()
                  setUpdateAddressModal(false)
                }}
              >
                Cancelar
              </button>
              <button 
                type="button" 
                className="medium-alert"
                onClick={ () => { deleteAddress()}}
              >
                Exluir endereço
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

export default UpdateAddress;
