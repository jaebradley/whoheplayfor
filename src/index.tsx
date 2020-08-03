import 'core-js/stable';
import 'regenerator-runtime';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

import App from '@App/App';
import theme from '@App/styles/theme';

ReactDOM.render(
  <RecoilRoot>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </RecoilRoot>,
  document.getElementById('root') as HTMLElement,
);

if (process.env.NODE_ENV !== 'development') {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        // In production, jaebradley.github.io is the base URL so need to force it to fetch from the whoheplayfor repo
        .register('/whoheplayfor/serviceWorker.js')
        .then((registration) => {
          console.log('SW registered', registration);
        })
        .catch((error) => {
          console.log('error', error);
        });
    });
  }
}
