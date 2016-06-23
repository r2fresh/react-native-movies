import React from 'react';
import {
  NavigatorIOS
} from 'react-native';

import SearchScreen from './screens/SearchScreen';

export default class App extends React.Component {
  render() {
    return (
      <NavigatorIOS
        style={{flex:1}}
        initialRoute={{
          title: '상영 영화',
          component: SearchScreen
        }}
      />
    );
  }
}
