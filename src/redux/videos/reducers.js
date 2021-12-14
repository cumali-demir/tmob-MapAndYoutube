import {GET_ALL_USER_INFO_REQUEST_SUCCESS} from './actions';

const initialState = {
  id: 'id1',
  name: 'Michael',
  email: 'michael@example.com',
  accessToken: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_VIDEOS_SEE_ALL_SUCCESS': {
      const {} = action.payload;

      return {};
    }
    case 'GET_VIDEOS_SUCCESS': {
      const {} = action.payload;

      return {};
    }
    default:
      return state;
  }
};

export {reducer};
