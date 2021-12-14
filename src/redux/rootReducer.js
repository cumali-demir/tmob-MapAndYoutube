import {combineReducers} from 'redux';
import videoReducer from './videoReducer';

const reducer = combineReducers({
  videoReducer,
});

export {reducer};
