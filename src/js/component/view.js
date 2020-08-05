import React from "react";

export class View extends React.Component {
	constructor () {
        super();
        this.state = {

        };
    }
    render () {
        return(
            <div>
        <h1>Hello {this.props.name}</h1>
        <audio controls ref=""/>
        </div>
        );
    }
}




