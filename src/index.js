import React from 'react';
import App from './App';
import './i18n';
import './index.css';
import 'normalize.css';

import { hydrate, render } from "react-dom";

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}