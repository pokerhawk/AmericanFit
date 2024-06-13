import { ForwardRefRenderFunction, InputHTMLAttributes, forwardRef } from 'react';
import * as S from './style';

type CheckboxInputProps = {
    isMultipleOption?: boolean;
    canSelectMultipleOptions?: boolean;
    checkboxTitle: string;
    checkboxData?: Array<string>;
}

type CheckboxInput = CheckboxInputProps & InputHTMLAttributes<HTMLInputElement>;

const CheckboxInput: ForwardRefRenderFunction<HTMLInputElement, CheckboxInput> = ({ isMultipleOption, canSelectMultipleOptions, checkboxTitle, checkboxData, ...props }, ref) => {
    return (
        <S.Wrapper>
            {(isMultipleOption && !canSelectMultipleOptions) &&
            <S.Wrapper>
                <S.h3>{checkboxTitle}</S.h3>
                {checkboxData?.map(prop=>{
                        return(
                            <S.SimpleWrapper>
                                <S.Input type='radio' value={prop} name='RadioGroup' ref={ref} {...props}/> 
                                {prop}
                            </S.SimpleWrapper>
                        )
                    })
                }
            </S.Wrapper>
            }
            {(!isMultipleOption && !canSelectMultipleOptions) &&
                <S.SimpleWrapper>
                    <S.Input type='checkbox' value={checkboxTitle} ref={ref} {...props}/>
                    {checkboxTitle}
                </S.SimpleWrapper>
            }
            {(isMultipleOption && canSelectMultipleOptions) &&
            <S.Wrapper>
                <S.h3>{checkboxTitle}</S.h3>
                {checkboxData?.map(prop=>{
                        return(
                            <S.SimpleWrapper>
                                <S.Input type='checkbox' value={prop} ref={ref} {...props}/> 
                                {prop}
                            </S.SimpleWrapper>
                        )
                    })
                }
            </S.Wrapper>
            }
        </S.Wrapper>
    );
}

export default forwardRef(CheckboxInput);
