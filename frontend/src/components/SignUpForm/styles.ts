import styled from 'styled-components';
import media from 'styled-media-query';

export const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
`;

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 20px;
`;

export const HeaderWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const FormWrapper = styled.div`
    width: 420px;

    ${media.lessThan("small")`
        width: 350px;
    `}
`;

export const InternalFormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 24px;
`;

export const CheckboxWrapper = styled.div`
    display: flex;
    flex-direction: column;

    gap: 8px;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
`;

export const SignInOptionWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 8px;
`;