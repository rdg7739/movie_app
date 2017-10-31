import React from 'react';
import ReactDOM from 'react-dom';
import { Child } from './Child.jsx';
import { Sibling } from './Sibling.jsx';
require("../style/style.scss");
class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: 'Frarthur' };
    this.changeName = this.changeName.bind(this);
  }
  changeName(newName) {
    this.setState({
      name: newName
    });
	}
  render() {
    return (
      <div>
        <Child onChange={this.changeName} />
        <Sibling name={this.state.name} />
      </div>
    );
  }
};

ReactDOM.render(
  <Parent />,
  document.getElementById('app')
);