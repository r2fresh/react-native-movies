import React from 'react';
import {
  View,
  ListView,
  Text,
  ActivityIndicator,
  RefreshControl
} from 'react-native';

import MovieCell from './MovieCell';
import MovieScreen from '../MovieScreen';

const API_INFO = {
  url: 'http://api.rottentomatoes.com/api/public/v1.0',
  key: '7waqfqbprs7pajbz28mqf6vz'
};

const SEARCH_STATE = {
  INIT: 0,
  REFRESH: 1,
  NEXT: 2
};

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);

    this.movieData = {
      total: 0,
      pageNo: 1,
      data: []
    };

    this.state = {
      isLoading: false,
      isLoadingHead: false,
      isLoadingTail: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }

  componentDidMount() {
    this.searchMovies(SEARCH_STATE.INIT);
  }

  _urlForQueryAndPage(query, limit, pageNo) {

    let url = (
      `${API_INFO.url}/lists/movies/in_theaters.json` +
      `?apiKey=${API_INFO.key}&page_limit=${limit}&page=${pageNo}`
    );

    return url;
  }

  searchMovies(state) {
    const limit = 10;

    switch (state) {
      case SEARCH_STATE.INIT, SEARCH_STATE.REFRESH:
        this.movieData.data = [];
        this.movieData.pageNo = 1;
        break;

      case SEARCH_STATE.NEXT:
        if (limit * this.movieData.pageNo > this.movieData.total)
          return;

        this.movieData.pageNo++;
        break;
    }

    this.setState({
      isLoading: state === SEARCH_STATE.INIT,
      isLoadingHead: state === SEARCH_STATE.REFRESH,
      isLoadingTail: state === SEARCH_STATE.NEXT
    });

    const url = this._urlForQueryAndPage('', limit, this.movieData.pageNo);

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.movieData.data.push(...data.movies);
        this.movieData.total = data.total;

        this.setState({
          isLoading: false,
          isLoadingHead: false,
          isLoadingTail: false,
          dataSource: this.state.dataSource.cloneWithRows(this.movieData.data)
        });
      })
      .done();
  }

  onEndReached() {
    this.searchMovies(SEARCH_STATE.NEXT);
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
          refreshControl={this.refreshControl()}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          onEndReached={this.onEndReached.bind(this)}
          onEndReachedThreshold={10}
          renderSeparator={this.renderSeparator.bind(this)}
          renderFooter={this.renderFooter.bind(this)}
          showsVerticalScrollIndicator={false}
        />
      );
    }
  }

  refreshControl() {
    return (
      <RefreshControl
        refreshing={this.state.isLoadingHead}
        onRefresh={() => {
          this.searchMovies(SEARCH_STATE.REFRESH);
        }}
      />
    );
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

  renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
        key={'SEP-' + sectionID + '-' + rowID}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          height: 1,
          marginLeft: 4
        }}
      />
    );
  }

  renderFooter() {
    if (!this.state.isLoadingTail) {
      return;
    }

    return (
      <ActivityIndicator style={{marginVertical: 20}}/>
    );
  }
}
