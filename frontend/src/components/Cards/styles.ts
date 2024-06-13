import styled, { css } from "styled-components";
import theme from "../../styles/styled-theme";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 10px;
    gap: 10px;
    width: 200px;
    height: 100px;
    border-radius: 10px;

    border: 1px solid black;
`;

export const Label = styled.p`
    display: flex;
    justify-content: center;
    text-align: center;

    ${({ theme }) => css`
        font-size: 16px;
        font-weight: ${theme.font.xbold};
    `}
`;

export const Value = styled.p`
    display: flex;
    justify-content: center;
    color: ${theme.color.blue};
    font-size: 24px;
    font-weight: ${theme.font.xbold};
`;
