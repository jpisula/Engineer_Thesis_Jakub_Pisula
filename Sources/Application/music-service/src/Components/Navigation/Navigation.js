import React from 'react';
import './Navigation.css';

class Navigation extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
  }

  handleSelect(selectedKey) {
    alert(`selected ${selectedKey}`);
  }
  
  render() {
    return (
        <p>To ja</p>
    );
  }
}
  
export default Navigation;