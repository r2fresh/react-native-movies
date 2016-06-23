import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableHighlight
} from 'react-native';

export default class MovieCell extends React.Component {
  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onSelect}
        underlayColor='#ECECEC'>
        <View style={{flex:1, flexDirection:'row', padding:5, alignItems:'center'}}>
          <Image style={{width:60, height:93, marginRight:10}}
            source={getImageSource(this.props.movie)}
          />
          <View style={{flex:1}}>
            <Text style={{flex:1, fontSize:16, fontWeight:'500', marginBottom:2}}>
              {this.props.movie.title}
            </Text>
            <Text style={{color:'#999999', fontSize:12}}>
              {this.props.movie.year}
              {' '}&bull;{' '}
              <Text style={getStyleFromScore(this.props.movie.ratings.critics_score)}>
                Critics {this.props.movie.ratings.critics_score}
              </Text>
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

MovieCell.propTypes = {
  onSelect: React.PropTypes.func.isRequired
};

function getImageSource(movie, kind) {
  let uri = movie && movie.posters ? movie.posters.thumbnail : null;
  return { uri };
}

function getStyleFromScore(score) {
  const maxValue = 200;
  let color = '#999999';

  if (score >= 0) {
    var normalizedScore = Math.round((score / 100) * maxValue);
    color = `rgb(${maxValue - normalizedScore}, ${normalizedScore}, 0)`;
  }

  return {
    color
  };
}
