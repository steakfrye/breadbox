import axios from 'axios';

import { GET_ERRORS, GET_RECIPE, RECIPE_LOADING } from './types';

// New recipe
export const submitRecipe = (recipeData, history) => dispatch => {
  axios.post('/api/recipes', recipeData)
    .then(res => history.push('/recipes'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }));
}

// View recipes
export const getCurrentRecipe = () => dispatch => {
  dispatch(setRecipeLoading());
  axios.get('/api/profile')
    .then(res =>
      dispatch({
        type: GET_RECIPE,
        payload: res.data,
      })
    )
    .catch(err =>
    dispatch({
      type: GET_RECIPE,
      payload: {}
    }))
}

export const setRecipeLoading = () => dispatch => {
  return {
    type: RECIPE_LOADING,
  };
}
