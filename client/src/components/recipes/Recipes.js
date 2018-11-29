import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Recipe from './Recipe';

export class Recipes extends Component {
  render() {
    return (
      <div className="recipes">
        <Link className="btn" to="/newrecipe">New Recipe</Link>
        <Recipe />
      </div>
    );
  }
}

export default Recipes;
