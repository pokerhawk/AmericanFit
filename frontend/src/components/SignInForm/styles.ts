import styled from 'styled-components';
import theme from '../../styles/styled-theme';

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: center;
    max-width: 420px;
    gap: 20px;
`;

export const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
`;

export const InputFormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
    width: 100%;
`;

export const SignupOptionWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 5px 25px;
    gap: 8px;
`;

export const Error = styled.p`
    font-size: 12px;
    color: ${theme.color.error};
    margin-bottom: -30px;
`