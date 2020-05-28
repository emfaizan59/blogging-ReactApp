import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import WebFont from 'webfontloader';
// WebFont.load({
//     google: {
//       families: ['Titillium Web:300,400,700', 'sans-serif']
//     }
//   });
var WebFont = require('webfontloader');

// This will make sure WebFont.load is only used in the browser.
if (typeof window !== "undefined") {
  WebFont.load({
    google: {
        families: ['Fira Sans Extra Condensed']

    }
  });
}  

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
