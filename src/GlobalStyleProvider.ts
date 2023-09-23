import { createGlobalStyle } from 'styled-components';

const GlobalStyleProvider = createGlobalStyle`
  body {
    background-color: #fbebe4;
    font-family: "source-han-sans-korean", sans-serif;
    font-weight: 400;
    font-style: normal;    
  }
`;

export default GlobalStyleProvider;
