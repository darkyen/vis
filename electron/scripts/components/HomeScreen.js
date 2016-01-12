import React, {Component} from 'react';

class HomePage extends Component{
    constructor(p){
        super(p);
        this.state = {files: []};
    }
    render(){
        return <div className="home-page">
                  <h1>Hello World</h1>
               </div>;
    }
}

export default HomePage;
