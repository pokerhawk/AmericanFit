import styled, { css } from 'styled-components'

export type ButtonProps = {
  isActive?: boolean
}

const ButtonModifiers = {
  isActive: () => css`
    border: blue;
    background: white;
    cursor: pointer;
  `
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: space-between;
  background-color: white;
  padding: 5px;
`

export const ListPage = styled.ul`
  display: flex;
  list-style: none;
  justify-content: center;
  gap: 20px;
`

export const ItemPage = styled.button<ButtonProps>`
  ${({ theme, isActive }) => css`
    border: 1px solid ${theme.colors.bluishGray};
    background: ${theme.colors.aquaBlue};
    border-radius: 100%;
    padding: 5px 12px;
    ${isActive && ButtonModifiers.isActive()}
  `}
`