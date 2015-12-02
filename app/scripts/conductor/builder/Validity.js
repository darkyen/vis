// Contains Validity and helpful messages
// on invalidity.
function isValidFn(validity){
    return validity.isValid;
}

export default class Validity{
    constructor(isValid, reason){
        this.isInValid = !isValid;
        this.isValid = isValid;
        this.reason  = reason;
    }

    static merge(...validities){
        let isValid = validities.every(isValidFn);
        let reason = [];
        let validity = 0;

        if( !isValid ){
            let validityLen = validities.length;
            for(let i = 0; i < validityLen; i++){
                validity = validities[i];
                if( validity.isInValid ){
                    reason.push(validities[i].reason);
                }
            }
        }
        reason = reason.join(' & ');
        return new Validity(isValid, reason);
    }
}
