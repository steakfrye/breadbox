import { ADD_RECIPE, GET_RECIPES, RECIPE_LOADING } from '../actions/types';

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
    case ADD_RECIPE:
      return {
        ...state,
        recipes: [action.payload, ...state.recipes]
      };
    default:
      return state;
  }
}
