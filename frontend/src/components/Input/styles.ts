import styled, { DefaultTheme, css } from "styled-components";
import theme from "../../styles/styled-theme";
import { TInputProperties } from ".";

export const inputWrapperModifiers = {
    inputError: (theme: DefaultTheme) => css`
        border: 1px solid ${theme.color.error};
    `,

    inputSearch: () => css`
        background: white;

        width: 100%;
        height: 50%;
        padding: 0;
        
        border: 1px solid ${theme.color.lightGray};

        &>input {
            width: 80%;
            height: 20px;
        }
        
        svg {
            padding-bottom: 5px;
        }
    `

}

type InputProps = 'inputError' | 'inputSearch';

export type InputWrapperProps = {} & Pick<TInputProperties, InputProps>;

export const InputWrapper = styled.div<InputWrapperProps>`
    ${({ theme, inputError, inputSearch }) => css`
        display: flex;
        align-items: center;

        width: 100%;
        padding: 10px 14px;
        border-radius: 8px;

        border: 1px solid ${theme.color.black};
        ${!!inputError && inputWrapperModifiers.inputError(theme)}
        ${!!inputSearch && inputWrapperModifiers.inputSearch()}
    `}
`;

export const Input = styled.input`
    display: flex;
    
    padding: 8px 12px;
    width: 100%;
    
    font-style: normal;
    
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    
    border: none;

    &:focus{
        outline: none;
    }

    &:active{
        background-color: ${theme.color.white}
    }
`;

export const Icon = styled.i`
    margin: 3px;
    width: 16px;
    height: 16px;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    gap: 6px;
    width: 100%;
    height: 100%;
`;

export const Error = styled.p`
    font-style: normal;

    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    
    margin: 0;
    
    color: ${theme.color.error};
`;