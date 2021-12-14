import React from 'react';
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';

const mapStateToProps = (state, props) => {
  const {loading, videos, nextPageToken} = state.videoReducer || {};

  return {loading, videos, nextPageToken};
};

const mapDispatchToProps = (dispatch, props) => ({
  getAllVideos: params => {
    dispatch({
      type: 'GET_VIDEOS_SEE_ALL_REQUEST',
      payload: {params},
    });
  },
});

const VideoListScreen = ({
  getAllVideos,
  route,
  videos,
  nextPageToken,
  loading,
}) => {
  const [page, setPage] = React.useState(0);
  const [videosAll, setVideosAll] = React.useState([]);
  React.useEffect(() => {
    ApiCall();
  }, [page]);

  React.useEffect(() => {
    setVideosAll(prev => [...prev, ...videos]);
  }, [JSON.stringify(videos)]);

  const ApiCall = () => {
    const coordinates = route.params?.coordinates ?? '';
    const loc = `${coordinates.latitude},${coordinates.longitude}`;
    const radius = '10mi';
    getAllVideos({
      nextPageToken,
      location: loc,
      locationRadius: radius,
    });
  };
  if (loading && videosAll.length === 0) {
    return <ActivityIndicator size={'large'} />;
  }
  return (
    <FlatList
      data={videosAll}
      ListFooterComponentStyle={{}}
      ListFooterComponent={() =>
        loading && <ActivityIndicator size={'small'} />
      }
      onEndReached={() => setPage(prev => prev + 1)}
      onEndReachedThreshold={0}
      ItemSeparatorComponent={() => <View style={styles.divider} />}
      renderItem={({item}) => (
        <View style={styles.renderItemContainer}>
          <Image source={{uri: item.thumb}} style={styles.imageStyle} />
          <View style={styles.textContainer}>
            <Text>{item.title}</Text>
          </View>
        </View>
      )}
      keyExtractor={({videoId}) => `maybeUniqueVideoList${videoId}`}
    />
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  renderItemContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  imageStyle: {width: 150, height: 150},
  textContainer: {
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: 'center',
  },
  divider: {height: 1, backgroundColor: 'gray', marginVertical: 5},
  footerButton: {
    flex: 1,
    alignItems: 'center',
  },
  itemContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 4,
  },
  imgStyle: {width: 30, height: 30},
  marginLeft5: {marginLeft: 5},
});

const VideoList = connect(mapStateToProps, mapDispatchToProps)(VideoListScreen);

export default VideoList;
