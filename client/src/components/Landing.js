import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Landing extends Component {
  render() {
    return (
      <div className="container landing">
        <div className="row align-items-center">
          <div className="col-md-12 text-center">
            <h1 className="display-3 mb-4">Welcome to breadbox!</h1>
            <h3>Sign in and get baking.</h3>
            <Link className="btn btn-primary" to="/login">Sign in</Link>
            <hr />
            <small className="col-sm">Don't have an account yet? Sign up <Link to="/register">here.</Link></small>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
