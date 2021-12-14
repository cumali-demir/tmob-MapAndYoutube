import axios from 'axios';
import {call} from 'redux-saga/effects';

const API_KEY = 'AIzaSyAeY8srhXh7PeO6E2Q7jujgOlCQ4iKym3g';

function* CallApi(data) {
  const {endpoint, params = {}} = data;
  const res = yield call(makeGetRequest, {endpoint, params});

  return res;
}

const makeGetRequest = async ({endpoint, params = {}}) => {
  return axiosInstance.get(endpoint, params);
};

const axiosInstance = axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    type: 'video',
    maxResult: 10,
    key: API_KEY,
  },
  timeout: 2000,
});

export default CallApi;
