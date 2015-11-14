import _ from 'lodash';
import Promise from 'bluebird';
import work from 'webworkify';
import RunWorker from './worker';
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
    }

    __output(payload){
        // this.events.emit('run.output', payload);
    }

    __error(payload){
        // this.events.emit('run.error', payload);
    }

    postMessage(data){
        let strData = JSON.stringify(data);
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

        code = babel.transform(code).code;
        return eval(code);
        // this.postMessage({
        //     type: 'code-update',
        //     code
        // });
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
