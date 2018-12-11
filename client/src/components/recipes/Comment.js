import React, { Component } from 'react';
import InputFieldGroup from '../common/InputFieldGroup';

export class Comment extends Component {
  render() {
    return (
      <div className="recipe-item card card-body mb-3">
        <div className="container">
          <div className="row">
            <div className="col offset-md-11">
              {recipe.user === auth.user.id ? (
                <button
                  onClick={this.onDeleteClick.bind(this, recipe._id)}
                  type="button"
                  className="btn btn-danger mr-1">
                  <i className="fas fa-times"/>
                </button>
              ) : null}
            </div>
            <div className="col-md-2">
              <Link to="/profile">
                <img
                  className="rounded-circle d-md-block"
                  style={{width: '50px'}}
                  src={recipe.avatar}
                  alt={recipe.name}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Comment;
