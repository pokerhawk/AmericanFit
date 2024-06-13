import Button from "../Button";
import FormHeader from "../FormHeader";
import InputStringField from "../InputStringField";
import * as S from './styles';
import { useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { createSale } from "../../services/sales";
import Select from "../Select";
import { useState } from "react";
import SwitchOption from "../SwitchOption";
import { RowWrapper } from "../../styles/Global";
import Modal from "../Modal";
import { maskPhone, unmaskPhone } from "../../utils/format/phone";
import Toastify from "../Toastify/Toastify";
import { notify } from "../../utils/Toast/notify";

type NewSaleProp = {
    userId: string | undefined;
}

type NewSaleSchemeProp = {
    saleDate: string;
    transactionValue: number;
    quantity: number;
}

const NewSaleScheme = yup.object({
    saleDate: yup.string().required('Data necessária para registro!'),
    transactionValue: yup.number().required('Valor necessário para registro!'),
    quantity: yup.number().required('Quantidade necessária para registro!')
});

const NewSale = ({
    userId
}:NewSaleProp) => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState('');
    const [commissionOption, setCommissionOption] = useState(false);
    const [address, setAddress] = useState(Object);
    const [clientAddress, setClientAddress] = useState({
        name: "",
        phone: "",
        zipcode: "",
        address: "",
        number: "",
        neighborhood: "",
        city: "",
        state: "",
        complement: "",
        deliveryDate: ""
    })

    const { register, handleSubmit, formState: { errors } } = useForm<NewSaleSchemeProp>({
        resolver: yupResolver(NewSaleScheme)
    });

    const handleNewSale = handleSubmit(async ({ saleDate, transactionValue, quantity }) => {
        try {
            const response = await createSale({ userId, saleDate, transactionValue, paymentMethod, quantity, commissionOption, clientAddress });
            notify('success', response);
            setTimeout(()=>{window.location.reload()}, 2000);
        } catch (err: any) {
            notify("error", "Dados informados inválidos, tente novamente!");
        }
    })

    const handleBlur = async (e:any) =>{
        const cep = e.target.value
        const url =`https://viacep.com.br/ws/${cep}/json/`

        try {
            const response = await fetch(url);
            if(!response.ok){
                throw new Error('CEP inválido')
            }
            const data = await response.json();
            setAddress(data)
            setClientAddress((prevState)=>({
                ...prevState,
                address: data.logradouro,
                neighborhood: data.bairro,
                city: data.localidade,
                state: data.uf
            }))
        } catch (error) {
            console.error(`Something went wrong: ${error}`)
        }
    }

    const setSwitchState = (state:boolean) => {
        setCommissionOption(state)
    }

    return (
        <S.Wrapper>
            <Toastify position='top-right' theme='light' displayTime={2000}/>
            <S.Form onSubmit={handleNewSale}>
                <S.HeaderWrapper>
                    <FormHeader
                        title={"Adicionar uma venda"}
                        subtitle={"Insira as informações."}
                    />
                </S.HeaderWrapper>
                <S.SaleWrapper>
                    <InputStringField
                        label="Data de venda"
                        type="date"
                        error={errors.saleDate?.message}
                        {...register('saleDate')}
                    />
                    <InputStringField
                        label="Valor de Venda"
                        type="number"
                        min="1.99"
                        step="0.01"
                        placeholder="R$ 0.00"
                        error={errors.transactionValue?.message}
                        {...register('transactionValue')}
                    />
                    <InputStringField
                        label="Quantidade de potes"
                        type="number"
                        min="1"
                        step="1"
                        placeholder="Nº"
                        error={errors.quantity?.message}
                        {...register('quantity')}
                    />
                    <Select
                        selectName="Tipo de Pagamento"
                        onChange={(e:any)=>{
                            setPaymentMethod(e.target.value)
                            if(e.target.value === "Pix"){
                                setIsModalOpen(!isModalOpen)
                            }
                        }}
                        data={["Pix", "Cartão", "Boleto", "Braip", "360Hub", "Logzz"]}
                    />
                    <SwitchOption
                        message="Venda recuperada?"
                        setSwitch={setSwitchState}
                    />
                    {(commissionOption === true) &&
                        <Select //Pegar vendedores
                        selectName="Vendedor"
                        onChange={()=>{}}
                        data={["Fulano", "Beltrano", "Ciclano"]}
                    />
                    }
                    <Button socialButton>Criar Venda</Button>
                    <Modal
                        title="Dados do Cliente"
                        isOpen={isModalOpen}
                        closeModal={()=>setIsModalOpen(!isModalOpen)}
                        children={
                            <S.ModalWrapper>
                                <S.AddressWrapper>
                                    <InputStringField
                                        label="Nome Completo"
                                        type="text"
                                        onChange={(e)=>{
                                            setClientAddress((prevState)=>({
                                                ...prevState,
                                                name: e.target.value
                                            }))
                                        }}
                                    />
                                    <RowWrapper>
                                        <InputStringField
                                            label="WhatsApp"
                                            type="text"
                                            placeholder="(99) 9.9999-9999"
                                            onChange={(e)=>{
                                                e.target.value = maskPhone(e.target.value)
                                                setClientAddress((prevState)=>({
                                                    ...prevState,
                                                    phone: unmaskPhone(e.target.value)
                                                }))
                                            }}
                                        />
                                        <InputStringField
                                            label="CEP"
                                            type="text"
                                            placeholder="Apenas Números"
                                            onBlur={handleBlur}
                                            onChange={(e)=>{
                                                setClientAddress((prevState)=>({
                                                    ...prevState,
                                                    zipcode: e.target.value
                                                }))
                                            }}
                                        />
                                    </RowWrapper>
                                    <hr/>
                                    <RowWrapper>
                                        <InputStringField
                                            label="Endereço"
                                            type="text"
                                            placeholder="Rua/Avenida..."
                                            value={address.logradouro}
                                            onChange={(e)=>{
                                                setClientAddress((prevState)=>({
                                                    ...prevState,
                                                    address: e.target.value
                                                }))
                                            }}
                                        />
                                        <InputStringField
                                            label="Número"
                                            type="text"
                                            placeholder=""
                                            onChange={(e)=>{
                                                setClientAddress((prevState)=>({
                                                    ...prevState,
                                                    number: e.target.value
                                                }))
                                            }}
                                        />
                                    </RowWrapper>
                                    <RowWrapper>
                                        <InputStringField
                                            label="Bairro"
                                            type="text"
                                            value={address.bairro}
                                            onChange={(e)=>{
                                                setClientAddress((prevState)=>({
                                                    ...prevState,
                                                    neighborhood: e.target.value
                                                }))
                                            }}
                                        />
                                        <InputStringField
                                            label="Cidade"
                                            type="text"
                                            value={address.localidade}
                                            onChange={(e)=>{
                                                setClientAddress((prevState)=>({
                                                    ...prevState,
                                                    city: e.target.value
                                                }))
                                            }}
                                        />
                                        <InputStringField
                                            label="Estado"
                                            type="text"
                                            value={address.uf}
                                            onChange={(e)=>{
                                                setClientAddress((prevState)=>({
                                                    ...prevState,
                                                    state: e.target.value
                                                }))
                                            }}
                                        />
                                    </RowWrapper>
                                    <InputStringField
                                        label="Complemento"
                                        type="text"
                                        placeholder="Apartamento, Bloco, etc"
                                        onChange={(e)=>{
                                            setClientAddress((prevState)=>({
                                                ...prevState,
                                                complement: e.target.value
                                            }))
                                        }}
                                    />
                                    <hr/>
                                    <InputStringField
                                        label="Data de Recebimento"
                                        type="date"
                                        onChange={(e)=>{
                                            setClientAddress((prevState)=>({
                                                ...prevState,
                                                deliveryDate: e.target.value
                                            }))
                                        }}
                                    />
                                </S.AddressWrapper>
                            </S.ModalWrapper>
                        }
                    />
                </S.SaleWrapper>
            </S.Form >
        </S.Wrapper>
    );
}

export default NewSale;
