import React from 'react';
import {
  ScrollView,
  View,
  Image
} from 'react-native';

export default class MovieScreen extends React.Component {
  render() {
    const { movie } = this.props.route;

    return (
      <ScrollView>
        <View>
          <Image
            source={getImageSource(movie)}
            style={{width:134, height:200}}
          />
        </View>
      </ScrollView>
    );
  }
}

function getImageSource(movie) {
  let uri = movie && movie.posters ? movie.posters.detailed : null;
  return { uri };
}
