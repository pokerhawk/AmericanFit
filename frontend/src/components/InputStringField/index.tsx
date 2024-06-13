import { ForwardRefRenderFunction, InputHTMLAttributes, forwardRef } from 'react';
import * as S from './styles';

export type InputProps = {
    label?: string,
    error?: string,
    pattern?: string,
    iconLeft?: React.ReactNode,
    iconRight?: React.ReactNode,
    inputError?: boolean,
    inputCommom?: boolean,
    inputSearch?: boolean,
}

type InputProperties = InputProps & InputHTMLAttributes<HTMLInputElement>;

const InputStringField: ForwardRefRenderFunction<HTMLInputElement, InputProperties> = ({
    label, error, iconLeft, iconRight, inputCommom, inputSearch, inputError, ...props
}, ref) => {
    return (
        <S.Wrapper>
            {error ? <S.Error>{label}</S.Error> : (label ? <label>{label}</ label> : '')}
            <S.InputWrapper
                inputError={inputError}
                inputSearch={inputSearch}
            >
                {iconLeft ? <S.Icon>{iconLeft}</S.Icon> : ''}
                {<S.Input
                    ref={ref}
                    {...props}
                />}
                {iconRight ? <S.Icon>{iconRight}</S.Icon> : ''}
            </S.InputWrapper>
            {error && <S.Error>{error}</S.Error>}
        </S.Wrapper>

    );
}

export default forwardRef(InputStringField);
