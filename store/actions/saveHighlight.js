export const SET_HIGHLIGHT = 'SET_HIGHLIGHT';
export const DELETE_SAVED_HIGHLIGHT = 'DELETE_SAVED_HIGHLIGHT';

export const setHighlight = (id, articleID, text, start, end) => {
  return {
    type: SET_HIGHLIGHT,
    payload: {id: id, articleID: articleID, text: text, start: start, end: end},
  };
};

export const deleteSavedHighlight = id => {
  return {
    type: DELETE_SAVED_HIGHLIGHT,
    id,
  };
};
