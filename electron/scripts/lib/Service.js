import _ from 'lodash';
import mdns from 'mdns-js';
import {EventEmitter} from 'events';


// If cordova is defined use our
// custom backend over this one.
if( window && window.cordova ){
  const backend =  require('eshttp/lib/backend');
  const chromeBackend = require('./backends/chrome-tcp').default;
  backend.setBackend(chromeBackend);
}else {
  const backend =  require('eshttp/lib/backend');
  const nodeBackend =  window.require('eshttp/backend/backend-node');
  backend.setBackend(nodeBackend);
}

const eshttp = require('eshttp/lib/eshttp');
const response = new eshttp.HttpResponse(200, {
  'x-served-by': 'ESHTTP'
}, `hello world from ${window.device?device.platform:'Node'}`);

console.log(response);
// Connect over HTTP and talk like a boss !
// since everyone knows each other we can Currently
// rely on http web hooks, for processing. but i seriously
// intend to upgrade to SSE or even better WebSockets in
// future.

export class PeerHTTP{
  constructor(service){
    this.service = service;
  }
}


// The following class creates a HTTP Server
// and advertises it over ZeroConf on both the
// clients node and phonegap all communication
// occurs over HTTP 1.0 / 1.1
export class ZeroConfService extends EventEmitter{
  constructor(config){
    super();
    this.config = config;
    this.server = new eshttp.HttpServer();

    setTimeout(()=>{
      this.server.listen(config.portBase);
    }, 200);

    this.server.onrequest = request => this.onRequest(request);
    this.peers = {};
    this.advertise();
  }

  __advertiseOnCordova(){
      const serviceType =  '_http._tcp.local.';
      const config = this.config;
      console.log('zconf: hosting at ' + JSON.stringify(config));
      ZeroConf.register(
        serviceType,
        config.serviceName,
        config.portBase,
        'Hello World'
      );
  }

  __browseOnCordova(){

  }

  __advertiseOnNode(){
    this.ad = mdns.createAdvertisement(
      mdns[config.protocol](config.serviceName),
      config.portBase
    );
    this.ad.start();
  }

  __browseOnNode(){
    this.browser = mdns.createBrowser(
      mdns[config.protocol](config.serviceName)
    );

    this.browser.on('serviceUp',
      (service) => this.onServiceDiscovered(service)
    );

    this.browser.on('serviceDown',
      (service) => this.onServiceLost(service)
    )
    this.browser.start();
  }

  advertise(){
      if( window && window.cordova ){
        return this.__advertiseOnCordova();
      }
      // return this.__advertiseOnNode();
  }

  createBrowser(){
      if( cordova ){
        return this.__browseOnCordova();
      }
      return this.__browseOnNode();
  }

  onRequest(request){
    // console.log('Request', request);
    request.respondWith(response);
  }

  onServiceDiscovered(service){
    const peer = new Peer(service);
    this.peers.push(peer);
    this.emit('peer.up', peer);
  }

  onServiceLost(service){
    const peer = service;
    this.peers = this.peers.filter(
      peer => peer.service.fullname !== service.fullname
    );
    this.emit('peer.down', peer);
  }
}


export class Service{
  constructor(config){
    this.service = new ZeroConfService(config);
  }
}
