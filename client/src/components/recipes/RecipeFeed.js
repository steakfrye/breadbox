import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RecipeItem from './RecipeItem';

class RecipeFeed extends Component {
  render() {
    const { recipes } = this.props;

    return recipes.map(post => <RecipeItem key={post._id} post={post} />);
  }
}

RecipeFeed.propTypes = {
  recipes: PropTypes.array.isRequired,
};

export default RecipeFeed;
