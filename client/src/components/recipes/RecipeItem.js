import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addRecipe } from '../../actions/recipeActions';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import InputFieldGroup from '../common/InputFieldGroup';

class RecipeItem extends Component {
  onDeleteClick(id) {
    console.log(id)
  }

  render() {
    const { recipe, auth } = this.props;

    return (
      <div className="recipe-item card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <Link to="/profile">
              <img
                className="rounded-circle d-md-block"
                src="{recipe.avatar}"
                alt="{recipe.name}"
              />
            </Link>
            <br/>
            <h1>{recipe.title}</h1>
            <button type="button" className="btn btn-light mr-1">
              <i className="text-info fas fa-thumbs-up"/>
              <span className="badge badge-light">{recipe.likes.length}</span>
            </button>
            <Link to={`/recipe/${recipe._id}`} className="btn btn-info mr-1">
              Comments
            </Link>
            {recipe.user === auth.user.id ? (
              <button
                onClick={this.onDeleteClick.bind(this, recipe._id)}
                type="button"
                className="btn btn-danger mr-1">
                <i className="fas fa-times"/>
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

RecipeItem.propTypes = {
  recipe: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(RecipeItem);
