import React from 'react';
import ReactDOM from 'react-dom';
import style from '../style/style.scss';

class Block extends React.Component{
	render(){
		return <h1>Hello, world!</h1>;
	}
}
ReactDOM.render(<Block/>, document.getElementById("example"));
