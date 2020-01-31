import React from 'react';
import { render } from 'react-snapshot';
import './index.css';
import 'normalize.css';
import loadable from '@loadable/component'

const App = loadable(() => import("./App"));

render(
    <App/>,
    document.getElementById('root')
  );