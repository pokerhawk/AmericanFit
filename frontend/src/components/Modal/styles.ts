import styled from "styled-components";
import theme from "../../styles/styled-theme";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`

export const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1000;

    background-color: rgb(0, 0, 0, 0.5);
`;

export const Modal = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 50%;
    left: 50%;
    border-radius: 10px;
    width: 90%;
    height: 80%;
    transform: translate(-50%, -50%);
    background-color: ${theme.color.white};
`;

export const ModalHeader = styled.header`
    display: flex;
    flex-direction: row;
    justify-self: start;
    justify-content: space-between;
    padding: 10px 10px;
`

export const ModalContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 20px
`

export const H1 = styled.h1`
    border-bottom: 2px solid black;
`