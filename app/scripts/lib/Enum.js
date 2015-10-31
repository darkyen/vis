import _ from 'lodash';

export default function Enum(...keys){
	keys.forEach((key) => {
		this[key] = key;
	})
	this['ALL'] = keys;
}
