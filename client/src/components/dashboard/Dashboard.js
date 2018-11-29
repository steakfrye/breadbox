import React, { Component } from 'react';

export class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <Link to="/newrecipe">Create new recipe.</Link>
      </div>
    );
  }
}

export default Dashboard;
