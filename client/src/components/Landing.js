import React, { Component } from 'react';

export class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <h1>Welcome to breadbox!</h1>
        <div className="container">
          <h3>Sign in and get baking.</h3>
          <button className="btn btn-primary btn-lg">Login</button>
          <small>Don't have an account yet? Sign up <a href="/register">here.</a></small>
        </div>
      </div>
    );
  }
}

export default Landing;
