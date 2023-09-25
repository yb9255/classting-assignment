import { createGlobalStyle } from 'styled-components';

const GlobalStyleProvider = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.brightPrimaryColor};
    font-family: "source-han-sans-korean", sans-serif;
    font-weight: 400;
    font-style: normal;  
    color: #000000c4;  
  }
`;

export default GlobalStyleProvider;
