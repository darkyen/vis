const baseTypes = [String, Number, Boolean];
const baseTypeNames = baseTypes.map( t => t.name );

function isTypeBaseType(Type){
    return baseTypes.includes(Type);
}

function getCtrName(obj){
    return obj.constructor.name;
}

function isBaseInstance(obj){
    return obj === undefined || baseTypeNames.includes(getCtrName(obj));
}

// This will only work for String, Number and Boolean
// any higher type should use instanceof
function baseIsInstance(inst, Type){
    const ctrName = getCtrName(inst);
    return ctrName === Type.name;
}

// This is safer to use for all classes
function isInstance(inst, Type){
    if( isTypeBaseType(Type) ){
        return baseIsInstance(inst, Type);
    }
    return inst instanceof Type;
}

// Expose everything !
export {
    baseTypes,
    baseTypeNames,
    isTypeBaseType,
    getCtrName,
    isBaseInstance,
    baseIsInstance,
    isInstance
};
