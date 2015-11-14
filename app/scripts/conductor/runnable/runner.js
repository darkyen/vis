import _ from 'lodash';
import Promise from 'bluebird';
import work from 'webworkify';
import RunWorker from './worker';
import {errorOccured, outputOccured} from '../../actions/ideActions';

var babel = require('babel-core');

class Runner{
    constructor(opts){
        this.opts = opts;
        this.__code = '';
        this.__worker = work(RunWorker);
        console.log("worker up");
        this.__worker.onerror = function(){
            console.error(arguments);
        }
        this.__worker.onmessage = (ev) => this.__handleMessage(ev);
    }

    __handleMessage(ev){
        clearTimeout(this.__timeout);

        let e = JSON.parse(ev.data);
        let {eventType, payload} = e;
        switch (eventType){
            case 'output':
                this.__output(payload);
            break;
            case 'error':
                this.__error(payload);
            break;
        }
    }
    __output({output}){
        outputOccured(output);
    }

    __error({error}){
        errorOccured(error);
    }

    postMessage(eventType, data){
        let strData = JSON.stringify({
            eventType: eventType,
            payload: data
        });
        this.__worker.postMessage(strData);
    }

    setCode(code){
        console.log("This might hang the browser");
        code = `
        let output = [];
        let console = {
            log: (argument) => output.push(argument)
        }
        try{
            ${code}
        }catch(e){
            console.log(e.message);
        }
        output;`

        try{
            code = babel.transform(code).code;
        }catch(e){
            setTimeout( t => this.__error({
                message:"The compiled code cannot run in this state ,\nyou might have an identifier field without \n a name or such syntactical errors"
            }), 100);
        }

        this.postMessage('set-code', {code});
        this.__timeout = setTimeout(t => this.handleTimeout(t), 10000);
    }

    handleTimeout(){
        this.__error({
            message: 'Execution took more than 10 seconds, \n so it was timed out by the system... maybe you had a while loop that never finished ?'
        })
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
