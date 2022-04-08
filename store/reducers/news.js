import {SET_NEWS} from '../actions/news';

const initialState = {
  loadedArticles: [],
  totalResults: 0,
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWS:
      return {...state, loadedArticles: action.loadedArticles};
    default:
      return state;
  }
};

export default newsReducer;
