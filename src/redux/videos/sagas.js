import {takeEvery, put, call, all} from 'redux-saga/effects';
import CallApi from '../../api';

export default function* rootSaga() {
  yield all([
    takeEvery('GET_VIDEOS_REQUEST', getVideosByLocation),
    takeEvery('GET_VIDEOS_SEE_ALL_REQUEST', getVideosByLocationSeeAll),
  ]);
}

const normalizeRespone = response => {
  const normalizedVideos = [];
  const videos = response?.data?.items ?? [];
  videos.map(item => {
    normalizedVideos.push({
      videoId: item.id.videoId,
      title: item.snippet.title,
      thumb: item.snippet.thumbnails.default.url,
    });
  });
  return normalizedVideos;
};

function* getVideosByLocation({payload}) {
  const {params} = payload || {};
  try {
    const response = yield call(CallApi, {
      params,
      endpoint: '/search',
    });
    const normalizedVideos = normalizeRespone(response);
    yield put({
      type: 'GET_VIDEOS_SUCCESS',
      payload: {videos: normalizedVideos},
    });
  } catch (err) {
    console.log({err});
  }
}

function* getVideosByLocationSeeAll(payload) {
  const {params} = payload || {};
  try {
    const response = yield call(CallApi, {
      params,
      endpoint: '/search',
    });
    const normalizedVideos = normalizeRespone(response);

    yield put({
      type: 'GET_VIDEOS_SEE_ALL_SUCCESS',
      payload: {
        videos: normalizedVideos,
        nextPageToken: response.data.nextPageToken,
      },
    });
  } catch (err) {
    console.log(err);
    // Handle error
  }
}
