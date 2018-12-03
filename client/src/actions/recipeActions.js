import axios from 'axios';

import { ADD_RECIPE, GET_ERRORS, GET_RECIPES, RECIPE_LOADING } from './types';

// New recipe
export const addRecipe = recipeData => dispatch => {
  axios.post('/api/recipes', recipeData)
    .then(res =>
      dispatch({
        type: ADD_RECIPE,
        payload: res.data,
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// View recipes
export const getRecipes = () => dispatch => {
  dispatch(setRecipeLoading());
  axios.get('/api/recipes')
    .then(res =>
      dispatch({
        type: GET_RECIPES,
        payload: res.data,
      })
    )
    .catch(err =>
      dispatch({
        type: GET_RECIPES,
        payload: null
      })
    );
};

export const setRecipeLoading = () => {
  return {
    type: RECIPE_LOADING,
  };
};
