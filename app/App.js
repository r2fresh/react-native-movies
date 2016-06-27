import React from 'react';
import {
  Navigator,
  View,
  Text,
  TouchableHighlight,
  Platform
} from 'react-native';

import SearchScreen from './screens/SearchScreen';
import MovieScreen from './screens/MovieScreen';

export default class App extends React.Component {
  renderScene(route, navigator) {
    const containerStyle = {
      flex:1,
      ...Platform.select({
        ios:{
          paddingTop: 60
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
            <SearchScreen navigator={navigator} route={route} />
          </View>
        );

      case "MovieScreen":
        return (
          <View style={containerStyle}>
            <MovieScreen navigator={navigator} route={route} />
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

    const buttonText = `  < ${prevRoute.title} `;

    return (
      <TouchableHighlight style={{marginVertical: 10}}
        underlayColor="white"
        onPress={() => navigator.pop()}>
        <Text style={{fontSize: 20}}>
          {buttonText}
        </Text>
      </TouchableHighlight>
    );
  },

  RightButton(route, navigator, index, navState) {
  },

  Title(route, navigator, index, navState) {
    return (
      <Text style={{
        fontSize: 20,
        fontWeight:'bold',
        marginVertical: 10
      }}>
        {route.title}
      </Text>
    );
  }
};
