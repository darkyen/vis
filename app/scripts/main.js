import 'babel-polyfill';
import DOM from 'react-dom';
import React from 'react';

let App = require('./components/App');
DOM.render(<App />, document.getElementById('foo'));
