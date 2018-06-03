export const SET_LOCATION = 'SET_LOCATION';
export const SEARCH_NEARBY_LOCATION = 'SEARCH_NEARBY_LOCATION';
export const GOOGLE_API_KEY = 'AIzaSyCaJYP7P3wpNFCF6qWNQqglXCjH2DvSMUY';

const INITIAL_STATE = {
  user_location: {},
};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case SET_LOCATION:
      return {
        ...state,
        user_location: { ...action.payload },
      };
    default:
      return state;
  }
};
