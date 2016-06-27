import React from 'react';
import {
  View,
  TextInput
} from 'react-native';

export default class SearchBar extends React.Component {
  render() {
    return (
      <View style={{padding:3, paddingLeft: 8}}>
        <TextInput
          style={{flex: 1, height:30, fontSize:15}}
          onChange={this.props.onSearchChange}
          placeholder='Search a movie...'
          autoCapitalize='none'
          autoCorrect={false}
        />
      </View>
    );
  }
}
