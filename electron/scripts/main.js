import 'babel-polyfill';
import DOM from 'react-dom';
import React from 'react';
import App from './components/App';
import {ZeroConfService} from './lib/Service';
const _console = console;
if( window && window.cordova ){
  document.addEventListener('deviceready', function(){
    window.console = _console;
    window.zc = new ZeroConfService({
      portBase: 4322,
      serviceName: 'Phone Server - HTTP',
      protocol: 'tcp'
    });
  });
}else{
  window.zc = new ZeroConfService({
    portBase: 4322,
    serviceName: 'Web Server - HTTP',
    protocol: 'tcp'
  });
}

// else{
//   new ZeroConfService({
//     portBase: 4322,
//     serviceName: 'zs',
//     protocol: 'tcp'
//   });
// }

DOM.render(<App />, document.getElementById('foo'));
