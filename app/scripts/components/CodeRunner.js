import React, {Component} from 'react';


class CodeRunner extends Component{
	render(){
		return 	<div className="code-runner">
					<header className="code-runner__header">Output</header>
					<div className="code-runner__content">
						<iframe className="code-runner__output" />
					</div>
					<footer className="code-runner__footer"></footer>
				</div>;
	}
};

export default CodeRunner;