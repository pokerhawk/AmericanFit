import Button from "../Button";
import FormHeader from "../FormHeader";
import InputStringField from "../InputStringField";
import * as S from './styles';
import { useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { businessCreateTransaction } from "../../services/business";
import Select from "../Select";
import { useEffect, useState } from "react";
import CheckboxInput from "../CheckboxInput";
import { getUsers } from "../../services/user";
import { useParams } from "react-router-dom";
import { formatFlowDescription } from "../../utils/format/transaction";

type BusinessCashFlowProp = {
    flowValue: number;
}

const BusinessCashFlowScheme = yup.object({
    flowValue: yup.number().required('Valor necessário!'),
});

const BusinessCreateTransaction = () => {

    const { id } = useParams();

    const [displayUsers, setDisplayUsers] = useState([''])
    const [users, setUsers] = useState([{
        id: '',
        name: ''
    }])
    const [flowDescription, setFlowDescription] = useState('');
    const [flowType, setFlowType] = useState('');
    const [extraDescription, setExtraDescription] = useState('');
    const [loadExtraDescription, setLoadExtraDescription] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<BusinessCashFlowProp>({
        resolver: yupResolver(BusinessCashFlowScheme)
    });

    const handleBusinessCashFlow = handleSubmit(async ({ flowValue }) => {
        const businessId = id;
        try {
            await businessCreateTransaction({ businessId, flowValue, flowDescription, flowType, extraDescription });
            window.location.reload()
        } catch (err: any) {
            alert('Dados informados inválidos, tente novamente!');
        }
    })

    const getAllUsers = async () =>{
        const response = await getUsers(0, 0, id)
        const data = response.map((prop:any)=>{return prop.name})
        setDisplayUsers(data)
        setUsers(response)
    }

    useEffect(()=>{
        getAllUsers()
    }, [])

    return (
        <S.Wrapper>
            <S.HeaderWrapper>
                <FormHeader
                    title={"Transação"}
                    subtitle={"Insira as informações."}
                />
            </S.HeaderWrapper>
            <S.Form onSubmit={handleBusinessCashFlow}>
                <S.InternalFormWrapper>
                    <S.InputFormWrapper>
                        <InputStringField
                            label="Valor da transação"
                            type="number"
                            min="1.99"
                            step="0.01"
                            placeholder="R$ 0.00"
                            error={errors.flowValue?.message}
                            {...register('flowValue')}
                        />
                        <Select
                            selectName="Tipo de Transação"
                            onChange={(e:any)=>{
                                const flowDescriptionFormated = formatFlowDescription(e.target.value)
                                setFlowDescription(flowDescriptionFormated)
                                switch(e.target.value){
                                case "venda":
                                    setFlowType("revenue")
                                    break;
                                case "deposito":
                                    setFlowType("revenue")
                                    break;
                                case "saque":
                                    setFlowType("expense")
                                    break;
                                case "comissão":
                                    setFlowType("expense")
                                    break;
                                case "imposto":
                                    setFlowType("expense")
                                    break;
                                case "fornecedor":
                                    setFlowType("expense")
                                    break;
                                case "potes":
                                    setFlowType("expense")
                                    break;                       
                                }
                            }}
                            data={["venda", "deposito", "saque", "comissão", "imposto", "fornecedor", "potes"]}
                        />
                        {(flowDescription === "commission" || flowDescription === "sale") &&
                            <Select
                                selectName="Vendedor"
                                onChange={(e:any)=>{
                                    users.map((prop:any)=>{
                                        if(prop.name === e.target.value){
                                            setExtraDescription(`${prop.name}: ${prop.id}`)
                                        }
                                    })
                                }}
                                data={displayUsers}
                            />
                        }
                        {(flowDescription != "commission" && flowDescription != "sale") &&
                            <CheckboxInput
                                checkboxTitle="Descrição extra"
                                onChange={(e)=>{
                                    if(e.target.checked){
                                        setLoadExtraDescription(true)
                                    } else {
                                        setLoadExtraDescription(false)
                                        setExtraDescription('')
                                    }
                                }}
                            />
                        }
                        {loadExtraDescription &&
                            <InputStringField
                                type="text"
                                placeholder="descrição..."
                                onChange={(e)=>{setExtraDescription(e.target.value)}}
                            />
                        }
                    </S.InputFormWrapper>
                    <S.ButtonWrapper>
                        <Button socialButton>Criar Transação</Button>
                    </S.ButtonWrapper>
                </S.InternalFormWrapper>
            </S.Form >
        </S.Wrapper>
    );
}

export default BusinessCreateTransaction;
