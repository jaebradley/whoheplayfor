import { createGlobalStyle } from 'styled-components';

import theme from '@App/styles/theme';

const global = createGlobalStyle`
  body {
    margin: 0;
    background-color: ${theme.primary};
  }  
`;

export default global;
