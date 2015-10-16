import _ from 'lodash';

class BlockStore extends Store{
	constructor(dispatcher){
		super(dispatcher);
		this.newFile();
	}
	newFile(){
		this.file = {
			name: 'New File',
			code: [{
				oprClassDef: '$ctrl',
				oprName: '$if',
				meta: {
					condition: {
						oprClassDef: '$arit',
						oprName: '$eq',
						meta: {
							operands: [{
								oprClassDef: '$val',
								oprName: '$cns',
								meta: {
									value: 1
								} 
							}, {
								oprClassDef: '$val',
								oprName: '$cns',
								meta: {
									value: 1
								}
							}]
						}
					},
					body:[{
						oprClassDef: '$val',
						oprName: '$set',
						meta: {
							name: 'x',
							value: {
								oprClassDef: '$val',
								oprName: '$cns',
								meta: {
									value: 3
								}
							}
						}
					}],
				}
			}],
			packages: {
				npm: {},
				services: {},
				cylon: {}
			}
		};
	}

	__onDispatch(){
			/* do nothing */
	}

	getState(){
		return this.file;
	}
}

let blockStore = new BlockStore(blockDispatcher);

export default blockStore;