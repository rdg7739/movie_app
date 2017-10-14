import React from 'react';
import ReactDOM from 'react-dom';

class Block extends React.Component{
	render(){
		return <h1>Hello, world!</h1>;
	}
}
window.addEventListener('load', function() {
  ReactDOM.render(<Block/>, document.body);
});
