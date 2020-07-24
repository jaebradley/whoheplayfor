import 'core-js/stable';
import 'regenerator-runtime';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';

import App from '@App/App';

ReactDOM.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
  document.getElementById('root') as HTMLElement,
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/serviceWorker.js')
      .then((registration) => {
        console.log('SW registered', registration);
      })
      .catch((error) => {
        console.log('error', error);
      });
  });
}
