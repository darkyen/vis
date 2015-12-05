import React from 'react';
import NodeComponent from './NodeComponent';

// maybe this should be called renderNodeComponent
export default function createNodeComponent(element){
    return <NodeComponent node={element} />;
}
