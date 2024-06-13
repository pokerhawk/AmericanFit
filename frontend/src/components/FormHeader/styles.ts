import styled from "styled-components";
import media from "styled-media-query";

export const Header1 = styled.h1`
    ${media.lessThan("small")`
        font-size: x-large;
    `}
`;

export const Header3 = styled.h3`
    ${media.lessThan("small")`
        font-size: small;
    `}
`;
