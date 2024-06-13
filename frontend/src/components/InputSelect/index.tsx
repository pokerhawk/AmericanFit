import { ForwardRefRenderFunction, SelectHTMLAttributes, forwardRef } from 'react';
import * as S from './styles';

type TOption = {
    name: string
    value: string | number
}

type TInputSelect = {
    optionsList: TOption[]
}

type TSelectProps = TInputSelect & SelectHTMLAttributes<HTMLSelectElement>;

const InputSelect: ForwardRefRenderFunction<HTMLSelectElement, TSelectProps> = ({ optionsList, ...props }: TSelectProps, ref) => {
    return (
        <S.Wrapper>
            <S.Select
                name=''
                ref={ref}
                {...props}
            >
                {
                    optionsList.map(optionInList => {
                        return (
                            <option
                                value={optionInList.value}
                            >
                                {optionInList.name}
                            </option>
                        );
                    })
                }
            </S.Select>
        </S.Wrapper>
    );
}

export default forwardRef(InputSelect);