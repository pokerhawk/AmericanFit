import styled from "styled-components";
import theme from "../../styles/styled-theme";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 6px;
`

export const Select = styled.select`
    display: flex;
    min-width: 80px;
    width: 100%;
    padding: 13px 5px;
    padding-right: 30px;
    background-color: ${theme.color.white};
    border: 1px solid ${theme.color.lightGray};
    border-radius: 8px;
    color: ${theme.color.black};
    cursor: pointer;
`

export const Option = styled.option`
    display: flex;
`

export const FilterWrapper = styled.select`
    display: flex;
    flex-direction: row;
`