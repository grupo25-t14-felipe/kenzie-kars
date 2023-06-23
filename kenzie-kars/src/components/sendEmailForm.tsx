import { useAuth } from "@/contexts/authContext";
import { SendEmailResetPasswordData, sendEmailResetPasswordSchema } from "@/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const SendEmailForm = () => {
  const { register, handleSubmit } = useForm<SendEmailResetPasswordData>({
    resolver: zodResolver(sendEmailResetPasswordSchema)
  });

  const { sendEmail } = useAuth();

  const onFormSubmit = (formData: SendEmailResetPasswordData) => {
    console.log(formData);
    sendEmail(formData);
  };

  return (
    <div className="flex items-center justify-center px-5 flex-col bg-whiteFixed gap-5 w-11/12 md:w-[412px]">
      <form className="flex flex-col gap-5 w-10/12" onSubmit={handleSubmit(onFormSubmit)}>
        <div className="flex flex-col gap-5">
          <label className="input-label pt-11 pb-8" htmlFor="email">
            Informe o email para a recuperação de senha
          </label>
          <div>
            <input
              className="input-text w-full"
              type="email"
              placeholder="example@.com"
              {...register("email")}
            />
          </div>
        </div>
        <div>
          <button className="big-grey-1 w-full mb-11" type="submit">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendEmailForm;
