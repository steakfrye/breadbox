import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { deleteRecipe } from '../../actions/recipeActions';

class RecipeItem extends Component {
  constructor() {
    super();
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onDeleteClick(id) {
    deleteRecipe(id);
  }

  render() {
    const { recipe, auth } = this.props;
    const t = recipe.temptype[0]

    return (
      <div className="recipe-item card card-body mb-3">
        <div className="row">
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
        <div className="row">
          <div className="col md-auto">
            <br/>
            <h1>{recipe.title}</h1>
            <small>{formatDate(recipe.date)}</small>
          </div>
          <div className="container pad">
            <div className="row">
              <h6 className="col md-auto">Weight Type: {recipe.weighedin}</h6>
              <h6 className="col md-auto">Temperature Type: {recipe.temptype}</h6>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col">
                <h4>Water Temperature: {recipe.temperature}° {t}</h4>
                <h4>Final Dough Temperature: {recipe.fdt}° {t}</h4>
                <h4>Flour: {recipe.flour} {recipe.weighedin}</h4>
                <h4>Water: {recipe.water} {recipe.weighedin}</h4>
                <h4>Salt: {recipe.salt} {recipe.weighedin}</h4>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row self-align-end">
              <div className="col">
                <button type="button" className="btn btn-light mr-1">
                  <i className="text-primary fas fa-thumbs-up"/>
                  <span className="badge badge-light">{recipe.likes.length}</span>
                </button>
                <Link to={`/recipe/${recipe._id}`} className="btn btn-primary mr-1">
                  Comments
                </Link>
                {recipe.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick(recipe.id)}
                    type="button"
                    className="btn btn-danger mr-1">
                    <i className="fas fa-times"/>
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


function formatDate(date) {
  date = Date(date);
  return date.slice(0, 16);
};

RecipeItem.propTypes = {
  recipe: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(RecipeItem);
