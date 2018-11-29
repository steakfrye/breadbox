import axios from 'axios';

import { GET_RECIPE, SET_RECIPE, RECIPE_LOADING } from './types';

// New recipe
export const submitRecipe = (recipeData) => dispatch => {
  axios.post('/api/recipes')
    .then(res =>
      dispatch({
        type: SET_RECIPE,
        payload: res.data,
      })
    )
    .catch(err =>
    dispatch({
      type: SET_RECIPE,
      payload: {}
    })
  )
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
    })
  )
}

export const setRecipeLoading = () => dispatch => {
  return {
    type: RECIPE_LOADING,
  };
}
