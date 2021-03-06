import { ADD_RECIPE, DELETE_RECIPE, GET_RECIPES, RECIPE_LOADING } from '../actions/types';

const initialState = {
  recipes: [],
  recipe: {},
  loading: false,
};

export default function(state = initialState, action) {
  switch(action.type) {
    case RECIPE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        loading: false,
      };
    case DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter(recipe => recipe._id !== action.payload)
      }
    case ADD_RECIPE:
      return {
        ...state,
        recipes: [action.payload, ...state.recipes],
        loading: true
      };
    default:
      return state;
  }
}
