import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
`;

export const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 15px;
`;

export const AddressWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 500px;
    gap: 10px;
    padding: 10px;
`;

export const ModalWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const SaleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 306px;
    gap: 10px;
    padding: 10px;
`;

export const OptionsWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
`;

export const SignupOptionWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 8px;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: inherit;
`;

export const Error = styled.p`
    font-size: 12px;
    color: #d93f21;
    margin-bottom: -30px;
`;