import styled from "styled-components";
import theme from "../../styles/styled-theme";

export const HeaderWrapper = styled.header `
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 25px 5px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
    background: ${theme.color.white};
    z-index: 1000;
`;


export const BackButtonWrapper = styled.div `
    display: flex;
    margin-right: auto;
`;

export const TitleWrapper = styled.div `
    display: flex;
    position: absolute;
`;

export const LogOutWrapper = styled.div `
    display: flex;
    margin-left: auto;
`;