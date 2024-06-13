import * as S from './styles';
import { ReactNode, useState } from "react";

export type SelectTagProps = {
    label:string;
    options: string[];
    placeholder: string;
    handleOnChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectTag = ({ 
    label, options, placeholder, handleOnChange
}:SelectTagProps) => {
    return (
        <S.Wrapper>
            <label htmlFor={label}>{label}</label>
            <S.Select name={label} onChange={handleOnChange}>
                {
                    placeholder && <option value={''} disabled selected>{placeholder}</option>
                }
                {
                    options.map(prop=>{
                        return (
                            <option value={prop}>{prop}</option>
                        )
                    })
                }
            </S.Select>
        </S.Wrapper>
    );
}

export default SelectTag;
