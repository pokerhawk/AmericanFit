import styled from 'styled-components';
import media from 'styled-media-query';

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 420px;
    gap: 32px;
`;

export const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
`;

export const InternalFormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 24px;
`;

export const InputFormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
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
    width: 100%;
`;

export const Error = styled.p`
  font-size: 12px;
  color: #d93f21;
  margin-bottom: -30px;
`