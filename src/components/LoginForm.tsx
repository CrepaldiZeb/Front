import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

interface IFormInput {
  Login: string;
  Senha: string;
}

interface LoginFormProps {
  handleLoginSuccess: (isAdmin: boolean) => void;
  handleShowHome: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  handleLoginSuccess,
  handleShowHome,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = async (data: IFormInput) => {
    try {
      const response = await axios.post(
        "http://192.168.224.128:80/mid/login",
        data
      );
      console.log(response.data);
      const { isAdmin } = response.data; // Assume que o backend retorna um booleano `isAdmin`
      handleLoginSuccess(isAdmin);
    } catch (error) {
      console.error("Erro no Login:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <label>Usuário</label>
      <input type="text" {...register("Login", { required: true })} />
      {errors.Login && <p>Campo Necessário!</p>}

      <label>Senha</label>
      <input type="password" {...register("Senha", { required: true })} />
      {errors.Senha && <p>Campo Necessário!</p>}

      <input type="submit" value="Fazer Login" />
      <button type="button" onClick={handleShowHome}>
        Voltar
      </button>
    </form>
  );
};

export default LoginForm;
