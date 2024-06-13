import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    
    max-width: 100px;
    width: 100%;
    height: fit-content;
    gap: 8px;
`;

export const Select = styled.select`
    border-color: #D0D5DD;

    border-radius: 5px;
    height: 30px;

    &:focus-within {
        outline: 2px solid #2c9038;
    }
`;