// Initial State
const initialState = {
  loading: false,
  error: false,
  videos: [],
};
const videoReducer = (state = initialState, action) => {
  const {type, payload} = action || {};
  switch (type) {
    case 'GET_VIDEOS_REQUEST': {
      return {
        ...state,
        loading: true,
      };
    }
    case 'GET_VIDEOS_SUCCESS': {
      return {
        ...state,
        ...payload,
        loading: false,
      };
    }
    case 'GET_VIDEOS_SEE_ALL_SUCCESS': {
      return {
        ...state,
        ...payload,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};
// Exports
export default videoReducer;
