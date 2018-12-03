import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <Link to="/newrecipe">Create new recipe.</Link>
        <h1>My recipes.</h1>
        <h1>My profile.</h1>

      </div>
    );
  }
}

export default Dashboard;
