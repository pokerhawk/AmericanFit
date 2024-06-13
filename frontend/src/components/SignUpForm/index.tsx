import { Link, useNavigate } from "react-router-dom";
import Button from "../Button";
import FormHeader from "../FormHeader";
import InputStringField from "../InputStringField";
import * as S from './styles';
import { yupResolver } from "@hookform/resolvers/yup";
import { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import AlertIcon from "../../assets/images/icons/AlertIcon";
import HelpIcon from "../../assets/images/icons/HelpIcon";
import MailIcon from "../../assets/images/icons/MailIcon";
import { signUpRequest } from "../../services/auth";
import CheckboxInput from "../CheckboxInput";
import SelectTag from "../Dropdown";
import { getBusiness } from "../../services/business";
import Toastify from '../../components/Toastify/Toastify';
import { notify } from "../../utils/Toast/notify";

type businessProps = {
    id: string;
    company: string;
}

type InputProps = {
    name: string;
    email: string;
    password: string;
    pix?: string;
}

const registerSchema = yup.object({
    name: yup.string().required('Nome de usuário necessário para cadastro!'),
    email: yup.string().email('Email inválido').required('Email é necessário para cadastro!'),
    password: yup.string().matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, "A senha deve conter ao menos 1 carater especial, 1 letra maiúscula, 1 letra minúscula e 1 número").required('Senha é necessário para cadastro!'),
})

const SignUpForm = () => {

    const [accountType, setAccountType] = useState('');
    const [business, setBusiness] = useState<businessProps[]>([{
        id: '',
        company: ''
    }]);
    const [businessId, setBusinessId] = useState('');
    const [showSellerInputs, setShowSellerInputs] = useState(false);
    const [showBusinessInputs, setShowBusinessInputs] = useState(false);
    
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<InputProps>({
        resolver: yupResolver(registerSchema)
    });

    const getAllBusiness = async () =>{
        const response = await getBusiness();
        setBusiness(response);
    }

    const signUp = async ({ name, email, password, pix }: InputProps) => {
        const response = await signUpRequest({ email, name, password, accountType, pix, businessId });
        notify('success', response)
        setTimeout(()=>{navigate('/login')}, 2500);
    }

    const companies = business.map(prop=>prop.company)

    useEffect(() => {
        getAllBusiness();
    }, [])

    return (
        <S.FormWrapper>
            <Toastify position='top-right' theme='light' displayTime={2500}/>
            <S.Form onSubmit={handleSubmit(signUp)}>
                <S.HeaderWrapper>
                    <FormHeader title="Cadastro" subtitle="Insira as informações" />
                </S.HeaderWrapper>
                <S.InternalFormWrapper>
                    <S.CheckboxWrapper>
                        <CheckboxInput
                            checkboxTitle="Selecione o tipo de conta"
                            isMultipleOption
                            checkboxData={['Empresa', 'Vendedor']}
                            onChange={(e) => {
                                if(e.target.value === "Empresa"){
                                    setAccountType(e.target.value)
                                    setShowBusinessInputs(true)
                                    setShowSellerInputs(false)
                                }
                                if(e.target.value === "Vendedor"){
                                    setAccountType(e.target.value)
                                    setShowBusinessInputs(false)
                                    setShowSellerInputs(true)
                                }
                            }}
                        />
                    </S.CheckboxWrapper>
                    <S.InputWrapper>
                        { showSellerInputs && (
                                <InputStringField
                                    label="Nome *"
                                    type="text"
                                    placeholder="Nome"
                                    error={errors.name?.message}
                                    inputError={errors.name ? true : false}
                                    {...register('name')}
                                />
                            )
                        }
                        { showBusinessInputs && (
                                <InputStringField
                                    label="Empresa *"
                                    type="text"
                                    placeholder="Nome Fantasia"
                                    error={errors.name?.message}
                                    inputError={errors.name ? true : false}
                                    {...register('name')}
                                />
                            )
                        }
                        { (showSellerInputs || showBusinessInputs) && (
                            <InputStringField
                                label="Email *"
                                type="text"
                                placeholder="E-mail"
                                iconLeft={<MailIcon />}
                                iconRight={errors.email ? <AlertIcon /> : <HelpIcon />}
                                error={errors.email?.message}
                                inputError={errors.email ? true : false}
                                {...register('email')}
                            />
                            ) 
                        }
                        {
                            (showSellerInputs || showBusinessInputs) && (
                                <InputStringField
                                    label="Senha *"
                                    type="password"
                                    placeholder="Senha"
                                    error={errors.password?.message}
                                    inputError={errors.password ? true : false}
                                    {...register('password')}
                                />
                            )
                        }
                        {
                            showSellerInputs && (
                                <InputStringField
                                    label="Pix"
                                    type="text"
                                    placeholder="Sua chave Pix"
                                    {...register('pix')}
                                />
                            )
                        }
                        {
                            showSellerInputs && (
                                <SelectTag
                                    label="Empresa afiliada:"
                                    options={companies}
                                    placeholder="Selecione a Empresa"
                                    handleOnChange={e=>{
                                        business.map(prop=>{
                                            if(prop.company === e.target.value){
                                                setBusinessId(prop.id)
                                            }
                                        })
                                    }}
                                />
                            )
                        }
                    </S.InputWrapper>
                    <S.ButtonWrapper>
                        <Button socialButton>Cadastrar</Button>
                    </S.ButtonWrapper>
                </S.InternalFormWrapper>
                <S.SignInOptionWrapper>
                {/* Componentizar */}
                <p>Já possui uma conta?</p>
                <Link to='/login'>Login</Link>
                </S.SignInOptionWrapper>
            </S.Form>
        </S.FormWrapper>
    );
}

export default SignUpForm;
