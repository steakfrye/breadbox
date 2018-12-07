import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

export class Landing extends Component {

  componentDidMount() {
      if(this.props.auth.isAuthenticated) {
        this.props.history.push('/dashboard');
      }
  }

  render() {
    return (
      <div className="container landing pad">
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

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
