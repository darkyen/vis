export default function def(blockSpec, blockInputMeta, blockDef, renderer){
	// @TODO: check with spec here
	// would be super cool :P 
	return {
		spec: blockSpec,
		propTypes: blockInputMeta,
		definition: blockDef,
		renderer: renderer,
	};
}

