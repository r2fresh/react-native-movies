import React from 'react';
import {
  Navigator,
  View,
  Text,
  TouchableHighlight,
  Platform
} from 'react-native';

import SearchScreen from './screens/SearchScreen';

export default class App extends React.Component {
  renderScene(route, navigator) {
    const containerStyle = {
      flex:1,
      ...Platform.select({
        ios:{
          paddingTop: 40
        },
        android: {
          paddingTop: 0
        }
      })
    };

    switch (route.name) {
      case "SearchScreen":
        return (
          <View style={containerStyle}>
            <SearchScreen navigator={navigator} />
          </View>
        );
      default:
        return <NotFound />;
    }
  }

  navigationBar() {
    if (Platform.OS === 'ios') {
      return (
        <Navigator.NavigationBar
          routeMapper={routeMapper}
        />
      );
    }
    else {
      return;
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{name:'SearchScreen', title:'상영 영화'}}
        renderScene={this.renderScene}
        configureScene={() => Navigator.SceneConfigs.FloatFromBottom}
        navigationBar={this.navigationBar()}
      />
    );
  }
}

class NotFound extends React.Component {
  render() {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text>404 Not Found</Text>
      </View>
    );
  }
}

const routeMapper = {
  LeftButton(route, navigator, index, navState) {
    const prevRoute = navState.routeStack[index-1];
    if (!prevRoute) return;

    const buttonText = ` < ${prevRoute.title}`;

    return (
      <TouchableHighlight onPress={() => navigator.pop()}>
        <Text>{buttonText}</Text>
      </TouchableHighlight>
    );
  },

  RightButton(route, navigator, index, navState) {
  },

  Title(route, navigator, index, navState) {
    return (
      <Text>{route.title}</Text>
    );
  }
};
