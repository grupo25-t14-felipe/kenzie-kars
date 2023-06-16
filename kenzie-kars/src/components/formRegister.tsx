import { UserData, userSchema } from "@/schemas/user.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/authContext";
import Modal from "./modal";
import { useState } from "react";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserData>({
    resolver: zodResolver(userSchema)
  });

  const { registerSubmit, showModal, setModal } = useAuth();
  const [isBuyer, setIsBuyer] = useState(false);

  const handleCompradorClick = () => {
    setIsBuyer(false);
  };

  const handleAnuncianteClick = () => {
    setIsBuyer(true);
  };

  const onSubmit = (data: UserData) => {
    const userData = {
      ...data,
      buyer: isBuyer
    };
    registerSubmit(userData);
  };

  return (
    <>
      <div className=" bg-whiteFixed px-[44px] py-[48px] w-[90%] max-w-[411px] h-[80%] max-h-[1,630px] my-[100px] rounded">
        <Modal isVisible={showModal} onClose={() => setModal(false)} />
        <div className="w-full flex flex-col gap-4 my-[10px]">
          <p className="text-4xl mt-1 font-semibold">Cadastro</p>
          <p>Informações pessoais</p>
        </div>
        <form
          className="w-full h-full flex flex-col justify-center gap-4"
          onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name" className="user-form-label">
              Nome
            </label>
            <div className="mt-2">
              <input
                type="text"
                placeholder="Seu Nome"
                className="input-text w-full"
                {...register("name")}
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="email" className="user-form-label">
              E-mail
            </label>
            <div className="mt-2">
              <input
                type="email"
                placeholder="example@.com"
                className="input-text w-full"
                {...register("email")}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="cpf" className="user-form-label">
              CPF
            </label>
            <div className="mt-2">
              <input
                type="text"
                placeholder="000.000.000-00"
                className="input-text w-full"
                {...register("cpf")}
              />
              {errors.cpf && <p>{errors.cpf.message}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="celular" className="user-form-label">
              Celular
            </label>
            <div className="mt-2">
              <input
                type="text"
                placeholder="(DDD) 90000-0000"
                className="input-text w-full"
                {...register("telephone")}
              />
              {errors.telephone && <p>{errors.telephone.message}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="data" className="user-form-label">
              Data de nascimento
            </label>
            <div className="mt-2">
              <input
                type="date"
                placeholder="00/00/00"
                className="input-text w-full"
                {...register("date_of_birth")}
              />
              {errors.date_of_birth && <p>{errors.date_of_birth.message}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="descrição" className="user-form-label">
              Descrição
            </label>
            <div className="mt-2">
              <input
                type="text"
                placeholder="Digitar descrição"
                className="input-text w-full"
                {...register("description")}
              />
            </div>
          </div>
          <p>Informações de endereço</p>
          <div>
            <label htmlFor="cep" className="user-form-label">
              CEP
            </label>
            <div className="mt-2">
              <input type="text" placeholder="00000.000" className="input-text w-full" />
            </div>
          </div>
          <div className="w-full flex justify-between">
            <div>
              <label htmlFor="estado" className="user-form-label">
                Estado
              </label>
              <div className="mt-2">
                <input type="text" placeholder="Digitar Estado" className="input-text w-[90%]" />
              </div>
            </div>
            <div>
              <label htmlFor="cidade" className="user-form-label">
                Cidade
              </label>
              <div className="mt-2">
                <input type="text" placeholder="Digitar cidade" className="input-text w-[90%]" />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="rua" className="user-form-label">
              Rua
            </label>
            <div className="mt-2">
              <input type="text" placeholder="Digite sua rua" className="input-text w-full" />
            </div>
          </div>
          <div className="w-full flex justify-between">
            <div>
              <label htmlFor="número" className="user-form-label">
                Número
              </label>
              <div className="mt-2">
                <input type="text" placeholder="Digite o número" className="input-text w-[90%]" />
              </div>
            </div>
            <div>
              <label htmlFor="Complemento" className="user-form-label">
                Complemento
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Ex: Apartamento 01"
                  className="input-text w-[90%]"
                />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <p>Tipo de Conta</p>
            <div className="w-full flex justify-between">
              <button
                type="button"
                className={`border-[1.5px] border-solid rounded text-whiteFixed py-[12px] px-[28px] bg-grey-3 ${isBuyer ? "selected" : "big-brand-1"}`}
                onClick={handleCompradorClick}>
                Comprador
              </button>
              <button
                type="button"
                className={`border-[1.5px] border-solid rounded text-whiteFixed py-[12px] px-[28px] bg-grey-3 ${
                  isBuyer ? "big-brand-1" : "selected"
                }`}
                onClick={handleAnuncianteClick}>
                Anunciante
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="password" className="user-form-label">
              Senha
            </label>
            <div className="mt-2">
              <input
                type="password"
                placeholder="Sua senha"
                className="input-text w-full"
                {...register("password")}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="password" className="user-form-label">
              Confirmar senha
            </label>
            <div className="mt-2">
              <input
                type="password"
                placeholder="Sua senha"
                className="input-text w-full"
                {...register("confirm")}
              />
              {errors.confirm && <p>{errors.confirm.message}</p>}
            </div>
          </div>
          <div>
            <button type="submit" className="big-brand-1 w-full">
              Finalizar Cadastro
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
