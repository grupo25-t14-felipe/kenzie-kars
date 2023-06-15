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
    console.log("teste");
  };

  return (
    <div className="">
      <p className="">Login</p>
      <form className="" onSubmit={handleSubmit(onFormSubmit)}>
        <div>
          <label htmlFor="email" className="">
            Email
          </label>
          <div className="">
            <input type="email" placeholder="Digitar email" className="" {...register("email")} />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="">
            Senha
          </label>
          <div className="">
            <input type="text" placeholder="Digitar senha" className="" {...register("password")} />
          </div>
        </div>
        <div>
          <span>Esqueci minha senha</span>
        </div>
        <div>
          <button type="submit" className="">
            Entrar
          </button>
        </div>
        <div>
          <p>Ainda não possui conta?</p>
        </div>
        <button
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
