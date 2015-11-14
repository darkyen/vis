import _ from 'lodash';
import EventEmitter2 from 'eventemitter2';

//Viva la void main
export default function main(){

    let code = '';
    
    function setCode(newCode){
        code = newCode;
    }

    function runCode(){
        eval(code);
    }

    self.addEventListener('message', (ev) => {
        let {eventType, payload} = ev;
        switch(eventType){
            case 'execute-code':
                runcode(payload);
            break;

            case 'set-code':
                setCode(payload);
            break;

            default:
                throw new Error('Unknown error');
            break;
        }
    });

};
