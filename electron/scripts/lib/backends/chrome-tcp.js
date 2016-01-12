import 'text-encoding';
import uuid from 'uuid';
import Debug from 'debug';
import {TCPServer} from '../tcp';

const textEncoder = new TextEncoder();
const backendLog = Debug('eshttp:backend-cordova');
export default {
  stringToBuffer(str){
    backendLog('Encoding to buffer', str);
    return textEncoder.encode(str).buffer;
  },

  stringToSocketData(str){
    backendLog('Encoding to socket data', str);
    return textEncoder.encode(str).buffer;
  },

  createServerHandle(httpServer){
    console.log('creating server handle', httpServer);
    const handle = new TCPServer();

    handle.on('connection', client => {
      backendLog('New connection', client);
      client.on('data', data => httpServer._dataHandler(client, data));
      client.on('end', data => httpServer._endHandler(client, data));
      httpServer._connectionHandler(client);
    });

    return handle;
  },

  listen(handle, port){
    handle.listen(port);
  },

  unlisten(handle){
    handle.close();
  },

  sendAndClose(socket, arrayBuffer){
    socket.close(arrayBuffer);
  },

  // I think this applies only to a client socket.
  // not sure though.
  close(socket){
    socket.close();
  },

  send(socket, arrayBuffer){
    socket.send(arrayBuffer);
  },

  // dunno what this is for.
  connect(handle, ip, port){
    throw new Error('Unimplemented');
  },

  // This should be done soon.
  // should be more or less same as the server
  // socket guy, maybe we should abstract client and
  // server sockets into classes ?
  createClientHandle(){
    throw new Error('Unimplemented');
  }
}
