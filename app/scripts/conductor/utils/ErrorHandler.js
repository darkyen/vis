import _ from 'lodash';


class ErrorHandler{
    constructor(message, path){
        this.message = message;
        this.path    = path;
    }
}


export default ErrorHandler;
