import { ForwardRefRenderFunction, SelectHTMLAttributes, forwardRef } from 'react'
import SearchIcon from '../../assets/images/icons/SearchIcon'
import InputStringField from '../Input'
import * as S from './styles'

type SelectProps = {
    selectName: string
    data: Array<string>
    displayFilter?: Function
}

type SelectHeirProps = SelectProps & SelectHTMLAttributes<HTMLSelectElement>

const Select: ForwardRefRenderFunction<HTMLSelectElement, SelectHeirProps> = ({
    selectName, data, displayFilter, ...props
}, ref) => {
    return (
        <S.Wrapper>
            <p>{selectName}</p>
            <S.Select 
                ref={ref}
                { ...props }
                name={selectName}
            >
                {data?.map((prop: any, index: number) => {
                    if (index === 0) {
                        return (
                            <>
                                <S.Option value="" selected disabled hidden>Selecione...</S.Option>
                                <S.Option value={prop}>{prop}</S.Option>
                            </>
                        )
                    }
                    if (prop === "Ações") {
                        return (
                            <S.Option value={"Pagina"}>{"Pagina"}</S.Option>
                        )
                    }
                    return (
                        <S.Option value={prop}>{prop}</S.Option>
                    )
                })}
                {displayFilter && //Arrumar CSS
                    <InputStringField
                        placeholder='Buscar...'
                        inputSearch
                        iconRight={<SearchIcon />}
                        onChange={(e) => displayFilter(e.target.value)}
                    />
                }
            </S.Select>
        </S.Wrapper>
    )
}

export default forwardRef(Select);