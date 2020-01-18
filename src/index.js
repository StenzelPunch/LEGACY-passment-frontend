import React from 'react';
import { render } from 'react-snapshot';
import App from './App';
import './index.css';
import 'normalize.css';

render(
    <App/>,
    document.getElementById('root')
  );