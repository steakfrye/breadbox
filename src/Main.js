import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import New from './New';

class Main extends Component {
  render() {
    return (
      <div>
        <h2>Welcome to breadBox</h2>
        <Link to='/new'>New Recipe</Link>
      </div>
    );
  }
}

export default Main;
