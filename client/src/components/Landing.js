import React, { Component } from 'react';

export class Landing extends Component {
  render() {
    return (
      <div className="container landing">
        <div className="row align-items-center">
          <div className="col-md-12 text-center">
            <h1 className="display-3 mb-4">Welcome to breadbox!</h1>
            <h3>Sign in and get baking.</h3>
            <hr />
            <button className="btn btn-primary btn-lg">Login</button>
            <small className="col-sm">Don't have an account yet? Sign up <a href="/register">here.</a></small>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
