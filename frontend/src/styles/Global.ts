import styled, { createGlobalStyle, css } from "styled-components";
import media from "styled-media-query";
import theme from "./styled-theme";

export const GlobalStyles = createGlobalStyle`
    ${({ theme }) => css`
        * {
            font-family: ${theme.font.family};
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
    `}
`;

export const PageWrapper = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    width: 100%;
    height: 100%;
    background-color: ${theme.color.white};
`;

export const SimpleWrapper = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 25px;
    padding-bottom: 20px;
`;

export const SignPageWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100vw;
    height: 100vh;

    ${media.lessThan("medium")`
        padding: 8px;
    `}
`;

export const FormWrapper = styled.div`
    width: 420px;
    padding-top: 32px;

    ${media.lessThan("small")`
        width: 350px;
        margin: 8px 16px;   
    `}
`;

export const ComponentWrapper = styled.div`
    display: flex;
`;

export const CardWrapper = styled.div `
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 5vw;
    padding-bottom: 2%;
    background: #FBFBFF;
`;

export const Aside = styled.aside`
    display: flex;
    flex-direction: column;
    position: relative;
    right: 0;
    padding-right: 50px;
    padding-top: 100px;
`

export const ColumnWrapper = styled.div`
    display: flex;
    flex-direction: column;

`

export const RowWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 2px;
    gap: 15px;
`