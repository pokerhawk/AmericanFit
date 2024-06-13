import styled, { DefaultTheme, css } from "styled-components";
import theme from "../../styles/styled-theme";
import { InputProps } from ".";

export const inputWrapperModifiers = {
    inputError: (theme: DefaultTheme) => css`
        border: 1px solid ${theme.color.error};
    `,

    inputSearch: () => css`
        background: white;

        width: 100%;
        height: 50%;
        padding: 0;
        
        border: 1px solid ${theme.color.darkGray};

        &>input {
            width: 80%;
            height: 20px;
        }
        
        svg {
            padding-bottom: 5px;
        }
    `

}

type InputProperties = 'inputError' | 'inputSearch';

export type InputWrapperProps = {} & Pick<InputProps, InputProperties>;

export const InputWrapper = styled.div<InputWrapperProps>`
    ${({ theme, inputError, inputSearch }) => css`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 5px;
        border-radius: 8px;

        border: 2px solid ${theme.color.lightGray};
        ${!!inputError && inputWrapperModifiers.inputError(theme)}
        ${!!inputSearch && inputWrapperModifiers.inputSearch()}
    `}
`;

export const Input = styled.input`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 5px;
    font-style: normal;
    font-size: 16px;
    font-weight: 400;
    width: 100%;
    border: none;

    &:focus{
        outline: none;
    }
    &:active{
        background-color: ${theme.color.white}
    }
`;

export const Icon = styled.i`
    display: flex;
    align-items: center;
    justify-content: center;
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