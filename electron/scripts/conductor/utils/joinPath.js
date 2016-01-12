export default function joinPath(path, ...addon){
	return [path, addon.join('.')].join('.');
}
