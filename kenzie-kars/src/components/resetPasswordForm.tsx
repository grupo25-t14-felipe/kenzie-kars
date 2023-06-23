import { useAuth } from "@/contexts/authContext";
import {
  ResetPasswordData,
  SendEmailResetPasswordData,
  resetPasswordSchema,
  sendEmailResetPasswordSchema
} from "@/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface ResetPasswordProps {
  token: string;
}

const ResetPasswordForm = ({ token }: ResetPasswordProps) => {
  const { register, handleSubmit } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema)
  });

  const { resetPassword } = useAuth();

  const onFormSubmit = (formData: ResetPasswordData) => {
    console.log(formData);
    console.log(token);
    resetPassword(formData, token);
  };

  return (
    <div className="flex items-center justify-center px-5 flex-col bg-whiteFixed gap-5 w-11/12 md:w-[412px]">
      <div className="w-10/12">
        <p className="pt-11 pb-8 heading-5-500">Recuperação de senha</p>
      </div>
      <form className="flex flex-col gap-5 w-10/12" onSubmit={handleSubmit(onFormSubmit)}>
        <div className="flex flex-col gap-5">
          <label className="input-label" htmlFor="email">
            Nova senha
          </label>
          <div>
            <input
              className="input-text w-full"
              type="password"
              placeholder="Sua nova senha"
              {...register("password")}
            />
          </div>
        </div>
        <div>
          <label className="input-label" htmlFor="password">
            Confirmação de senha
          </label>
          <div>
            <input
              className="input-text w-full"
              type="password"
              placeholder="Confirmação de senha"
              {...register("passwordConfirm")}
            />
          </div>
        </div>
        <div>
          <button className="big-grey-1 w-full mb-11" type="submit">
            Atualizar senha
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
