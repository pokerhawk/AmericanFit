import styled from "styled-components";
import theme from "./styled-theme";

export const Section = styled.section `
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 24px 32px;
    width: 75%;
    gap: 20px;
    border-radius: 12px;
    border: 1px solid var(--gray-200, ${theme.color.black});
    background: var(--base-white, ${theme.color.white});
`

export const Header = styled.header `
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

export const Pagination = styled.div `
    display: flex;
    flex-direction: column;
    justify-self: center;
    justify-content: center;
    width: auto;
    padding: 5px 10px;
    border-radius: 12px;
    border: 1px solid var(--gray-200, ${theme.color.black});
`

export const Wrapper = styled.div `
    .rdt_TableHeadRow{
        display: flex;
        background: var(--gray-50, ${theme.color.white});
        min-height: 0px;
    }
    .rdt_TableCol{
        display: flex;
        align-self: stretch;
        height: 40px;
        justify-content: center;
        border-top: 1px solid var(--gray-200, ${theme.color.black});
        border-bottom: 1px solid var(--gray-200, ${theme.color.black});
    }
    .rdt_TableCell{
        display: flex;
        justify-content: center;
        align-self: center;
        height: 60px;
        width: 100%;
        font-family: Inter;
        font-size: 14px;
        line-height: 18px;
        font-style: normal;
        font-weight: 600;
        border-bottom: 1px solid var(--gray-200, ${theme.color.black});
    }
    .rdt_TableCol_Sortable{
        display:flex;
        color: var(--gray-600, ${theme.color.xgray});
        font-family: Inter;
        font-size: 1rem;
        font-style: normal;
        font-weight: 600;
        line-height: 18px;
    }
    display: flex;
    flex-direction: column;
    width: 100%;
    background: var(--base-white, ${theme.color.white});
    border-right: 1px solid var(--gray-200, ${theme.color.black});
    border-left: 1px solid var(--gray-200, ${theme.color.black});
    border-bottom: 1px solid var(--gray-200, ${theme.color.black});
`

export const SimpleWrapper = styled.div `
    display: flex;
`

export const ModalWrapper = styled.div `
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

export const FooterWrapper = styled.footer `
    display: flex;
`