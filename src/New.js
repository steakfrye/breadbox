import React, { Component } from 'react';

var d = new Date();

class New extends Component {
  render() {
    return (
      <div>
        <h1>Add Recipe</h1>
        <form>
          <h3>{d.toDateString()}</h3>
          <ol>
            <li></li>
          </ol>
          <button type="input"/>
        </form>
      </div>
    );
  }
}

export default New;
