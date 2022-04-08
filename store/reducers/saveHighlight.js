import {SET_HIGHLIGHT, DELETE_SAVED_HIGHLIGHT} from '../actions/saveHighlight';
import HighlightItem from '../../models/highlightItem';

const initialState = {
  savedHighlights: [],
};

const highlightReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HIGHLIGHT:
      const newHighlight = new HighlightItem(
        action.payload.id,
        action.payload.articleID,
        action.payload.text,
      );

      return {
        ...state,
        savedHighlights: state.savedHighlights.concat(newHighlight),
      };

    case DELETE_SAVED_HIGHLIGHT:
      return {
        ...state,
        savedHighlights: state.savedHighlights.filter(
          savedHighlights => savedHighlights.id !== action.id,
        ),
      };
    default:
      return state;
  }
};

export default highlightReducer;
