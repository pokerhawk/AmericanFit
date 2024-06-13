import styled, { css } from "styled-components";
import theme from "../../styles/styled-theme";

export const WrapperPagination = styled.div `
    display: flex;
    align-items: flex-start;
    gap: 10px;
    :hover {cursor: pointer}
`

export const ArrowLeftPagination = styled.button `
    display: flex;
    padding: 8px;
    justify-content: center;
    align-items: center;
    gap: 12px;
    border-radius: 50%;
    border: 1px solid ${theme.color.black};
    background: ${theme.color.white};
    
    /* Background blur/sm */
    /* backdrop-filter: blur(4px); */
`
export const ArrowRightPagination = styled.button `
    display: flex;
    padding: 8px;
    justify-content: center;
    align-items: center;
    gap: 12px;
    border-radius: 50%;
    border: 1px solid ${theme.color.black};
    background: ${theme.color.white};

    /* Background blur/sm */
    backdrop-filter: blur(4px);
`

export const Ellipse41Icon = styled.div `
    width: 36px;
    height: 36px;
    fill: #1570EF;
`

export const Ellipse42Icon = styled.div `
    width: 36px;
    height: 36px;
    fill: #EAECF0;
`

export const WrapperPaginationNumbers = styled.div `
    display: flex;
    height: 14px;
    align-items: flex-start;
    gap: 10px;
`

type ButtonPaginationProps = {
    current?: boolean
  }
  
  const buttonPaginationModifiers = {
    current: () => css`
      background: ${theme.color.blue};
      border-radius: 50%;
      color: ${theme.color.white};
    `,
    notCurrent: () => css`
        background: ${theme.color.gray};
        border-radius: 50%;
        color: #${theme.color.black};
    `
  }

export const ButtonPagination = styled.button<ButtonPaginationProps> `

    ${({ current }) => css`
        all: unset;
        cursor: pointer;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 9px 16px;
        gap: 8px;

        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        transition: all 0.2s ease-in-out;
        white-space: nowrap;
        ${!!current && buttonPaginationModifiers.current()}
        ${!current && buttonPaginationModifiers.notCurrent()}
    `}
`