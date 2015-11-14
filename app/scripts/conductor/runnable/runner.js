import _ from 'lodash';
import EventEmitter2 from 'eventemitter2';
import Promise from 'bluebird';
import work from 'webworkify';
import RunWorker from './worker';

class Runner{
    constructor(opts){
        this.opts = opts;
        this.events = new EventEmitter2();
        this.__code = '';
        this.__worker = work(RunWorker);
        console.log("worker up");
        this.__worker.onerror = function(){
            console.error(arguments);
        }
    }

    __output(payload){
        this.events.emit('run.output', payload);
    }

    __error(payload){
        this.events.emit('run.error', payload);
    }

    postMessage(data){
        let strData = JSON.stringify(data);
        this.__worker.postMessage(strData);
    }

    setCode(code){
        console.log("Set code");
        this.postMessage({
            type: 'code-update',
            code
        });
    }

    run(runtimeOpts){
        let compiledOpts = _.assign(this.opts, runtimeOpts);
        this.postMessage({
            type: 'execute-code',
            compiledOpts
        });
    }
};

export default Runner;
