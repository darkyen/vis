import React, {Component} from 'react';


class CodeRunner extends Component{
	render(){
		console.log(this.props);
		return 	<div className="code-runner">
					<header className="code-runner__header">Output</header>
					<div className="code-runner__content">
						<div className="code-runner__code">
							<pre>{this.props.code}</pre>
						</div>
						<div className="code-runner__output">
							<pre>{this.props.output}</pre>
						</div>
					</div>
					<footer className="code-runner__footer"></footer>
				</div>;
	}
};

export default CodeRunner;
