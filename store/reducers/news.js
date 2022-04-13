import {SET_NEWS, SET_NEWS_2, SET_NEWS_ALL} from '../actions/news';

const initialState = {
  loadedArticles: [],
  totalResults: 0,
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWS:
      return {
        ...state,
        loadedArticles: action.loadedArticles,
      };
    case SET_NEWS_2:
      return {
        ...state,
        loadedArticles: action.loadedArticles,
      };
    case SET_NEWS_ALL:
      return {
        ...state,
        loadedArticles: action.loadedArticles,
      };
    default:
      return state;
  }
};

export default newsReducer;
