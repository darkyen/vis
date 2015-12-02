import React, {Component} from 'react';
import IfStatementComponent from './IfStatementComponent';
import LambdaExpressionComponent from './LambdaExpressionComponent';
import UnaryExpressionComponent from './UnaryExpressionComponent';
import BinaryExpressionComponent from './BinaryExpressionComponent';
import LogicalExpressionComponent from './LogicalExpressionComponent';
import IfExpressionComponent from './IfExpressionComponent';
import CallExpressionComponent from './CallExpressionComponent';
import IdentifierComponent from './IdentifierComponent';
import LiteralComponent from './LiteralComponent';
import FunctionDeclarationComponent from './FunctionDeclarationComponent';
import ClassDeclarationComponent from './ClassDeclarationComponent';
import CallStatementComponent from './CallStatementComponent';
import WhileStatementComponent from './WhileStatementComponent';
import ImportStatementComponent from './ImportStatementComponent';
import AssignmentStatementComponent from './AssignmentStatementComponent';
import ExportStatementComponent from './ExportStatementComponent';


const UndefinedComponent = (props) => {
    return <div>Undefined Component Here</div>;
};

// Import all the *ASTNodeComponents here
// manage a hashmap and render using a single
const nodeTypeToComponentMap = {
    IfStatementComponent,
    LambdaExpressionComponent,
    UnaryExpressionComponent,
    BinaryExpressionComponent,
    LogicalExpressionComponent,
    IfExpressionComponent,
    CallExpressionComponent,
    IdentifierComponent,
    LiteralComponent,
    FunctionDeclarationComponent,
    ClassDeclarationComponent,
    CallStatementComponent,
    WhileStatementComponent,
    ImportStatementComponent,
    AssignmentStatementComponent,
    ExportStatementComponent,
    UndefinedComponent,
};


export default function NodeComponent(props){
    const {node} = props;
    const nodeName = node?node[0]:'Undefined';
    const Ctr = nodeTypeToComponentMap[`${nodeName}Component`] || WTFComponent;
    return <Ctr node={node} />
}
