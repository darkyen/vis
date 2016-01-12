export default function declareIdentifier(iden, parentScope){
    let varNameStr  = iden.getIdentiferName();
    let varNameType = iden.getIdentiferType();
    parentScope.declare(varNameStr, varNameType);
}
