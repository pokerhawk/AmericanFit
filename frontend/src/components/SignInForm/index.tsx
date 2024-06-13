import MailIcon from "../../assets/images/icons/MailIcon";
import Button from "../Button";
import FormHeader from "../FormHeader";
import InputStringField from "../InputStringField";
import * as S from './styles';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import AlertIcon from "../../assets/images/icons/AlertIcon";
import { useState } from "react";
import EyeIcon from "../../assets/images/icons/EyeIcon";
import EyeOffIcon from "../../assets/images/icons/EyeOffIcon";
import Toastify from "../Toastify/Toastify";
import { notify } from "../../utils/Toast/notify";

type Login = {
    email: string;
    password: string
}

const loginSchema = yup.object({
    email: yup.string().email('Email inválido!').required('Email necessário para login!'),
    password: yup.string().required('Senha necessária para login!')
});

const SignInForm = () => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm<Login>({
        resolver: yupResolver(loginSchema)
    });
    const { signIn } = useAuth();

    const handleLogin = handleSubmit(async ({ email, password }) => {
        try {
            await signIn({ email, password });
        } catch (err: any) {
            notify('error', `Dados inválidos, tente novamente!`)
        }
    })

    return (
        <S.Wrapper>
            <Toastify position='top-right' theme='light' displayTime={2500}/>
            <S.HeaderWrapper>
                <FormHeader
                    title={"Entre com sua conta"}
                    subtitle={"Faça seu login"}
                />
            </S.HeaderWrapper>
            <S.Form onSubmit={handleLogin}>
                <S.InputFormWrapper>
                    <InputStringField
                        label="Email*"
                        type="text"
                        placeholder="Digite seu email"
                        iconRight={errors.email ? <AlertIcon /> : <MailIcon/>}
                        error={errors.email?.message}
                        inputError={errors.email ? true : false}
                        {...register('email')}
                    />
                    <InputStringField
                        label="Senha*"
                        type={isPasswordVisible ? 'text' : 'password'}
                        iconRight={isPasswordVisible? <div onClick={()=>{setIsPasswordVisible(!isPasswordVisible)}}><EyeOffIcon/></div> : <div onClick={()=>setIsPasswordVisible(!isPasswordVisible)}><EyeIcon/></div>}
                        placeholder="Digite sua senha"
                        error={errors.password?.message}
                        inputError={errors.password ? true : false}
                        {...register('password')}
                    />
                    <Button socialButton type="submit">Login</Button>
                </S.InputFormWrapper>
            </S.Form >
            <S.SignupOptionWrapper>
                <p>Não possui uma conta?</p>
                <Link to='/register'>Faça o Cadastro</Link>
            </S.SignupOptionWrapper>
        </S.Wrapper>
    );
}

export default SignInForm;
