import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRecipes } from '../../actions/recipeActions';

import Recipe from './Recipe';
import RecipeFeed from './RecipeFeed';

export class Recipes extends Component {
  componentDidMount() {
    this.props.getRecipes();
  }

  render() {
    const{ recipes, loading } = this.props.recipe;
    let recipeContent;

    if(recipes === null || loading) {
      recipeContent = <h1>No content.</h1>
    } else {
      recipeContent = <RecipeFeed recipes={recipes} />
    }

    return (
      <div className="recipes">
        <Link className="btn btn-primary" to="/newrecipe">New Recipe</Link>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {recipeContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Recipes.propTypes = {
  getRecipes: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  recipe: state.recipe,
});

export default connect(mapStateToProps, { getRecipes })(Recipes);
