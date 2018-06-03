export const SET_USER_LOCATION = 'SET_LOCATION';
export const SET_DESTINY_LOCATION = 'SET_DESTINY_LOCATION';
export const GOOGLE_API_KEY = 'AIzaSyCaJYP7P3wpNFCF6qWNQqglXCjH2DvSMUY';

const INITIAL_STATE = {
  user_location: null,
  user_start_location: null,
  user_end_location: null,
};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case SET_USER_LOCATION:
      return {
        ...state,
        user_location: { ...action.payload },
      };
    case SET_DESTINY_LOCATION: {
      const { ref, data } = action.payload;
      return {
        ...state,
        [ref]: data,
      };
    }
    default:
      return state;
  }
};
