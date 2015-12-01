// Contains Validity and helpful messages
// on invalidity.
export default class Validity{
    constructor(isValid, reason){
        this.isInValid = !isValid;
        this.isValid = isValid;
        this.reason  = reason;
    }

    static merge(...validities){
        let isValid = validities.every( validity => validity.isValid );
        let reason  = validities
                        .filter( validity => validity.isInValid )
                        .map ( t => t.reason )
                        .join(' & ');
        return new Validity(isValid, reason);
    }
}
