import React from 'react';
import {
  View,
  ListView,
  Text,
  ActivityIndicator
} from 'react-native';

import MovieCell from './MovieCell';
import MovieScreen from '../MovieScreen';

const API_INFO = {
  url: 'http://api.rottentomatoes.com/api/public/v1.0',
  key: '7waqfqbprs7pajbz28mqf6vz'
};

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }

  getDataSource(movies) {
    return this.state.dataSource.cloneWithRows(movies);
  }

  componentDidMount() {
    this.searchMovies('');
  }

  _urlForQueryAndPage(query, pageNo) {
    const limit = 20;

    let url = (
      `${API_INFO.url}/lists/movies/in_theaters.json` +
      `?apiKey=${API_INFO.key}&page_limit=${limit}&page=${pageNo}`
    );

    return url;
  }

  searchMovies(query) {
    const url = this._urlForQueryAndPage(query, 1);

    this.setState({
      isLoading: true
    });

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          isLoading: false,
          dataSource: this.getDataSource(data.movies)
        });
      })
      .done();
  }

  selectMovie(movie) {
    this.props.navigator.push({
      name: 'MovieScreen',
      title: '영화',
      movie
    });
  }

  render() {
    return (
      <View style={{flex:1}}>
        {this.renderContent()}
      </View>
    );
  }

  renderContent() {
    if (this.state.isLoading) {
      //
      // 로딩 화면
      //
      return (
        <ActivityIndicator
          style={{flex:1}}
          animating={true}
          size='large'
        />
      );
    }
    else {
      //
      // 영화 목록 (리스트뷰)
      //
      return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
      );
    }
  }

  renderRow(movie) {
    return (
      <MovieCell
        key={movie.id}
        movie={movie}
        onSelect={() => this.selectMovie(movie)}
      />
    );
  }
}
