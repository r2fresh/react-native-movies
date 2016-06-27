import React from 'react';
import {
  ScrollView,
  View,
  Image,
  Text,
  StyleSheet
} from 'react-native';

import utils from '../../utils';

export default class MovieScreen extends React.Component {
  render() {
    const { movie } = this.props.route;

    const styles = {
      separator: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        height: StyleSheet.hairlineWidth,
        marginVertical: 10
      }
    };

    return (
      <ScrollView contentContainerStyle={{padding:10}}>
        <View style={{flexDirection:'row'}}>
          <Image
            source={utils.getDetailedImageSource(movie)}
            style={{width:134, height:200, marginRight:10}}
          />
          <View style={{flex:1, justifyContent:'space-between'}}>
            <Text style={{flex:1, fontSize:16, fontWeight:'500'}}>{movie.title}</Text>
            <Text>{movie.year}</Text>
            <View style={{
                alignSelf:'flex-start',
                borderColor:'black',
                borderWidth:1,
                paddingHorizontal:3,
                marginVertical:5}}>
              <Text style={{fontFamily:'Palatino', fontSize:13, fontWeight:'500'}}>
                {movie.mpaa_rating}
              </Text>
            </View>
            <Ratings ratings={movie.ratings} />
          </View>
        </View>
        <View style={styles.separator}/>
        <Text>
          {movie.synopsis}
        </Text>
        <View style={styles.separator}/>
        <Cast actors={movie.abridged_cast} />
      </ScrollView>
    );
  }
}

class Ratings extends React.Component {
  render() {
    const criticsScore = this.props.ratings.critics_score;
    const audienceScore = this.props.ratings.audience_score;

    const styles = {
      rating: { marginTop:10 },
      ratingTitle: { fontSize: 14 },
      ratingValue: [
        { fontSize:28, fontWeight:'500' },
        utils.getStyleFromScore(criticsScore)
      ]
    };

    return (
      <View>
        <View style={styles.rating}>
          <Text style={styles.ratingTitle}>Critics:</Text>
          <Text style={styles.ratingValue}>
            {utils.getTextFromScore(criticsScore)}
          </Text>
        </View>
        <View style={styles.rating}>
          <Text style={styles.ratingTitle}>Audience:</Text>
          <Text style={styles.ratingValue}>
            {utils.getTextFromScore(audienceScore)}
          </Text>
        </View>
      </View>
    );
  }
}

class Cast extends React.Component {
  render() {
    if (!this.props.actors) {
      return null;
    }

    return (
      <View>
        <Text style={{fontWeight: '500', marginBottom: 3}}>
          Actors
        </Text>
        {this.props.actors.map(actor =>
          <Text key={actor.name} style={{marginLeft: 2}}>
            &bull; {actor.name}
          </Text>
        )}
      </View>
    );
  }
}
