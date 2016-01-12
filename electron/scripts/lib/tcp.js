/*
Copyright 2012 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Author: Renato Mangini (mangini@chromium.org)
*/
import {EventEmitter} from 'events';
import Debug from 'debug';

const serverLog = Debug('tcp:Server');
const connLog = Debug('tcp:Connection');
const ServerSocket = chrome.sockets.tcpServer;
const ConnectionSocket = chrome.sockets.tcp;


const noop = () => {};

export class TCPServer extends EventEmitter{
  constructor({maxConnections = 5}={}){
    super();
    this.socketId = -1;
    this.addr = '';
    this.port = '';
    this.clients = [];

    this._handleAccept = this._handleAccept.bind(this);
    this._handleAcceptError = this._handleAcceptError.bind(this);

    ServerSocket.onAccept.addListener(this._handleAccept);
    ServerSocket.onAcceptError.addListener(this._handleAcceptError);

    serverLog('Attempting to open socket');
    ServerSocket.create({},
      createInfo => this._socketCreated(createInfo)
    );
  }

  get isUsable(){
    return this.socketId > -1;
  }

  _socketCreated({socketId}){
    if( socketId < 0 ){
      serverLog('Socket Listening failure');
      return;
    }
    this.socketId = socketId;
    serverLog('Socket Successfully connected');
  }

  _handleAccept({socketId, clientSocketId}){
    if( socketId !== this.socketId ){
      return;
    }

    serverLog('New connection');
    const tcpConnection = new TCPConnection(clientSocketId, this);
    this.clients.push(tcpConnection);

    tcpConnection.once('info',
      () => this.emit('connection', tcpConnection)
    );

    tcpConnection.once('close', () => {
      this.clients = this.clients.filter(
        tc => tc.socketId !== tcpConnection.socketId
      );
    });

    tcpConnection.requestSocketInfo();
  }

  _handleAcceptError({socketId, errorCode}){
    // this.close();
    if( socketId !== this.socketId ){
      return;
    }
    serverLog('Error accepting new connections CODE:' + errorCode);
    this.emit('error', new Error(errorCode));
    ServerSocket.setPaused(this.socketId, false, () => {
      serverLog('Listening for new connections is resumed');
    });
  }

  listen(port=8080, addr='0.0.0.0'){
    this.addr = addr;
    this.port = port;
    serverLog(`Now trying to listen on ${addr}:${port}`);
    ServerSocket.listen(
      this.socketId, this.addr, this.port,
      result => this._listenCallback(result)
    );
  }

  _listenCallback(result){
    if( result < 0 ){
      serverLog('Socket could not listen, error : ', result);
      this.emit('error', result);
      return;
    }
    serverLog('Socket is now listening for open connections');
    this.emit('listening');
  }

  close(callback = noop){
    serverLog('Closing socket');
    ServerSocket.onAccept.removeListener(this._handleAccept);
    ServerSocket.onAcceptError.removeListener(this._handleAcceptError);
    this.once('close', callback);

    ChromeSocketServer.close(this.socketId, () =>{
      serverLog('Socket successfully closed');
      this.socketId = -1;
      this.emit('close');
    });
  }

  getConnections(callback = noop){
    setImmediate(() => callback(null, this.clients));
  }
}

export class TCPConnection extends EventEmitter{
  constructor(socketId, owner = null){
    super();
    this.socketId = socketId;
    this.owner   = owner;
    connLog('Connection created for socket id ');
    this._handleRecieveError = this._handleRecieveError.bind(this);
    this._handleRecieve = this._handleRecieve.bind(this);
    this._handleWrite = this._handleWrite.bind(this);
    this._close = this._close.bind(this);


    ConnectionSocket.onReceive.addListener(this._handleRecieve);
    ConnectionSocket.onReceiveError.addListener(this._handleRecieveError);

    // Once info is recieved
    // start listening for data
    // by this time the user should
    // already have added a .data event
    // follow the way node does.
    this.once('info', () =>{
      setImmediate(() => {
          ConnectionSocket.setPaused(this.socketId, false, () =>{
            connLog('connection socket can now receive data');
          });
      });
    });

  }


  get isUsable(){
    return this.socketId > -1;
  }

  // Write data down the pipe
  send(u8){
    connLog('Sending data');
    ConnectionSocket.send(this.socketId, u8, this._handleWrite);
  }

  _close(){
    connLog('Closing connection');
    ConnectionSocket.onReceive.removeListener(this._handleRecieve);
    ConnectionSocket.onReceiveError.removeListener(this._handleRecieveError);
    ConnectionSocket.close(this.socketId, () => {
      this.emit('close');
      this.socketId = -1;
    })
  }

  close(u8){
    if( u8 ){
      connLog('Sending data');
      ConnectionSocket.send(this.socketId, u8, this._close);
    }
    this._close();
  }

  _handleWrite(info){
    this.emit('write', info);
  }

  _handleRecieve({socketId, data}){
    data = new Uint8Array(data);
    connLog('data received');
    if( socketId !== this.socketId ){
      return;
    }
    connLog('data was handled');
    this.emit('data', data);
  }

  _handleRecieveError({socketId, resultCode}){
    if( socketId !== this.socketId ){
      return;
    }

    // Remote peer sent the FIN packet
    if( resultCode === -2 ){
      connLog('Socket closed by remote peer');
      this.emit('end');
      return;
    }

    connLog('Error on socket Code:' + resultCode);
    this.had_error = true;
    this.emit('error', new Error(resultCode));
    this.close();
  }

  requestSocketInfo(){
    ConnectionSocket
      .getInfo(this.socketId, (info) => {
        this.meta = info;
        this.emit('info', info);
      });
  }
}
