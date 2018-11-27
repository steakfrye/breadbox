import React, { Component } from 'react';

export class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a href="/" className="navbar-brand">breadbox</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/login">Recipes</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login">Login</a>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search Recipes" aria-label="Search"/>
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
