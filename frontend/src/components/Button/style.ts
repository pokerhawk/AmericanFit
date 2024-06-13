import styled, { DefaultTheme, css } from 'styled-components';
import { ButtonProps } from '.';
import media from 'styled-media-query';
import theme from '../../styles/styled-theme';

export const buttonModifiers = {
    
    socialButton: (theme: DefaultTheme) => css`
        padding: 5px 5px;
        background-color: ${theme.color.blue};
        color: ${theme.color.white};
        border: 1px solid ${theme.color.blue};
    `,

    textButton: (theme: DefaultTheme) => css`
        background-color: ${theme.color.white};
        color: ${theme.color.purple};
        border: none;
        width: auto;
        height: auto;

        ${media.lessThan('small')`
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
        `}
    `,

    titleButton: (theme: DefaultTheme) => css`
    background-color: ${theme.color.white};
    color: ${theme.color.blue};
    border: none;
    width: auto;
    height: auto;
    text-decoration: underline;

        ${media.lessThan('small')`
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
        `}
    `,

    reportButton: () => css`
        width: fit-content;
        height: 30px;
        padding: 10px 4px;
        border-width: 0;
        gap: 10px;
        background: ${theme.color.blue};
        color: ${theme.color.white};
        font-size: 15px;
    `,

    returnButton: () => css`
        padding: 6px;
        border: 1px solid ${theme.color.darkGray};
        height: 34px;
        width: 82px;
        gap: 5px;
        background: ${theme.color.white};
        color: ${theme.color.darkGray};
        font-size: 16px;
    `,

    commomButton: (theme: DefaultTheme) => css`
        background-color: ${theme.color.white};
        color: ${theme.color.black};
        border: 1px solid ${theme.color.black};
        border-radius: 8px;
        display: flex;
        flex-direction: row;
        gap: 13px;
        align-items: center;
        justify-content: center;
        width: auto;
        padding: 10px;
    `,

    exportExcelButton: () => css`
        display: flex;
        align-items: flex-start;
        
        border: 1px solid ${theme.color.darkGray};
        
        padding: 6px;
        gap: 5px;
        width: auto;
        height: fit-content;
        line-height: 20px;
        font-size: 14px;

        color: ${theme.color.darkGray};
        background: ${theme.color.white};
    `
}

type ButtonTypesProps = 'socialButton' | 'textButton' | 'titleButton' | 'reportButton' | 'returnButton' | 'commomButton' | 'exportExcelButton';

export type StyledButtonProps = {} & Pick<ButtonProps, ButtonTypesProps>

export const Button = styled.button<StyledButtonProps>`
    ${({ theme, socialButton, titleButton, textButton, reportButton, returnButton, commomButton, exportExcelButton }) => css`
        display: flex;
        border-radius: 8px;
        width: 100%;   
        height: 40px;
        flex-direction: row;
        gap: 12px;
        align-items: center;
        justify-content: center;
        font-size: ${theme.font.sizes.xsmall};
        font-style: normal;
        font-weight: ${theme.font.bold};
        line-height: 24px;
        cursor: pointer;
        ${!!textButton && buttonModifiers.textButton(theme)}
        ${!!socialButton && buttonModifiers.socialButton(theme)}
        ${!!titleButton && buttonModifiers.titleButton(theme)}
        ${!!reportButton && buttonModifiers.reportButton()}
        ${!!returnButton && buttonModifiers.returnButton()}
        ${!!commomButton && buttonModifiers.commomButton(theme)}
        ${!!exportExcelButton && buttonModifiers.exportExcelButton()}

        ${media.lessThan("small")`
            margin: 5px 0px; 
        `}
    `}
`;  