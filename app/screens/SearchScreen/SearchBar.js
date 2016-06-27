import React from 'react';
import {
  View,
  TextInput,
  Platform
} from 'react-native';

export default class SearchBar extends React.Component {
  render() {
    const textHeight = Platform.OS === 'ios' ? 30 : 40;

    return (
      <View style={{padding:3, paddingLeft: 8}}>
        <TextInput
          style={{
            flex: 1,
            height: textHeight,
            fontSize:15
          }}
          onChange={this.props.onSearchChange}
          placeholder='Search a movie...'
          autoCapitalize='none'
          autoCorrect={false}
        />
      </View>
    );
  }
}
