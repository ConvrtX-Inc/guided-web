import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import './fonts/Gilroy/Gilroy-FREE/Gilroy-Light.otf';
import Admin from './components/Admin/Dashboard/admin';
//import './fonts/Gilroy/Gilroy-FREE/Gilroy-ExtraBold.otf';

ReactDOM.render(
  <React.StrictMode>
    <Admin />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
