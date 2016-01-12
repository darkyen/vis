import _ from 'lodash';
import EventEmitter2 from 'eventemitter2';

//Viva la void main
export default function main(){

    let runnableCode = '';

    function setCode({code}){
        console.log("Setting code");
        runnableCode = code;
        runCode();
    }

    function __postMessage(eventType, data){
        postMessage(JSON.stringify({
            eventType: eventType,
            payload: data
        }));
    }

    function runCode(){
        console.log("Running code");
        try{
            __postMessage('output',{
                output: eval(runnableCode).join('\n')
            });
        }catch(e){
            __postMessage('error',{
                error: {
                    message: e.message,
                    stack: e.stack
                }
            });
        }
        // console.log("Runny complete", runnableCode);
    }

    self.addEventListener('message', (ev) => {
        console.log(ev);
        let e = JSON.parse(ev.data);
        let {eventType, payload} = e;
        switch(eventType){

            // case 'execute-code':
            //     runcode(payload);
            // break;

            case 'set-code':
                setCode(payload);
            break;

        }
    });

};
