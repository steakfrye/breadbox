import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div>
        <ul className='navbar'>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/recipes'>Routines/Recipes</Link></li>
          <li><Link to='/#'>Account</Link></li>
        </ul>
      </div>
    );
  }
}

export default Header;
