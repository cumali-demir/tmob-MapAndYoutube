import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import Map from './screens/map';
import VideoList from './screens/videoList';
import store from './redux/store';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen name="Map" component={Map} /> */}
          <Stack.Screen name="VideoList" component={VideoList} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
