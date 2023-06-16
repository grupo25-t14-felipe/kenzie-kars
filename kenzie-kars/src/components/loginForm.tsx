import { loginData, loginSchema } from "@/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/authContext";

const LoginForm = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<loginData>({
    resolver: zodResolver(loginSchema)
  });

  const { login } = useAuth();

  const onFormSubmit = (formData: loginData) => {
    console.log(formData);
    login(formData);
  };

  return (
    <div className="flex items-center justify-center px-5 flex-col bg-whiteFixed gap-5 w-11/12 md:w-[412px]">
      <div className="w-10/12">
        <p className="pt-11 pb-8 heading-5-500">Login</p>
      </div>
      <form className="flex flex-col gap-5 w-10/12" onSubmit={handleSubmit(onFormSubmit)}>
        <div className="flex flex-col gap-5">
          <label htmlFor="email" className="input-label">
            Email
          </label>
          <div className="">
            <input
              type="email"
              placeholder="Digitar email"
              className="input-text w-full"
              {...register("email")}
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <label htmlFor="password" className="input-label">
            Senha
          </label>
          <div className="">
            <input
              type="text"
              placeholder="Digitar senha"
              className="input-text w-full"
              {...register("password")}
            />
          </div>
        </div>
        <div className="flex items-end justify-end">
          <span className="body-2-500 text-grey-2">Esqueci minha senha</span>
        </div>
        <div className="W-full">
          <button type="submit" className="big-brand-1 w-full">
            Entrar
          </button>
        </div>
        <div className="w-full flex justify-center items-center body-2-400 text-grey-2">
          <p>Ainda não possui conta?</p>
        </div>
        <button
          className="big-grey-1 w-full mb-11"
          onClick={() => {
            router.push("");
          }}>
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
