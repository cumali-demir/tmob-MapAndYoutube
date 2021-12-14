import React from 'react';
import {
  Image,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const mapStateToProps = (state, props) => {
  const {loading, videos} = state.videoReducer || {};

  return {loading, videos};
};

const mapDispatchToProps = (dispatch, props) => ({
  getVideosAll: params => {
    dispatch({
      type: 'GET_VIDEOS_REQUEST',
      payload: {params},
    });
  },
});

const MapScreen = ({navigation, getVideos, loading, videos}) => {
  const ellipsisValue = 25;
  const [coordinates, setCoordinates] = React.useState({
    longitude: 0,
    latitude: 0,
  });
  const [showVideos, setShowVideos] = React.useState(false);

  React.useEffect(() => {
    ApiCall();
  }, [JSON.stringify(coordinates)]);

  const ApiCall = () => {
    const loc = `${coordinates.latitude},${coordinates.longitude}`;
    const radius = '10mi';
    getVideos({
      location: loc,
      locationRadius: radius,
    });
  };

  return (
    <View style={styles.flex1}>
      <MapView
        onPress={e => {
          setCoordinates(e.nativeEvent.coordinate);
        }}
        provider={PROVIDER_GOOGLE}
        style={styles.flex1}
        initialRegion={{
          latitude: 21.5922529,
          longitude: -158.1147114,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={coordinates}
          onPress={() => {
            setShowVideos(true);
          }}
        />
      </MapView>

      {showVideos ? (
        <View style={styles.flatListContainer}>
          {!loading ? (
            <FlatList
              scrollEnabled={false}
              style={styles.flex1}
              data={videos}
              ListFooterComponentStyle={styles.footerStyle}
              ItemSeparatorComponent={() => <View style={styles.divider} />}
              ListHeaderComponent={() => (
                <Pressable
                  style={styles.closeContainer}
                  onPress={() => setShowVideos(false)}>
                  <Image
                    source={require('../asset/images/close.png')}
                    style={styles.size12}
                  />
                </Pressable>
              )}
              keyExtractor={({videoId}) => `maybeUnique${videoId}`}
              ListEmptyComponent={() => <Text>{'Video not found'}</Text>}
              ListFooterComponent={() => (
                <TouchableOpacity
                  style={styles.footerButton}
                  onPress={() => {
                    navigation.navigate('VideoList', {coordinates});
                  }}>
                  <Text>{'SHOW ALL LIST'}</Text>
                </TouchableOpacity>
              )}
              renderItem={({item}) => {
                const title =
                  item.title?.length > ellipsisValue
                    ? item.title.substring(0, ellipsisValue).concat('...')
                    : item.title;
                return (
                  <TouchableOpacity style={styles.itemContainer}>
                    <Image style={styles.imgStyle} source={{uri: item.thumb}} />
                    <Text style={styles.marginLeft5}>{title}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  flatListContainer: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    left: 30,
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  footerStyle: {
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 0,
    flex: 1,
  },
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
  closeContainer: {alignSelf: 'flex-end', padding: 10},
  size12: {width: 12, height: 12},
  divider: {height: 1, backgroundColor: 'gray'},
});

const Map = connect(mapStateToProps, mapDispatchToProps)(MapScreen);

export default Map;
